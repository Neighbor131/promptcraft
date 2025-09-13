import React, { useMemo, useState } from "react";

/* Base slots for magazine-style editorial */
const OPTIONS = {
  subject: ["young woman", "young man", "androgynous model"],
  skin: ["fair", "tan", "olive", "deep complexion"],
  framing: ["collarbones up", "shoulders up", "tight crop on face"],
  background: ["seamless beige", "pastel gradient", "blurred florals", "satin fabric backdrop"],
  lighting: ["soft frontal glow", "feathered shadows", "gentle rim light"],
  camera: ["85mm portrait lens", "slight low angle (~5°)", "eye-level straight on"],
  focus: ["lips (lipstick)", "eyes (mascara)", "cheekbones (highlighter)", "face overall"],
  mood: ["aspirational", "luminous", "elegant", "romantic"],
};

export default function MagazineModel() {
  const [state, setState] = useState({
    subject: OPTIONS.subject[0],
    skin: OPTIONS.skin[0],
    framing: OPTIONS.framing[0],
    background: OPTIONS.background[0],
    lighting: OPTIONS.lighting[0],
    camera: OPTIONS.camera[0],
    focus: OPTIONS.focus[0],
    mood: OPTIONS.mood[0],
  });

  const assembled = useMemo(() => {
    return `Ultra-realistic editorial beauty photograph for a cosmetics magazine campaign. 
Portrait of ${state.subject} with ${state.skin} skin, framed ${state.framing}, against a ${state.background}. 
Skin luminous with smooth tonal transitions, fine pores visible, subtle flyaway hairs catching light. 
Lighting: ${state.lighting}. 
Captured with ${state.camera}. 
Focus on ${state.focus}. 
Mood: ${state.mood}. 
Editorial retouch, clean beauty style, cinematic soft grain, natural color grading.`;
  }, [state]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Magazine Model Builder</h1>
        <p className="text-sm text-white/60">
          Generate editorial beauty prompts inspired by Avon, Oriflame, and other cosmetics campaigns.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {/* Left: controls */}
        <div className="rounded-2xl border border-[#13161b] bg-[#0f1115] p-4 shadow-sm space-y-3">
          {Object.entries(OPTIONS).map(([key, values]) => (
            <label key={key} className="block text-sm">
              <span className="block mb-1 font-medium text-white/80 capitalize">{key}</span>
              <select
                className="w-full rounded-lg border border-[#13161b] bg-[#111316] text-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
                value={state[key]}
                onChange={(e) => setState((s) => ({ ...s, [key]: e.target.value }))}
              >
                {values.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {/* Right: live preview */}
        <div className="rounded-2xl border border-[#13161b] bg-[#0f1115] p-4 shadow-sm">
          <h2 className="text-base font-semibold mb-2">Live preview</h2>
          <pre className="whitespace-pre-wrap rounded-xl border border-[#13161b] bg-[#0b0e12] p-4 text-sm leading-6 text-white/90">
            {assembled}
          </pre>
          <p className="mt-3 text-xs text-white/60">
            Prompts are tuned for editorial magazine campaigns — soft glow, aspirational feel, cosmetics emphasis.
          </p>
        </div>
      </section>
    </div>
  );
}
