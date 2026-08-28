interface CodeLine {
  num: number;
  code: string;
  isError?: boolean;
}

const CODE_LINES: CodeLine[] = [
  { num: 1, code: 'def factorial(n):' },
  { num: 2, code: '    return n * factorial(n - 1)', isError: true },
];

const TOKEN_COLORS: Record<string, string> = {
  def: 'text-sky-400',
  return: 'text-fuchsia-400',
};

function colorize(code: string, isKeyword: (w: string) => boolean) {
  const parts = code.split(/(\s+|[(),:*])/g);
  return parts.map((part, i) => {
    if (TOKEN_COLORS[part]) {
      return (
        <span key={i} className={TOKEN_COLORS[part]}>
          {part}
        </span>
      );
    }
    if (/^factorial$/.test(part)) return <span key={i} className="text-accent-400">{part}</span>;
    if (/^n$/.test(part)) return <span key={i} className="text-gold-400">{part}</span>;
    if (/^\d+$/.test(part)) return <span key={i} className="text-signal-400">{part}</span>;
    return <span key={i}>{part}</span>;
  });
}

export default function CodeEditor() {
  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl overflow-hidden border border-ink-700 bg-ink-900/80 backdrop-blur-sm shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700 bg-ink-850/80">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-signal-500/80" />
          <span className="w-3 h-3 rounded-full bg-gold-500/80" />
          <span className="w-3 h-3 rounded-full bg-accent-500/80" />
        </div>
        <span className="ml-2 text-xs font-mono text-zinc-500">factorial.py</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-signal-400/90">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal-500 opacity-60 animate-pulse-ring" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-500" />
          </span>
          1 error
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto scrollbar-thin font-mono text-sm leading-relaxed">
        {CODE_LINES.map((line) => (
          <div
            key={line.num}
            className={`group flex items-stretch transition-colors ${
              line.isError
                ? 'bg-signal-500/10 hover:bg-signal-500/15'
                : 'hover:bg-white/[0.02]'
            }`}
          >
            <div
              className={`w-12 flex-shrink-0 select-none text-right pr-4 pt-1 text-xs font-mono ${
                line.isError ? 'text-signal-400' : 'text-zinc-600'
              }`}
            >
              {line.isError && (
                <span className="mr-1 text-signal-500" aria-hidden>
                  ●
                </span>
              )}
              {line.num}
            </div>
            <div
              className={`flex-1 whitespace-pre pt-1 pr-4 ${
                line.isError ? 'text-zinc-200' : 'text-zinc-300'
              }`}
            >
              {colorize(line.code, (w) => !!TOKEN_COLORS[w])}
              {line.isError && (
                <span className="ml-2 inline-block w-2 h-4 align-middle bg-signal-500/80 animate-blink" />
              )}
            </div>
          </div>
        ))}
        <div className="flex items-stretch">
          <div className="w-12 flex-shrink-0 select-none text-right pr-4 pt-1 text-xs font-mono text-zinc-700">3</div>
          <div className="flex-1 pt-1 pr-4">
            <span className="inline-block w-2 h-4 align-middle bg-zinc-600 animate-blink" />
          </div>
        </div>
      </div>

      {CODE_LINES.find((l) => l.isError) && (
        <div className="px-4 py-2.5 border-t border-signal-500/20 bg-signal-500/[0.06]">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-signal-400 text-xs font-mono">▲</span>
            <p className="text-xs text-signal-300/90 leading-relaxed">
              Line 2: this function calls itself forever. There's no condition
              that stops the recursion — what's missing?
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
