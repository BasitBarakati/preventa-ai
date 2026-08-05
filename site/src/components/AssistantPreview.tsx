"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const prompts = [
  {
    question: "How should a public-health team review an AI use case?",
    answer: "Start by defining the intended purpose, affected population, decision owner, evidence requirements, data authority, foreseeable harms, and conditions that would stop the use. Then document human review, validation, monitoring, and escalation before implementation.",
    sources: ["Preventa AI · Governance & Ethics", "Preventa AI · AI Transparency"],
  },
  {
    question: "What belongs in a community situation assessment?",
    answer: "Combine risks and protective factors, priorities, strengths and assets, equity considerations, disease context, partner mapping, program and service inventory, and analysis of gaps or overlap. Local interpretation and lived experience remain essential.",
    sources: ["Preventa AI · Community Assessment", "Preventa AI · Situation Assessment"],
  },
  {
    question: "Can this assistant recommend treatment?",
    answer: "No. This assistant is designed for approved public-health information and workflow support. It does not diagnose, recommend individualized treatment, replace a healthcare professional, or provide emergency support.",
    sources: ["Preventa AI · AI Transparency", "Preventa AI · Terms of Use"],
  },
] as const;

export default function AssistantPreview() {
  const [active, setActive] = useState(0);
  const selected = prompts[active];
  return (
    <section className="assistant-page" aria-label="Public Health AI Assistant interface preview">
      <div className="assistant-page__sidebar">
        <div><Sparkles size={22} /><strong>Public Health<br />AI Assistant</strong></div>
        <p>APPROVED DEMO PROMPTS</p>
        {prompts.map((prompt, index) => <button key={prompt.question} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>{prompt.question}</button>)}
        <span><ShieldCheck size={16} /> Do not enter personal or sensitive health information.</span>
      </div>
      <div className="assistant-page__main">
        <div className="assistant-page__status"><span>● Grounded demo</span><span>English · multilingual-ready</span></div>
        <div className="chat-messages">
          <div className="chat-message chat-message--user"><p>{selected.question}</p></div>
          <div className="chat-message chat-message--ai">
            <span><Sparkles size={14} /> PREVENTA AI · Approved content</span>
            <p>{selected.answer}</p>
            <div className="assistant-citations"><BookOpen size={17} /><div><strong>Sources</strong>{selected.sources.map((source, index) => <a key={source} href={index === 0 ? "/governance-and-ethics" : "/ai-transparency"}>{index + 1}. {source}</a>)}</div></div>
            <p className="assessment-limit"><CheckCircle2 size={16} /> Review the cited guidance and involve the accountable person before acting.</p>
          </div>
        </div>
        <div className="assistant-page__input"><label htmlFor="assistant-demo-input">Ask about approved public-health guidance</label><div><input id="assistant-demo-input" disabled placeholder="Live retrieval will be enabled in a secure workspace" /><button type="button" disabled>Send</button></div><small>Interface preview only · no model or retrieval service is connected</small></div>
      </div>
    </section>
  );
}
