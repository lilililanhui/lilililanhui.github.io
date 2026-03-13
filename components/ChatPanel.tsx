"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Bot, User, AlertCircle } from "lucide-react";
import { 
  sendMessageStream, 
  getRateLimitInfo, 
  ChatMessage, 
  RateLimitInfo, 
  ChatError 
} from "@/services/chatService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "你好！👋 我是 lilililanhui 的 AI 助手，很高兴见到你！你可以问我关于 lilililanhui 的技术背景、项目经历或任何你想了解的内容！",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingMessageIdRef = useRef<string | null>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 打开面板时聚焦输入框并获取配额信息
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      // 获取配额信息
      getRateLimitInfo()
        .then(setRateLimitInfo)
        .catch(() => {
          // 忽略错误，使用默认值
        });
    }
  }, [isOpen]);

  // 处理流式输出的 chunk
  const handleChunk = useCallback((content: string) => {
    const messageId = streamingMessageIdRef.current;
    if (!messageId) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: msg.content + content }
          : msg
      )
    );
  }, []);

  // 处理流式输出完成
  const handleComplete = useCallback((info: RateLimitInfo) => {
    const messageId = streamingMessageIdRef.current;
    if (messageId) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
    }
    streamingMessageIdRef.current = null;
    setRateLimitInfo(info);
    setIsLoading(false);
  }, []);

  // 处理错误
  const handleError = useCallback((err: ChatError) => {
    streamingMessageIdRef.current = null;
    setIsLoading(false);

    if (err.remaining === 0) {
      // 速率限制错误
      setError(err.message || "今日提问次数已用完，明天再来吧！");
      setRateLimitInfo({
        remaining: 0,
        total: 10,
        resetTime: err.resetTime || 0,
      });
    } else {
      // 其他错误
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `抱歉，出了点问题：${err.message || err.error}。请稍后再试。`,
      };
      setMessages((prev) => prev.filter(m => !m.isStreaming).concat(errorMessage));
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 清除之前的错误
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    // 创建一个空的助手消息用于流式填充
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    streamingMessageIdRef.current = assistantMessageId;
    setInput("");
    setIsLoading(true);

    // 构建对话历史（不包含欢迎消息和当前空的助手消息）
    const chatHistory: ChatMessage[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    
    // 添加当前用户消息
    chatHistory.push({ role: "user", content: userMessage.content });

    // 发送流式请求
    await sendMessageStream(
      chatHistory,
      handleChunk,
      handleComplete,
      handleError
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 快捷问题建议
  const suggestions = [
    "介绍一下自己",
    "做过哪些项目？",
    "专业技能有哪些？",
    "如何联系你？",
  ];

  // 判断是否还有配额
  const hasQuota = rateLimitInfo === null || rateLimitInfo.remaining > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-ink/30 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[420px] z-50
          bg-paper shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
          border-l border-newspaper
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-newspaper bg-paper-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg">lilililanhui</h3>
              <p className="text-xs text-ink/60">
                {rateLimitInfo ? `今日剩余 ${rateLimitInfo.remaining}/${rateLimitInfo.total} 次` : "随时为你解答"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-ink/10 rounded-full transition-colors"
            aria-label="关闭聊天"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="px-4 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`
                  w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
                  ${message.role === "assistant" ? "bg-ink text-paper" : "bg-paper-dark border border-newspaper"}
                `}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`
                  max-w-[75%] p-3 rounded-2xl
                  ${
                    message.role === "assistant"
                      ? "bg-paper-dark border border-newspaper/50 rounded-tl-sm"
                      : "bg-ink text-paper rounded-tr-sm"
                  }
                `}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                  {message.isStreaming && (
                    <span className="inline-block w-1.5 h-4 bg-ink/60 ml-0.5 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator - 仅在没有流式消息时显示 */}
          {isLoading && !streamingMessageIdRef.current && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-paper-dark border border-newspaper/50 rounded-2xl rounded-tl-sm p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-ink/50 mb-2">试试问我：</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  disabled={!hasQuota}
                  className="text-xs px-3 py-1.5 bg-paper-dark border border-newspaper/50 rounded-full hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-newspaper bg-paper">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasQuota ? "输入你的问题..." : "今日次数已用完"}
              disabled={isLoading || !hasQuota}
              className="
                flex-1 px-4 py-3 
                bg-paper-dark border border-newspaper/50 
                rounded-full
                text-sm
                placeholder:text-ink/40
                focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink
                disabled:opacity-50
                transition-all
              "
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !hasQuota}
              className="
                w-11 h-11 rounded-full
                bg-ink text-paper
                flex items-center justify-center
                hover:bg-ink/80 
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all
                active:scale-95
              "
              aria-label="发送消息"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
