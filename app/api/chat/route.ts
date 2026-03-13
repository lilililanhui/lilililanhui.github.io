import { NextRequest } from 'next/server';
import { chatWithQwenStream, ChatMessage } from '@/services/qwenService';
import { checkRateLimit, consumeRateLimit, getRateLimitInfo } from '@/services/rateLimitService';

// 获取客户端 IP
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // 检查速率限制
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return Response.json(
        {
          error: '今日提问次数已用完',
          message: '每天最多可以提问 10 次，明天再来吧！',
          remaining: 0,
          resetTime: rateLimitResult.resetTime,
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    // 解析请求体
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: '无效的消息格式' },
        { status: 400 }
      );
    }

    // 获取 API Key
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      console.error('QWEN_API_KEY not configured');
      return Response.json(
        { error: '服务配置错误' },
        { status: 500 }
      );
    }

    // 消耗配额
    consumeRateLimit(clientIP);
    
    // 获取更新后的配额信息
    const rateLimitInfo = getRateLimitInfo(clientIP);

    // 调用千问 API（流式）
    const stream = await chatWithQwenStream(messages, apiKey);

    // 返回流式响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
        'X-RateLimit-Reset': rateLimitInfo.resetTime.toString(),
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { 
        error: '服务暂时不可用',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}

// 获取剩余配额信息
export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request);
  const rateLimitInfo = getRateLimitInfo(clientIP);
  
  return Response.json({
    remaining: rateLimitInfo.remaining,
    total: rateLimitInfo.total,
    resetTime: rateLimitInfo.resetTime,
  });
}
