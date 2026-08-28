import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, RefreshCw, MessageCircle } from 'lucide-react';
import {
  generateSocraticReply,
  INITIAL_MENTOR_MESSAGE,
  SUGGESTED_PROMPTS,
  type ChatMessage,
} from '@/lib/socratic';

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export default function MentorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: 'mentor', content: INITIAL_MENTOR_MESSAGE, ts: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = { id: nextId(), role: 'user', content: trimmed, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const reply = generateSocraticReply(trimmed);
    const delay = 700 + Math.min(reply.text.length * 8, 900);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'mentor', content: reply.text, ts: Date.now() },
      ]);
      setIsThinking(false);
      inputRef.current?.focus();
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    setMessages([
      { id: nextId(), role: 'mentor', content: INITIAL_MENTOR_MESSAGE, ts: Date.now() },
    ]);
    setInput('');
    setIsThinking(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl overflow-hidden border border-ink-700 bg-ink-900/80 backdrop-blur-sm shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-700 bg-ink-850/80">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent-500/20 to-sky-500/20 border border-accent-500/30">
          <Sparkles className="w-4.5 h-4.5 text-accent-400" strokeWidth={1.8} />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent-500 border-2 border-ink-850" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            Socratic Mentor
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-500/15 text-accent-300 border border-accent-500/20">
              AI
            </span>
          </h2>
          <p className="text-[11px] text-zinc-500 truncate">
            Asks questions. Never gives the answer.
          </p>
        </div>
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-ink-700/60"
          title="Restart conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isThinking && (
          <div className="flex items-start gap-2.5 animate-fade-in">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent-500/20 to-sky-500/20 border border-accent-500/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-md bg-ink-800/80 border border-ink-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-dot-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-dot-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-dot-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-ink-600 bg-ink-800/50 text-zinc-400 hover:text-accent-300 hover:border-accent-500/40 hover:bg-accent-500/5 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-ink-700 bg-ink-850/60 p-3"
      >
        <div className="flex items-end gap-2 rounded-2xl bg-ink-800/80 border border-ink-600 focus-within:border-accent-500/50 focus-within:ring-1 focus-within:ring-accent-500/20 transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask the mentor a question..."
            className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none scrollbar-thin max-h-32"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="m-1.5 flex items-center justify-center w-9 h-9 rounded-xl bg-accent-500/90 hover:bg-accent-400 disabled:bg-ink-700 disabled:text-zinc-600 text-ink-950 transition-all hover:scale-105 active:scale-95 disabled:scale-100"
          >
            <Send className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>
        <p className="flex items-center gap-1.5 px-2 pt-1.5 text-[10px] text-zinc-600">
          <MessageCircle className="w-3 h-3" />
          The mentor responds with questions only — never code blocks.
        </p>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex items-start gap-2.5 animate-fade-in-up ${
        isUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold ${
          isUser
            ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300'
            : 'bg-gradient-to-br from-accent-500/20 to-sky-500/20 border border-accent-500/30 text-accent-300'
        }`}
      >
        {isUser ? 'You' : <Sparkles className="w-3.5 h-3.5" />}
      </div>
      <div
        className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-2xl rounded-tr-md bg-sky-500/10 border border-sky-500/20 text-zinc-200'
            : 'rounded-2xl rounded-tl-md bg-ink-800/80 border border-ink-700 text-zinc-300'
        }`}
      >
        <p className="whitespace-pre-wrap text-balance">{message.content}</p>
      </div>
    </div>
  );
}
