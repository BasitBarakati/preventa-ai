"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

export type RadarDatum = { domain: string; score: number };

export default function AnimatedRadarChart({ data }: { data: RadarDatum[] }) {
  const readable = data.map((item) => `${item.domain}: ${item.score} of 5`).join(", ");

  return (
    <div className="radar-chart" role="img" aria-label={`Illustrative wellbeing reflection. ${readable}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="66%">
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4de2cf" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b7dff" stopOpacity={0.45} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="rgba(171, 199, 223, .2)" />
          <PolarAngleAxis dataKey="domain" tick={{ fill: "#a9bacb", fontSize: 11 }} />
          <Radar dataKey="score" stroke="#61ead8" fill="url(#radarFill)" fillOpacity={0.72} isAnimationActive />
        </RadarChart>
      </ResponsiveContainer>
      <details className="chart-table">
        <summary>View chart as a table</summary>
        <table><thead><tr><th>Domain</th><th>Reflection score</th></tr></thead><tbody>{data.map((item) => <tr key={item.domain}><td>{item.domain}</td><td>{item.score} of 5</td></tr>)}</tbody></table>
      </details>
    </div>
  );
}
