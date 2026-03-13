import { buildKnowledgeContext } from '@/data/knowledgeBase';

// 千问 API 配置
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

// 使用最快的模型：qwen-turbo
const MODEL = 'qwen-turbo';

/**
 * 构建 System Prompt
 */
function buildSystemPrompt(): string {
  const knowledgeContext = buildKnowledgeContext();
  
  return `你是 lilililanhui 的 AI 助手，帮助访客了解 lilililanhui 的背景、技术能力和项目经历。

## 角色设定
- 你代表 lilililanhui 与访客交流
- 语气友好、专业、有亲和力
- 回答要简洁明了，重点突出
- 如果问题超出知识范围，礼貌告知并引导访客通过联系方式进一步了解

## 回答规则
1. 基于以下知识库内容回答问题，不要编造信息
2. 可以适当使用 emoji 让对话更生动
3. 回答控制在 200 字以内，除非用户要求详细说明
4. 如果用户问的问题与个人信息无关（如闲聊），可以简短回应后引导回正题

## 知识库内容
${knowledgeContext}

现在，请根据以上信息回答访客的问题。`;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface QwenStreamChunk {
  choices: Array<{
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

/**
 * 调用千问 API（流式输出）
 * @param messages 对话历史
 * @param apiKey 千问 API Key
 * @returns ReadableStream
 */
export async function chatWithQwenStream(
  messages: ChatMessage[],
  apiKey: string
): Promise<ReadableStream<Uint8Array>> {
  const systemMessage: ChatMessage = {
    role: 'system',
    content: buildSystemPrompt(),
  };

  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [systemMessage, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Qwen API error: ${response.status} - ${error}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  return response.body;
}

/**
 * 解析 SSE 数据流中的单个 chunk
 */
export function parseSSEChunk(chunk: string): string | null {
  const lines = chunk.split('\n');
  let content = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('data: ')) {
      const data = trimmed.slice(6);
      if (data === '[DONE]') {
        continue;
      }
      try {
        const parsed: QwenStreamChunk = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          content += delta;
        }
      } catch {
        // 忽略解析错误
      }
    }
  }
  
  return content || null;
}
