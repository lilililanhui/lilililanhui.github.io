"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { sendMessage } from "@/services/chatService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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
      content: "你好！👋 我是 lilililanhui 的 AI 小秘书。你可以问我关于她的技术背景、项目经历或任何你想了解的内容！",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 打开面板时聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，出了点问题。请稍后再试。",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
              <h3 className="font-headline font-bold text-lg">小秘书</h3>
              <p className="text-xs text-ink/60">随时为你解答</p>
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
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
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
                  className="text-xs px-3 py-1.5 bg-paper-dark border border-newspaper/50 rounded-full hover:bg-ink hover:text-paper transition-colors"
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
              placeholder="输入你的问题..."
              disabled={isLoading}
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
              disabled={!input.trim() || isLoading}
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
