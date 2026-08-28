const STACK_LINES = [
  { text: 'Traceback (most recent call last):', cls: 'text-zinc-500' },
  { text: '  File "factorial.py", line 2, in factorial', cls: 'text-zinc-400' },
  { text: '    return n * factorial(n - 1)', cls: 'text-zinc-500' },
  { text: '  File "factorial.py", line 2, in factorial', cls: 'text-zinc-400' },
  { text: '    return n * factorial(n - 1)', cls: 'text-zinc-500' },
  { text: '  File "factorial.py", line 2, in factorial', cls: 'text-zinc-400' },
  { text: '    return n * factorial(n - 1)', cls: 'text-zinc-500' },
  { text: '  ...', cls: 'text-zinc-600' },
  { text: '  File "factorial.py", line 2, in factorial', cls: 'text-zinc-400' },
  { text: '    return n * factorial(n - 1)', cls: 'text-zinc-500' },
  { text: 'RecursionError: maximum recursion depth exceeded', cls: 'text-signal-400 font-semibold' },
];

export default function TerminalOutput() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-ink-700 bg-ink-950/90 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-700 bg-ink-850/80">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          Terminal
        </span>
        <span className="ml-auto text-[11px] font-mono text-zinc-600">
          python factorial.py
        </span>
      </div>
      <div className="px-4 py-3 font-mono text-xs leading-relaxed max-h-52 overflow-auto scrollbar-thin">
        {STACK_LINES.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre ${line.cls} ${
              i === STACK_LINES.length - 1 ? 'mt-1' : ''
            }`}
          >
            {line.text}
          </div>
        ))}
        <div className="mt-1 flex items-center text-zinc-600">
          <span className="text-accent-500">user@codesocratic</span>
          <span className="mx-1 text-zinc-700">:</span>
          <span className="text-sky-500">~/lessons</span>
          <span className="mx-1 text-zinc-700">$</span>
          <span className="inline-block w-2 h-3.5 align-middle bg-zinc-500 animate-blink ml-1" />
        </div>
      </div>
    </div>
  );
}
