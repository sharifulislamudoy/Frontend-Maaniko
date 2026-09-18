"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Bot,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  commerceApi,
  getSavedContact,
  type AiChatResponse,
  type AiChatMessage,
  type AiRecommendation,
} from "@/modules/commerce/lib/client";

type Message = AiChatMessage & {
  id: string;
  serverMessageId?: string | null;
  needsFollowUp?: boolean;
  quickReplies?: string[];
  recommendations?: AiRecommendation[];
  feedback?: "helpful" | "unhelpful";
};

const CHAT_STORAGE_KEY = "maaniko-ai-chat-v2";

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

function RecommendationCard({
  item,
  onNavigate,
}: {
  item: AiRecommendation;
  onNavigate: (href: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.href)}
      className="group flex w-full items-center gap-3 rounded-2xl border border-[#e7e9ee] bg-white p-2.5 text-left shadow-[0_5px_18px_rgba(6,42,84,.045)] transition hover:-translate-y-0.5 hover:border-[#ef4277]/35 hover:shadow-[0_10px_24px_rgba(6,42,84,.08)]"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#f6f7f9]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-gradient-to-br from-[#fff0f5] to-[#edf8ff] text-[#ef4277]">
            <Sparkles className="size-6" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-black leading-5 text-[#183b60]">
          {item.name}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {item.price !== null && (
            <span className="text-sm font-black text-[#ef4277]">
              ৳{item.price.toLocaleString("bn-BD")}
            </span>
          )}
          {item.compareAtPrice !== null && item.compareAtPrice > (item.price ?? 0) && (
            <span className="text-[10px] text-slate-400 line-through">
              ৳{item.compareAtPrice.toLocaleString("bn-BD")}
            </span>
          )}
          {!item.available && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700">
              স্টক শেষ
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#ef4277]" />
    </button>
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
  const [conversationId, setConversationId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const requestLocked = useRef(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          conversationId?: string;
          messages?: Message[];
        };
        if (saved.conversationId) setConversationId(saved.conversationId);
        if (Array.isArray(saved.messages)) setMessages(saved.messages.slice(-20));
      }
    } catch {
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify({ conversationId, messages: messages.slice(-20) }),
    );
  }, [conversationId, hydrated, messages]);

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

  function typeAnswer(result: AiChatResponse) {
    const answer = result.answer;
    const id = `assistant-${Date.now()}`;
    let cursor = 0;
    setIsTyping(true);
    setMessages((current) => [
      ...current,
      {
        id,
        role: "assistant",
        content: "",
        serverMessageId: result.messageId,
        needsFollowUp: result.needsFollowUp,
        quickReplies: result.quickReplies,
        recommendations: result.recommendations,
      },
    ]);

    const charactersPerTick = Math.max(4, Math.ceil(answer.length / 220));
    typingTimer.current = setInterval(() => {
      cursor = Math.min(answer.length, cursor + charactersPerTick);
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
        requestLocked.current = false;
      }
    }, 16);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || requestLocked.current) return;
    requestLocked.current = true;

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
      const savedContact = getSavedContact();
      const result = await commerceApi.askMaanikoAi({
        message: clean,
        history: previous.map(({ role, content }) => ({ role, content })),
        pagePath: pathname,
        customerName: savedContact.name || undefined,
        customerPhone: savedContact.phone || undefined,
        conversationId: conversationId || undefined,
      });
      setConversationId(result.conversationId);
      typeAnswer(result);
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
      requestLocked.current = false;
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
    setConversationId("");
    requestLocked.current = false;
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
  }

  async function rateMessage(message: Message, helpful: boolean) {
    if (!message.serverMessageId || message.feedback) return;
    const feedback = helpful ? "helpful" : "unhelpful";
    setMessages((current) =>
      current.map((item) =>
        item.id === message.id ? { ...item, feedback } : item,
      ),
    );
    try {
      await commerceApi.rateMaanikoAi(message.serverMessageId, { helpful });
    } catch {
      setMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, feedback: undefined } : item,
        ),
      );
    }
  }

  function navigateTo(href: string) {
    onClose();
    window.setTimeout(() => router.push(href), 120);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-[#062a54]/25 p-0 backdrop-blur-[2px] sm:p-4 xl:items-center xl:justify-end xl:p-6"
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
            className="flex h-[min(88dvh,720px)] w-full flex-col overflow-hidden rounded-t-[24px] border border-[#dfe6ee] bg-[#f8fafc] shadow-[0_28px_80px_rgba(6,42,84,.22)] sm:max-w-[520px] sm:rounded-[24px] xl:h-[min(78dvh,720px)]"
          >
            <header className="relative border-b border-[#e5eaf0] bg-gradient-to-r from-white via-[#fff9fb] to-[#f3fbff] px-4 pb-4 pt-4 text-[#062a54] sm:px-5">
              <div className="relative flex items-center gap-3">
                <div className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-[#f2f5f8] ring-1 ring-[#dfe6ee]">
                  <Bot className="size-6" />
                  <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black sm:text-lg">Maaniko AI</h2>
                    <span className="rounded-full bg-[#fff1f5] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#d83b6c] ring-1 ring-[#f7d2de]">
                      BETA
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:text-xs">
                    পণ্য, সল্যুশন বক্স ও অর্ডার সহায়তা
                  </p>
                </div>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="নতুন কথোপকথন"
                    className="grid size-9 place-items-center rounded-full bg-[#f4f6f8] transition hover:bg-[#edf1f5]"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="বন্ধ করুন"
                  className="grid size-9 place-items-center rounded-full bg-[#f4f6f8] transition hover:bg-[#edf1f5]"
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
                  <div className="mx-auto grid size-16 place-items-center rounded-3xl border border-[#e2e8ef] bg-white text-[#062a54] shadow-sm">
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
                        className="rounded-2xl border border-[#e1e7ed] bg-white px-4 py-3 text-left text-sm font-semibold text-[#183b60] shadow-[0_4px_14px_rgba(6,42,84,.035)] transition hover:-translate-y-0.5 hover:border-[#cbd5df] hover:bg-[#fafbfd]"
                      >
                        {starter}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    সংবেদনশীল তথ্য বাদ দিয়ে conversation সুরক্ষিত রাখা হয়
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] shadow-sm sm:text-sm ${
                          message.role === "user"
                            ? "self-end rounded-br-md bg-[#062a54] text-white"
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
                      {message.role === "assistant" &&
                        !isTyping &&
                        Boolean(message.recommendations?.length) && (
                          <div className="mt-2 grid w-[94%] gap-2">
                            {message.recommendations?.map((item) => (
                              <RecommendationCard
                                key={`${message.id}-${item.href}`}
                                item={item}
                                onNavigate={navigateTo}
                              />
                            ))}
                          </div>
                        )}
                      {message.role === "assistant" &&
                        !isTyping &&
                        index === messages.length - 1 &&
                        Boolean(message.quickReplies?.length) && (
                          <div className="mt-2 flex max-w-[94%] flex-wrap gap-1.5">
                            {message.quickReplies?.map((reply) => (
                              <button
                                key={reply}
                                type="button"
                                disabled={working}
                                onClick={() => void send(reply)}
                                className="rounded-full border border-[#ef4277]/20 bg-[#fff7fa] px-3 py-1.5 text-[11px] font-bold text-[#c83263] transition hover:border-[#ef4277]/45 hover:bg-[#fff0f5] disabled:opacity-50"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      {message.role === "assistant" &&
                        !isTyping &&
                        message.serverMessageId && (
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                            <span className="mr-1">উত্তরটি সহায়ক?</span>
                            <button
                              type="button"
                              aria-label="সহায়ক হয়েছে"
                              onClick={() => void rateMessage(message, true)}
                              className={`grid size-7 place-items-center rounded-full transition ${
                                message.feedback === "helpful"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "hover:bg-slate-100 hover:text-emerald-600"
                              }`}
                            >
                              <ThumbsUp className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="সহায়ক হয়নি"
                              onClick={() => void rateMessage(message, false)}
                              className={`grid size-7 place-items-center rounded-full transition ${
                                message.feedback === "unhelpful"
                                  ? "bg-rose-100 text-rose-700"
                                  : "hover:bg-slate-100 hover:text-rose-600"
                              }`}
                            >
                              <ThumbsDown className="size-3.5" />
                            </button>
                          </div>
                        )}
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
              className="border-t border-[#e5eaf0] bg-white p-3 sm:p-4"
            >
              <div className="flex items-end gap-2 rounded-[20px] border border-[#dce3ea] bg-[#f8fafc] p-1.5 pl-3 transition focus-within:border-[#9daebe] focus-within:ring-4 focus-within:ring-[#062a54]/5">
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
                  className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#062a54] text-white shadow-[0_6px_16px_rgba(6,42,84,.18)] transition hover:bg-[#0a3a6c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowUp className="size-5" strokeWidth={2.4} />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[9px] text-slate-400">
                সেবা উন্নত করতে সংবেদনশীল তথ্য বাদ দিয়ে chat সংরক্ষিত হয়।
              </p>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
