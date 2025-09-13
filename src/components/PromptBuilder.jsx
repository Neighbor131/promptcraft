import React, { useMemo, useState } from "react";

// Single-file, drop-in prompt builder for e-commerce model portraits
// - No external deps required (Tailwind classes optional)
// - Copy-to-clipboard + live preview
// - Easily extend option lists
// - NEW: any dropdown can switch to a custom text input via “Custom…”

const OPTIONS = {
  subject: [
    "young woman",
    "young man",
    "androgynous model",
    "middle-aged woman",
    "middle-aged man",
  ],
  skin: ["fair skin", "light tan", "olive", "deep complexion"],
  faceShape: ["oval", "round", "heart-shaped", "angular"],
  framing: [
    "from the shoulders up",
    "from the collarbones up",
    "close-up on face",
  ],
  background: [
    "seamless white",
    "matte beige",
    "soft gray studio backdrop",
    "pastel gradient",
  ],
  lighting: [
    "soft frontal studio light",
    "diffused side lighting",
    "even high-key studio light",
    "dramatic low-key lighting",
  ],
  camera: [
    "eye-level with an 85mm portrait lens",
    "slight low angle with a 50mm lens",
    "high angle with a 35mm lens",
    "straight-on macro close-up",
  ],
  dof: [
    "shallow depth of field (eyes sharp, background blurred)",
    "medium depth of field (face sharp, background soft)",
    "deep focus (all details sharp)",
  ],
  focusArea: [
    "face overall (for makeup)",
    "eyes and lashes (for eye makeup)",
    "lips (for lipstick)",
    "ears (for earrings)",
    "neckline and collarbones (for necklaces)",
    "hands near face (for rings)",
  ],
  mood: [
    "elegant and timeless",
    "natural and casual",
    "modern and trendy",
    "cinematic and dramatic",
  ],
  quality: ["Ultra-realistic", "Photorealistic", "High-quality"],
  orientation: ["vertical portrait", "square", "4:5 portrait"],
};

const PRESETS = [
  {
    name: "Makeup — Lips Focus",
    values: {
      subject: "young woman",
      skin: "fair skin",
      faceShape: "oval",
      framing: "from the shoulders up",
      background: "matte beige",
      lighting: "soft frontal studio light",
      camera: "eye-level with an 85mm portrait lens",
      dof: "shallow depth of field (eyes sharp, background blurred)",
      focusArea: "lips (for lipstick)",
      mood: "elegant and timeless",
      quality: "Ultra-realistic",
      orientation: "vertical portrait",
    },
  },
  {
    name: "Jewelry — Earrings Focus",
    values: {
      subject: "young woman",
      skin: "olive",
      faceShape: "heart-shaped",
      framing: "from the collarbones up",
      background: "seamless white",
      lighting: "even high-key studio light",
      camera: "eye-level with an 85mm portrait lens",
      dof: "medium depth of field (face sharp, background soft)",
      focusArea: "ears (for earrings)",
      mood: "modern and trendy",
      quality: "Photorealistic",
      orientation: "vertical portrait",
    },
  },
  {
    name: "Necklace — Décolleté Focus",
    values: {
      subject: "young woman",
      skin: "light tan",
      faceShape: "oval",
      framing: "from the collarbones up",
      background: "soft gray studio backdrop",
      lighting: "diffused side lighting",
      camera: "slight low angle with a 50mm lens",
      dof: "shallow depth of field (eyes sharp, background blurred)",
      focusArea: "neckline and collarbones (for necklaces)",
      mood: "elegant and timeless",
      quality: "High-quality",
      orientation: "4:5 portrait",
    },
  },
];

const CUSTOM_PREFIX = "__custom__:";
const isCustom = (v) => typeof v === "string" && v.startsWith(CUSTOM_PREFIX);
const stripCustom = (v) => (isCustom(v) ? v.slice(CUSTOM_PREFIX.length) : v);

