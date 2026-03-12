import { MessageCircle } from "lucide-react";

interface ChatBubbleProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatBubble({ onClick, isOpen }: ChatBubbleProps) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-ink text-paper
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        border-2 border-paper/20
        ${isOpen ? 'rotate-0' : 'animate-bounce-subtle'}
      `}
      aria-label={isOpen ? "关闭聊天" : "开始聊天"}
    >
      <MessageCircle 
        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        fill={isOpen ? "currentColor" : "none"}
      />
      
      {/* Ripple effect ring */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full border-2 border-ink/30 animate-ping opacity-75"></span>
      )}
    </button>
  );
}
