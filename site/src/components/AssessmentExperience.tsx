"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";
import GlowingButton from "./ui/GlowingButton";

const AnimatedRadarChart = dynamic(() => import("./ui/AnimatedRadarChart"), { ssr: false });

const domains = {
  individual: ["Physical activity", "Healthy eating", "Smoking", "Alcohol and substance use", "Sleep", "Stress and coping"],
  community: ["Risks and protective factors", "Priorities and needs", "Community strengths and assets", "Equity considerations", "Programs and services", "Partnerships and gaps"],
  organization: ["Employee satisfaction", "Psychological safety", "Burnout indicators", "Leadership trust", "Change readiness", "AI readiness"],
} as const;

type Variant = keyof typeof domains;

export default function AssessmentExperience({ variant }: { variant: Variant }) {
  const questions = domains[variant];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const finished = step >= questions.length;
  const completed = Object.keys(answers).length;
  const data = useMemo(() => questions.map((domain, index) => ({ domain, score: answers[index] ?? 0 })), [answers, questions]);
  const average = useMemo(() => (completed ? Object.values(answers).reduce((sum, value) => sum + value, 0) / completed : 0), [answers, completed]);
  const strongest = useMemo(() => [...data].sort((a, b) => b.score - a.score)[0], [data]);
  const focus = useMemo(() => [...data].filter((item) => item.score > 0).sort((a, b) => a.score - b.score)[0], [data]);

  const choose = (value: number) => setAnswers((current) => ({ ...current, [step]: value }));
  const next = () => { if (answers[step]) setStep((current) => Math.min(current + 1, questions.length)); };
  const restart = () => { setAnswers({}); setStep(0); };

  return (
    <div className="assessment-wizard" aria-live="polite" aria-labelledby="assessment-preview-title">
      <div className="assessment-wizard__bar"><span><LockKeyhole size={15} /> Privacy-preserving interface preview</span><span>Nothing is transmitted or saved</span></div>
      {!finished ? (
        <div className="assessment-wizard__body">
          <aside aria-label="Assessment progress">
            <p>ASSESSMENT PATH</p>
            {questions.map((question, index) => (
              <button key={question} type="button" disabled={index > completed} className={index === step ? "is-active" : index < completed ? "is-complete" : ""} onClick={() => index <= completed && setStep(index)}>
                <span>{index < completed ? <Check size={13} /> : index + 1}</span>{question}
              </button>
            ))}
          </aside>
          <div className="assessment-wizard__question">
            <div className="assessment-progress"><span style={{ width: `${(completed / questions.length) * 100}%` }} /><b>{completed} of {questions.length} complete</b></div>
            <p className="lux-eyebrow">DEMONSTRATION QUESTION</p>
            <h3 id="assessment-preview-title">{questions[step]}</h3>
            <p>For this interface preview, how ready do you feel to understand and take a practical next step in this area?</p>
            <fieldset>
              <legend>Select one response</legend>
              <div className="answer-grid">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className={answers[step] === value ? "is-selected" : ""}>
                    <input type="radio" name={`question-${step}`} value={value} checked={answers[step] === value} onChange={() => choose(value)} />
                    <strong>{value}</strong><span>{value === 1 ? "Not ready" : value === 5 ? "Ready" : ""}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="wizard-actions">
              <GlowingButton variant="secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft size={17} /> Back</GlowingButton>
              <GlowingButton disabled={!answers[step]} onClick={next}>{step === questions.length - 1 ? "View example summary" : "Continue"} <ArrowRight size={17} /></GlowingButton>
            </div>
            <p className="assessment-limit"><ShieldCheck size={15} /> This assessment does not provide a medical diagnosis.</p>
          </div>
        </div>
      ) : (
        <div className="assessment-summary-v2">
          <div>
            <p className="lux-eyebrow">EXAMPLE SUMMARY</p>
            <h3 id="assessment-preview-title">Your reflection is ready to review.</h3>
            <p>This local preview shows how a completed workflow could organize responses. It does not interpret health status, assess risk, or provide a diagnosis.</p>
            <div className="summary-insights">
              <div><span>Self-reported readiness</span><strong>{average.toFixed(1)}/5</strong><small>Average across all domains.</small></div>
              <div><span>Suggested focus</span><strong>{(focus ?? strongest)?.domain}</strong><small>Choose one small, realistic next step.</small></div>
            </div>
            <div className="wizard-actions"><GlowingButton variant="secondary" onClick={restart}><RotateCcw size={17} /> Restart preview</GlowingButton><GlowingButton onClick={() => window.print()}>Print this preview</GlowingButton></div>
          </div>
          <div><AnimatedRadarChart data={data} /></div>
        </div>
      )}
    </div>
  );
}