function SelectOrCustom({ label, value, onChange, options, id, placeholder }) {
  const showCustom = isCustom(value);
  const baseValue = stripCustom(value);
  const selectOptions = [...options, "Custom…"];

  if (showCustom) {
    return (
      <label className="block text-sm mb-3">
        <span className="block mb-1 font-medium text-gray-800">{label}</span>
        <div className="flex gap-2">
          <input
            id={id}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            value={baseValue}
            placeholder={placeholder || `Type custom ${label.toLowerCase()}`}
            onChange={(e) => onChange(CUSTOM_PREFIX + e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700"
            onClick={() => onChange(options[0])}
            title="Back to dropdown"
          >
            Back
          </button>
        </div>
        <span className="mt-1 block text-xs text-gray-500">
          Custom input active. Keep it short and descriptive.
        </span>
      </label>
    );
  }

  return (
    <label className="block text-sm mb-3">
      <span className="block mb-1 font-medium text-gray-800">{label}</span>
      <select
        id={id}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "Custom…") return onChange(CUSTOM_PREFIX);
          onChange(v);
        }}
      >
        {selectOptions.map((opt) => (
          <option key={opt} value={opt === "Custom…" ? "Custom…" : opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function PromptBuilder() {
  const [state, setState] = useState({
    subject: OPTIONS.subject[0],
    skin: OPTIONS.skin[0],
    faceShape: OPTIONS.faceShape[0],
    framing: OPTIONS.framing[0],
    background: OPTIONS.background[0],
    lighting: OPTIONS.lighting[0],
    camera: OPTIONS.camera[0],
    dof: OPTIONS.dof[0],
    focusArea: OPTIONS.focusArea[0],
    mood: OPTIONS.mood[0],
    quality: OPTIONS.quality[0],
    orientation: OPTIONS.orientation[0],
  });
  const [notes, setNotes] = useState("");

  const assembled = useMemo(() => {
    const s = Object.fromEntries(
      Object.entries(state).map(([k, v]) => [k, stripCustom(v)])
    );
    const parts = [];
    parts.push(
      `${s.quality} ${s.orientation} editorial portrait of a ${s.subject} with ${s.skin} and a ${s.faceShape} face, framed ${s.framing}, against a ${s.background}.`
    );
    parts.push(
      `Lighting is ${s.lighting}, captured at ${s.camera} with ${s.dof}.`
    );
    parts.push(`Emphasize ${s.focusArea}. The mood is ${s.mood}.`);
    if (notes.trim()) parts.push(`Details: ${notes.trim()}`);
    return parts.join(" ");
  }, [state, notes]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(assembled);
      alert("Prompt copied to clipboard");
    } catch (e) {
      console.error(e);
      alert("Copy failed — your browser may block clipboard access.");
    }
  };

  const applyPreset = (preset) => {
    setState((s) => ({ ...s, ...preset.values }));
  };

  const reset = () => {
    setState({
      subject: OPTIONS.subject[0],
      skin: OPTIONS.skin[0],
      faceShape: OPTIONS.faceShape[0],
      framing: OPTIONS.framing[0],
      background: OPTIONS.background[0],
      lighting: OPTIONS.lighting[0],
      camera: OPTIONS.camera[0],
      dof: OPTIONS.dof[0],
      focusArea: OPTIONS.focusArea[0],
      mood: OPTIONS.mood[0],
      quality: OPTIONS.quality[0],
      orientation: OPTIONS.orientation[0],
    });
    setNotes("");
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          E-commerce Model Prompt Builder
        </h1>
        <p className="text-sm text-gray-600">
          Assemble consistent, studio-grade prompts for makeup, jewelry, and
          apparel PDP assets. Use “Custom…” in any dropdown to type your own.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3">
            <SelectOrCustom
              label="Subject"
              value={state.subject}
              onChange={(v) => setState((s) => ({ ...s, subject: v }))}
              options={OPTIONS.subject}
              id="subject"
              placeholder="e.g., androgynous model with freckles"
            />

            <div className="grid grid-cols-2 gap-3">
              <SelectOrCustom
                label="Skin"
                value={state.skin}
                onChange={(v) => setState((s) => ({ ...s, skin: v }))}
                options={OPTIONS.skin}
                id="skin"
                placeholder="e.g., deep ebony skin tone"
              />
              <SelectOrCustom
                label="Face shape"
                value={state.faceShape}
                onChange={(v) => setState((s) => ({ ...s, faceShape: v }))}
                options={OPTIONS.faceShape}
                id="faceshape"
                placeholder="e.g., diamond-shaped"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectOrCustom
                label="Framing"
                value={state.framing}
                onChange={(v) => setState((s) => ({ ...s, framing: v }))}
                options={OPTIONS.framing}
                id="framing"
                placeholder="e.g., extreme close-up on lips"
              />
              <SelectOrCustom
                label="Background"
                value={state.background}
                onChange={(v) => setState((s) => ({ ...s, background: v }))}
                options={OPTIONS.background}
                id="background"
                placeholder="e.g., warm taupe seamless"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectOrCustom
                label="Lighting"
                value={state.lighting}
                onChange={(v) => setState((s) => ({ ...s, lighting: v }))}
                options={OPTIONS.lighting}
                id="lighting"
                placeholder="e.g., ring light with soft diffusion"
              />
              <SelectOrCustom
                label="Camera / Angle"
                value={state.camera}
                onChange={(v) => setState((s) => ({ ...s, camera: v }))}
                options={OPTIONS.camera}
                id="camera"
                placeholder="e.g., eye-level with 100mm macro"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectOrCustom
                label="Depth of field"
                value={state.dof}
                onChange={(v) => setState((s) => ({ ...s, dof: v }))}
                options={OPTIONS.dof}
                id="dof"
                placeholder="e.g., ultra shallow DOF, background fully creamy"
              />
              <SelectOrCustom
                label="Focus area"
                value={state.focusArea}
                onChange={(v) => setState((s) => ({ ...s, focusArea: v }))}
                options={OPTIONS.focusArea}
                id="focus"
                placeholder="e.g., left ear with hoop earring"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectOrCustom
                label="Mood"
                value={state.mood}
                onChange={(v) => setState((s) => ({ ...s, mood: v }))}
                options={OPTIONS.mood}
                id="mood"
                placeholder="e.g., soft, natural, editorial"
              />
              <SelectOrCustom
                label="Quality"
                value={state.quality}
                onChange={(v) => setState((s) => ({ ...s, quality: v }))}
                options={OPTIONS.quality}
                id="quality"
                placeholder="e.g., ultra clean beauty retouch"
              />
            </div>

            <SelectOrCustom
              label="Orientation / Aspect"
              value={state.orientation}
              onChange={(v) => setState((s) => ({ ...s, orientation: v }))}
              options={OPTIONS.orientation}
              id="orientation"
              placeholder="e.g., 3:4 portrait"
            />

            <label className="block text-sm">
              <span className="block mb-1 font-medium text-gray-800">
                Extra details (optional)
              </span>
              <textarea
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                rows={3}
                placeholder="e.g., natural freckles visible, subtle flyaways, glossy lipstick with fine highlights"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>

            <div className="mt-2 flex gap-2">
              <button
                onClick={copy}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm active:scale-[.99]"
              >
                Copy prompt
              </button>
              <button
                onClick={reset}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm active:scale-[.99]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Live preview</h2>
            <div className="flex gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium hover:bg-gray-50"
                  title={`Apply preset: ${p.name}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-900">
            {assembled}
          </pre>
          <p className="mt-3 text-xs text-gray-500">
            Tip: use “Custom…” to type anything not in the list (e.g., "deep
            ebony skin tone", "eye-level with 100mm macro"). The builder will
            merge it cleanly into the prompt.
          </p>
        </div>
      </section>

      <footer className="mt-6 text-center text-xs text-gray-500">
        Single-file component. Extend OPTION lists or add new dropdowns (pose,
        ethnicity, makeup style) as needed.
      </footer>
    </div>
  );
}
