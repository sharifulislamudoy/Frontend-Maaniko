"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Bot,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  commerceApi,
  type AiChatMessage,
} from "@/modules/commerce/lib/client";

type Message = AiChatMessage & { id: string };

const starters = [
  "আমার জন্য কোন পণ্যটি ভালো হবে?",
  "সল্যুশন বক্স সম্পর্কে বলুন",
  "বাজেট অনুযায়ী পণ্য সাজেস্ট করুন",
];

const thinkingSteps = [
  "আপনার প্রশ্নটি বুঝছি",
  "প্রাসঙ্গিক পণ্য খুঁজছি",
  "সংক্ষিপ্ত উত্তর তৈরি করছি",
];

function safeHref(href: string) {
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    if (typeof window !== "undefined" && url.origin === window.location.origin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
    return ["wa.me", "www.facebook.com", "facebook.com"].includes(url.hostname)
      ? href
      : "#";
  } catch {
    return "#";
  }
}

function BoldText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-black text-[#183b60]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part.replace(/\*\*/g, "")
        ),
      )}
    </>
  );
}

function InlineText({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate: (href: string) => void;
}) {
  const regex = /\[([^\]]+)]\(([^)]+)\)/g;
  const nodes = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    nodes.push(
      <BoldText key={`text-${match.index}`} text={text.slice(last, match.index)} />,
    );
    const href = safeHref(match[2]);
    nodes.push(
      href === "#" ? (
        <BoldText key={`invalid-${match.index}`} text={match[1]} />
      ) : href.startsWith("/") ? (
        <button
          key={`${match.index}-${href}`}
          type="button"
          onClick={() => onNavigate(href)}
          className="inline cursor-pointer border-0 bg-transparent p-0 font-bold text-[#e94278] underline decoration-[#e94278]/35 underline-offset-2 transition hover:text-[#c92d61]"
        >
          <BoldText text={match[1]} />
        </button>
      ) : (
        <a
          key={`${match.index}-${href}`}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="cursor-pointer font-bold text-[#e94278] underline decoration-[#e94278]/35 underline-offset-2 transition hover:text-[#c92d61]"
        >
          <BoldText text={match[1]} />
        </a>
      ),
    );
    last = regex.lastIndex;
  }

  nodes.push(<BoldText key="text-last" text={text.slice(last)} />);
  return <>{nodes}</>;
}

