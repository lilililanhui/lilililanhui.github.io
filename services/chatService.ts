export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RateLimitInfo {
  remaining: number;
  total: number;
  resetTime: number;
}

export interface ChatError {
  error: string;
  message?: string;
  remaining?: number;
  resetTime?: number;
}

/**
 * 获取剩余配额信息
 */
export async function getRateLimitInfo(): Promise<RateLimitInfo> {
  const response = await fetch('/api/chat', {
    method: 'GET',
  });
  
  if (!response.ok) {
    throw new Error('Failed to get rate limit info');
  }
  
  return response.json();
}

/**
 * 发送消息并获取流式响应
 * @param messages 对话历史
 * @param onChunk 每次收到 chunk 时的回调
 * @param onComplete 完成时的回调
 * @param onError 错误时的回调
 */
export async function sendMessageStream(
  messages: ChatMessage[],
  onChunk: (content: string) => void,
  onComplete: (rateLimitInfo: RateLimitInfo) => void,
  onError: (error: ChatError) => void
): Promise<void> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    // 处理速率限制错误
    if (response.status === 429) {
      const errorData: ChatError = await response.json();
      onError(errorData);
      return;
    }

    if (!response.ok) {
      const errorData: ChatError = await response.json();
      onError(errorData);
      return;
    }

    // 获取速率限制信息
    const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0');
    const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0');

    // 处理流式响应
    const reader = response.body?.getReader();
    if (!reader) {
      onError({ error: '无法读取响应流' });
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      
      // 按行处理 SSE 数据
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // 保留未完成的行

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const data = trimmed.slice(6);
          if (data === '[DONE]') {
            continue;
          }
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }

    // 处理剩余的 buffer
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data: ')) {
        const data = trimmed.slice(6);
        if (data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }

    onComplete({
      remaining,
      total: 10,
      resetTime,
    });
  } catch (error) {
    onError({
      error: '网络错误',
      message: error instanceof Error ? error.message : '请检查网络连接',
    });
  }
}
