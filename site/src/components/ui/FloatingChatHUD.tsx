"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, ExternalLink, Languages, MessageCircle, Send, ShieldAlert, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "assistant" | "user"; text: string; crisis?: boolean };

const quickPrompts = ["How does Preventa AI protect privacy?", "Show me the assessment pathways", "What does human review mean?"];

function approvedResponse(value: string) {
  const question = value.toLowerCase();
  if (/suicide|kill myself|overdose|immediate danger|self harm/.test(question)) return { text: "I’m sorry you’re dealing with this. I can’t provide emergency support. In Canada, call or text 9-8-8 for suicide crisis support, or call 9-1-1 if there is immediate danger. If you are elsewhere, contact your local emergency service.", crisis: true };
  if (/privacy|data|store|save/.test(question)) return { text: "The public preview minimizes data by design. Assessment responses remain in browser memory, the assistant does not request personal health information, and production controls require reviewed consent, access, retention, export, and deletion workflows." };
  if (/assessment|pathway/.test(question)) return { text: "Preventa AI organizes situation assessment across individual and family wellbeing, community needs and assets, and organizational readiness. Every output is framed for reflection and planning—not diagnosis." };
  if (/human|review|oversight/.test(question)) return { text: "Human review means accountable people verify sources, context, limitations, and intended use before consequential decisions or exports. AI organizes work; it does not own the decision." };
  return { text: "I can help you navigate approved Preventa AI content about assessment, governance, research, implementation, or learning. This public preview is not connected to a clinical system and does not provide individualized health advice." };
}

export function openAssistant() {
  window.dispatchEvent(new CustomEvent("preventa:open-assistant"));
}

export default function FloatingChatHUD() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hello. I’m the Public Health AI Assistant preview. Ask about approved Preventa AI content—please do not enter personal health information." }]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("preventa:open-assistant", show);
    return () => window.removeEventListener("preventa:open-assistant", show);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const ask = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    const response = approvedResponse(clean);
    setMessages((current) => [...current, { role: "user", text: clean }, { role: "assistant", ...response }]);
    setInput("");
  };

  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };

  return (
    <div className="chat-hud">
      <AnimatePresence>
        {open && (
          <motion.section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title" initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .97 }} transition={{ duration: .22 }}>
            <header><div><span><Sparkles size={14} /> APPROVED-CONTENT PREVIEW</span><h2 id="assistant-title">Public Health AI Assistant</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X /></button></header>
            <div className="chat-safety"><ShieldAlert size={16} /><span>No diagnosis or individualized clinical advice. Do not enter personal health information.</span></div>
            <div className="chat-messages" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-message chat-message--${message.role} ${message.crisis ? "is-crisis" : ""}`}><span>{message.role === "assistant" ? <Bot size={15} /> : "YOU"}</span><p>{message.text}</p>{message.role === "assistant" && !message.crisis && <small>Sources: Preventa AI platform content · Blueprint governance guidance</small>}</div>)}</div>
            <div className="chat-prompts">{quickPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>
            <form onSubmit={submit}><label className="sr-only" htmlFor="assistant-input">Ask the Public Health AI Assistant</label><input ref={inputRef} id="assistant-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about the platform…" /><button type="submit" aria-label="Send message" disabled={!input.trim()}><Send size={18} /></button></form>
            <footer><label><Languages size={14} /><span className="sr-only">Assistant language</span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option>English</option><option>Français (preview)</option></select></label><Link href="/ai-assistant" prefetch={false}>Limitations & citations <ExternalLink size={13} /></Link></footer>
          </motion.section>
        )}
      </AnimatePresence>
      <button type="button" className="chat-launcher" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close Public Health AI Assistant" : "Open Public Health AI Assistant"}><span className="chat-launcher__pulse" />{open ? <X /> : <MessageCircle />}<span>AI Assistant</span></button>
    </div>
  );
}