function RichText({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      {text.split("\n").map((line, index) => {
        const value = line.trim().replace(/^#{1,6}\s*/, "");
        if (!value) return null;
        return (
          <p key={index} className="leading-6">
            {value.startsWith("- ") && (
              <span className="mr-1.5 text-[#ef4277]">•</span>
            )}
            <InlineText
              text={value.replace(/^(?:-|•)\s+/, "")}
              onNavigate={onNavigate}
            />
          </p>
        );
      })}
    </div>
  );
}

export default function MaanikoAiAssistant({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [working, setWorking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!working || isTyping) return;
    const timer = window.setInterval(
      () => setThinkingIndex((current) => (current + 1) % thinkingSteps.length),
      900,
    );
    return () => window.clearInterval(timer);
  }, [working, isTyping]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, working]);

  useEffect(
    () => () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    },
    [],
  );

  function typeAnswer(answer: string) {
    const id = `assistant-${Date.now()}`;
    let cursor = 0;
    setIsTyping(true);
    setMessages((current) => [
      ...current,
      { id, role: "assistant", content: "" },
    ]);

    typingTimer.current = setInterval(() => {
      cursor = Math.min(answer.length, cursor + 3);
      setMessages((current) =>
        current.map((message) =>
          message.id === id
            ? { ...message, content: answer.slice(0, cursor) }
            : message,
        ),
      );
      if (cursor >= answer.length && typingTimer.current) {
        clearInterval(typingTimer.current);
        typingTimer.current = null;
        setIsTyping(false);
        setWorking(false);
      }
    }, 16);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || working) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: clean,
    };
    const previous = messages.slice(-8);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setThinkingIndex(0);
    setWorking(true);

    try {
      const result = await commerceApi.askMaanikoAi({
        message: clean,
        history: previous.map(({ role, content }) => ({ role, content })),
        pagePath: pathname,
      });
      typeAnswer(result.answer);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "দুঃখিত, এখন উত্তর দেওয়া যাচ্ছে না।",
        },
      ]);
      setWorking(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  function reset() {
    if (typingTimer.current) clearInterval(typingTimer.current);
    typingTimer.current = null;
    setMessages([]);
    setWorking(false);
    setIsTyping(false);
    setInput("");
  }

  function navigateTo(href: string) {
    onClose();
    window.setTimeout(() => router.push(href), 120);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-[#062a54]/35 p-0 backdrop-blur-[3px] sm:p-4 xl:items-center xl:justify-end xl:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) =>
            event.target === event.currentTarget && onClose()
          }
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Maaniko AI Assistant"
            initial={{ y: 70, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 70, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="flex h-[min(88dvh,720px)] w-full flex-col overflow-hidden rounded-t-[28px] border border-white/70 bg-[#fffafd] shadow-[0_28px_90px_rgba(6,42,84,.28)] sm:max-w-[520px] sm:rounded-[30px] xl:h-[min(78dvh,720px)]"
          >
            <header className="relative overflow-hidden bg-gradient-to-br from-[#062a54] via-[#093d70] to-[#0b78a9] px-4 pb-4 pt-4 text-white sm:px-5">
              <div className="absolute -right-8 -top-10 size-32 rounded-full bg-[#ef4277]/30 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Bot className="size-6" />
                  <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[#0a497b] bg-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black sm:text-lg">Maaniko AI</h2>
                    <span className="rounded-full bg-white/12 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white/90 ring-1 ring-white/15">
                      BETA
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-white/75 sm:text-xs">
                    পণ্য, সল্যুশন বক্স ও অর্ডার সহায়তা
                  </p>
                </div>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="নতুন কথোপকথন"
                    className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="বন্ধ করুন"
                  className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <X className="size-5" />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5"
            >
              {messages.length === 0 ? (
                <div className="flex min-h-full flex-col justify-center">
                  <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-[#ffe5ee] to-[#e8f7ff] text-[#ef4277] shadow-sm">
                    <Sparkles className="size-8" />
                  </div>
                  <h3 className="mt-4 text-center text-xl font-black text-[#062a54]">
                    কীভাবে সাহায্য করতে পারি?
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
                    আপনার প্রয়োজন বলুন—Maaniko-এর তথ্য দেখে সংক্ষিপ্ত উত্তর দেব।
                  </p>
                  <div className="mt-6 grid gap-2">
                    {starters.map((starter, index) => (
                      <motion.button
                        key={starter}
                        type="button"
                        onClick={() => void send(starter)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * index }}
                        className="rounded-2xl border border-[#eadfe5] bg-white px-4 py-3 text-left text-sm font-semibold text-[#183b60] shadow-[0_5px_18px_rgba(6,42,84,.04)] transition hover:-translate-y-0.5 hover:border-[#ef4277]/35 hover:bg-[#fff7fa]"
                      >
                        {starter}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    ব্যক্তিগত তথ্য সুরক্ষিত রাখা হয়
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] shadow-sm sm:text-sm ${
                          message.role === "user"
                            ? "rounded-br-md bg-[#062a54] text-white"
                            : "rounded-bl-md border border-[#eee3e8] bg-white text-slate-700"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <RichText
                            text={message.content}
                            onNavigate={navigateTo}
                          />
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                  {working && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                    >
                      <span className="flex gap-1 rounded-full border border-[#eee3e8] bg-white px-3 py-2.5 shadow-sm">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="size-1.5 rounded-full bg-[#ef4277]"
                            animate={{
                              y: [0, -4, 0],
                              opacity: [0.45, 1, 0.45],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: dot * 0.14,
                            }}
                          />
                        ))}
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={thinkingIndex}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          {thinkingSteps[thinkingIndex]}…
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="border-t border-[#eee3e8] bg-white p-3 sm:p-4"
            >
              <div className="flex items-end gap-2 rounded-[22px] border border-[#e4d9df] bg-[#fffafd] p-1.5 pl-3 transition focus-within:border-[#ef4277]/60 focus-within:ring-4 focus-within:ring-[#ef4277]/8">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value.slice(0, 600))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void send(input);
                    }
                  }}
                  rows={1}
                  placeholder="আপনার প্রশ্ন লিখুন…"
                  disabled={working}
                  className="max-h-24 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-[#062a54] outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim() || working}
                  aria-label="পাঠান"
                  className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ef4277] to-[#ff6e99] text-white shadow-[0_7px_18px_rgba(239,66,119,.26)] transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowUp className="size-5" strokeWidth={2.4} />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[9px] text-slate-400">
                AI ভুল করতে পারে—গুরুত্বপূর্ণ তথ্য যাচাই করুন।
              </p>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
