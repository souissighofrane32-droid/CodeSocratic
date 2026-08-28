import { Brain, Bug, Github, BookOpen } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import TerminalOutput from '@/components/TerminalOutput';
import MentorChat from '@/components/MentorChat';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 py-3.5 border-b border-ink-800 bg-ink-950/70 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500/20 to-sky-500/20 border border-accent-500/30">
            <Brain className="w-5 h-5 text-accent-400" strokeWidth={1.8} />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-zinc-100 tracking-tight">
              CodeSocratic
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
              Debug by asking, not by telling
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500 px-2.5 py-1.5 rounded-lg bg-ink-850/60 border border-ink-700">
            <BookOpen className="w-3.5 h-3.5 text-accent-400" />
            Lesson 01 · Recursion
          </span>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-ink-800/60"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </header>

      <main className="flex-1 min-h-0 px-4 py-4 sm:px-6 sm:py-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-[1500px] mx-auto">
          <section className="flex flex-col gap-4 sm:gap-5 min-h-0">
            <div className="flex items-center gap-2 px-1">
              <Bug className="w-4 h-4 text-signal-400" />
              <h2 className="text-sm font-semibold text-zinc-300">
                Broken Code
              </h2>
              <span className="ml-1 text-[11px] text-zinc-600 font-mono">
                — find the bug, don't patch it yet
              </span>
            </div>
            <div className="flex-1 min-h-[280px] lg:min-h-0">
              <CodeEditor />
            </div>
            <TerminalOutput />
          </section>

          <section className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 px-1 mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-500" />
                <h2 className="text-sm font-semibold text-zinc-300">
                  Socratic Mentor
                </h2>
              </div>
              <span className="ml-1 text-[11px] text-zinc-600 font-mono">
                — ask, and it will question back
              </span>
            </div>
            <div className="flex-1 min-h-[500px] lg:min-h-0">
              <MentorChat />
            </div>
          </section>
        </div>
      </main>

      <footer className="px-5 py-3 border-t border-ink-800 bg-ink-950/70 backdrop-blur-md">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between text-[11px] text-zinc-600">
          <span className="font-mono">CodeSocratic · Active recall for debuggers</span>
          <span className="hidden sm:inline font-mono">
            The mentor never returns code — only questions.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
