export type ChatRole = 'user' | 'mentor';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  ts: number;
}

const CODE_BLOCK = /```[\s\S]*?```|^\s{4,}\S.*$/m;
const GIVE_ANSWER = /\b(give|tell|show|fix|solve|answer|correct|solution|what(?:'s| is) (?:the |a )?(?:fix|answer|solution|code))\b/i;
const ASK_CODE = /\b(code|snippet|function|implementation|write|example)\b/i;
const BASE_CASE = /\b(base case|stopping condition|termination|stop)\b/i;
const RECURSION = /\b(recur(s(e|sion)|sion)|call(s|ing)?|calls itself|factorial)\b/i;
const INFINITE = /\b(infinite|forever|never ends|doesn't stop|no end|unbounded|overflows?|stack)\b/i;
const WHY = /\b(why|how come|what happens if|what's wrong|explain|understand|reason)\b/i;
const HELLO = /\b(hi|hello|hey|help|stuck|start|begin|don't know|idk|no idea|confused|lost)\b/i;
const NEGATIVE = /\b(no|not|doesn't|don't|without|missing|isn't|aren't|lack)\b/i;

interface Reply {
  text: string;
  followups?: string[];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isAskingForCodeOrAnswer(text: string): boolean {
  return (GIVE_ANSWER.test(text) || ASK_CODE.test(text)) && CODE_BLOCK.test(text) === false && /code|fix|solve|answer|solution|correct/i.test(text);
}

export function generateSocraticReply(userText: string): Reply {
  const text = userText.toLowerCase().trim();

  if (!text) {
    return {
      text: "I'm here to guide you — but I can only ask questions, not hand you answers. What do you think the code is doing right now?",
    };
  }

  if (isAskingForCodeOrAnswer(text)) {
    return {
      text: "I won't give you the code or the fix — that would rob you of the discovery. Instead, let me ask: if you traced `factorial(3)` by hand, what would happen on the very first call? And then the next?",
    };
  }

  if (CODE_BLOCK.test(userText)) {
    return {
      text: "I noticed you pasted some code — but I won't read it back to you or correct it. Instead, describe in your own words: what does this function do when it's called with a small number, like 2?",
    };
  }

  if (BASE_CASE.test(text)) {
    return {
      text: "You've named the right concept — a base case. Now: what would happen if a recursive function had *no* base case? Can you describe the chain of calls, step by step?",
      followups: [
        "Where would the calls stop?",
        "What does each call depend on?",
      ],
    };
  }

  if (RECURSION.test(text)) {
    return {
      text: "Good — you're thinking about the recursion itself. So if `factorial(n)` calls `factorial(n - 1)`, what value of `n` would make that next call... unnecessary? Or impossible?",
    };
  }

  if (INFINITE.test(text)) {
    return {
      text: "You've spotted something important — it doesn't stop. So here's my question: what *should* make it stop? Is there a smallest input where the answer is obvious, without any more recursion?",
    };
  }

  if (WHY.test(text)) {
    return {
      text: "Let's turn that around. Why do *you* think the error mentions 'recursion' and a 'stack'? What is the computer keeping track of with every call that doesn't return?",
    };
  }

  if (NEGATIVE.test(text) && /base|stop|case|condition/.test(text)) {
    return {
      text: "Exactly — there's no base case. So before I say more: what is a base case *for*? What job does it do that the recursive case can't?",
    };
  }

  if (HELLO.test(text)) {
    return {
      text: "Welcome. I won't fix the code for you — I'll only ask questions. Let's start: when you run this, what do you think happens on the very first call? Walk me through it.",
    };
  }

  if (/factorial\s*\(|factorial\s+\d/.test(text)) {
    return {
      text: "Let's trace it together. If you call `factorial(2)`, what does it return? And does it ever reach a point where it stops calling itself?",
    };
  }

  if (/error|trace|exception|recursionerror/i.test(text)) {
    return {
      text: "The error is a clue, not an answer. What does 'RecursionError' tell you about what the function kept doing? And what would have to be true for it to *not* keep doing that?",
    };
  }

  if (/0|1|n\s*==|n\s*</.test(text)) {
    return {
      text: "You're circling a specific value. Why would `n == 0` (or `n == 1`) be special here? What's true about the factorial of that number that makes further recursion pointless?",
    };
  }

  return {
    text: pick([
      "Interesting — let's dig deeper. What do you think the function is doing each time it calls itself, and when does it stop?",
      "I'll meet you with a question, not an answer. If you traced the calls one by one, what's the first thing that goes wrong?",
      "Good thought. Now: what is missing from this function that a correct recursive function always has?",
      "Let's reason together. What would have to be true for this function to return a value without calling itself again?",
    ]),
  };
}

export const SUGGESTED_PROMPTS = [
  "I don't know where to start",
  "Why is there an error?",
  "What's a base case?",
  "It just keeps calling itself",
];

export const INITIAL_MENTOR_MESSAGE =
  "Welcome to CodeSocratic. I won't fix the code for you or hand you the answer — I'll only ask questions, because finding it yourself is what makes it stick.\n\nLook at the code on the left and the error below it. When you're ready, tell me what you notice, and I'll guide you with questions.";
