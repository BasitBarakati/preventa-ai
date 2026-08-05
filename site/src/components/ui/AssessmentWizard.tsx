"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Check, Download, LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";
import GlowingButton from "./GlowingButton";

const AnimatedRadarChart = dynamic(() => import("./AnimatedRadarChart"), { ssr: false });

const questions = [
  ["Physical activity", "How consistently does your current routine support movement that feels safe and realistic?"],
  ["Healthy eating", "How confident are you in accessing and choosing food that supports your wellbeing?"],
  ["Smoking", "How ready do you feel to protect yourself from tobacco or nicotine-related harms?"],
  ["Alcohol & substances", "How supported do you feel in making informed choices about alcohol or other substances?"],
  ["Sleep", "How well does your current sleep routine support rest and recovery?"],
  ["Stress & coping", "How confident are you in using supportive ways to respond to stress?"],
] as const;

const scale = ["Not yet", "A little", "Sometimes", "Mostly", "Consistently"];

export default function AssessmentWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const finished = step === questions.length;
  const selected = answers[step];
  const data = useMemo(() => questions.map(([domain], index) => ({ domain, score: answers[index] ?? 0 })), [answers]);
  const strongest = useMemo(() => [...data].sort((a, b) => b.score - a.score)[0], [data]);
  const focus = useMemo(() => [...data].filter((item) => item.score > 0).sort((a, b) => a.score - b.score)[0], [data]);

  const continueAssessment = async () => {
    if (!selected) return;
    if (step === questions.length - 1) {
      setStep(questions.length);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 45, spread: 55, startVelocity: 22, colors: ["#4de2cf", "#8b7dff", "#d9f8f2"] });
      }
    } else setStep((current) => current + 1);
  };

  const downloadSummary = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "letter" });
    pdf.setFillColor(7, 9, 14); pdf.rect(0, 0, 612, 792, "F");
    pdf.setTextColor(77, 226, 207); pdf.setFontSize(11); pdf.text("PREVENTA AI · PRIVATE LOCAL PREVIEW", 48, 55);
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(24); pdf.text("Wellbeing reflection summary", 48, 92);
    pdf.setTextColor(174, 190, 207); pdf.setFontSize(10); pdf.text("Generated locally from your browser responses. No information was transmitted or saved.", 48, 115);
    data.forEach((item, index) => {
      const y = 165 + index * 52;
      pdf.setTextColor(224, 232, 240); pdf.setFontSize(11); pdf.text(item.domain, 48, y);
      pdf.setDrawColor(47, 68, 90); pdf.line(220, y - 4, 500, y - 4);
      pdf.setDrawColor(77, 226, 207); pdf.setLineWidth(5); pdf.line(220, y - 4, 220 + (item.score / 5) * 280, y - 4);
      pdf.setTextColor(77, 226, 207); pdf.text(`${item.score}/5`, 520, y);
    });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(13); pdf.text("Practical next-step framework", 48, 510);
    pdf.setTextColor(174, 190, 207); pdf.setFontSize(10);
    pdf.text(["1. Choose one achievable domain.", "2. Review approved evidence and local resources.", "3. Speak with an appropriate professional if you have concerns.", "4. Revisit this reflection when your context changes."], 48, 538, { lineHeightFactor: 1.8 });
    pdf.setTextColor(255, 197, 128); pdf.text("This assessment does not provide a medical diagnosis or individualized clinical advice.", 48, 675);
    pdf.save("preventa-ai-wellbeing-summary.pdf");
  };

  const reset = () => { setAnswers({}); setStep(0); };

  return (
    <div className="assessment-wizard" aria-live="polite">
      <div className="assessment-wizard__bar"><span><LockKeyhole size={15} /> Anonymous local preview</span><span>No account · no transmission · no storage</span></div>
      {!finished ? (
        <div className="assessment-wizard__body">
          <aside aria-label="Assessment progress">
            <p>YOUR PROGRESS</p>
            {questions.map(([domain], index) => <button key={domain} type="button" disabled={index > Object.keys(answers).length} className={index === step ? "is-active" : answers[index] ? "is-complete" : ""} onClick={() => index <= Object.keys(answers).length && setStep(index)}><span>{answers[index] ? <Check size={13} /> : index + 1}</span>{domain}</button>)}
          </aside>
          <div className="assessment-wizard__question">
            <div className="assessment-progress"><span style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} /><b>Question {step + 1} of {questions.length}</b></div>
            <p className="lux-eyebrow">PRIVATE SELF-REFLECTION</p>
            <h3>{questions[step][0]}</h3>
            <p>{questions[step][1]}</p>
            <fieldset><legend>Choose the response that feels closest today</legend><div className="answer-grid">{scale.map((label, index) => { const value = index + 1; return <label key={label} className={selected === value ? "is-selected" : ""}><input type="radio" name={`answer-${step}`} value={value} checked={selected === value} onChange={() => setAnswers((current) => ({ ...current, [step]: value }))} /><strong>{value}</strong><span>{label}</span></label>; })}</div></fieldset>
            <div className="wizard-actions"><GlowingButton variant="secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft size={17} /> Back</GlowingButton><GlowingButton disabled={!selected} onClick={continueAssessment}>{step === questions.length - 1 ? "Build my action map" : "Continue"} <ArrowRight size={17} /></GlowingButton></div>
            <p className="assessment-limit"><ShieldCheck size={15} /> This preview supports reflection only. It does not provide a medical diagnosis.</p>
          </div>
        </div>
      ) : (
        <div className="assessment-summary-v2">
          <div><p className="lux-eyebrow">YOUR PRIVATE REFLECTION</p><h3>A practical action map—not a diagnosis.</h3><p>Your responses stayed in this browser session. The visualization helps you notice patterns; it does not assess disease or replace professional advice.</p><div className="summary-insights"><div><span>Existing strength</span><strong>{strongest?.domain}</strong><small>Build on what already feels workable.</small></div><div><span>Possible focus</span><strong>{focus?.domain}</strong><small>Choose one small, realistic next step.</small></div></div><div className="wizard-actions"><GlowingButton variant="secondary" onClick={reset}><RotateCcw size={17} /> Start again</GlowingButton><GlowingButton onClick={downloadSummary}><Download size={17} /> Download PDF summary</GlowingButton></div></div>
          <div><AnimatedRadarChart data={data} /></div>
        </div>
      )}
    </div>
  );
}
