import React, { useMemo, useState } from "react";

/* --- Options --- */
const OPTIONS = {
  subject: ["young woman", "young man", "androgynous model", "middle-aged woman", "middle-aged man"],
  skin: ["fair skin", "light tan", "olive", "deep complexion"],
  faceShape: ["oval", "round", "heart-shaped", "angular"],
  framing: ["from the shoulders up", "from the collarbones up", "close-up on face"],
  background: ["seamless white", "matte beige", "soft gray studio backdrop", "pastel gradient"],
  lighting: ["soft frontal studio light", "diffused side lighting", "even high-key studio light", "dramatic low-key lighting"],
  camera: ["eye-level with an 85mm portrait lens", "slight low angle with a 50mm lens", "high angle with a 35mm lens", "straight-on macro close-up"],
  dof: ["shallow depth of field (eyes sharp, background blurred)", "medium depth of field (face sharp, background soft)", "deep focus (all details sharp)"],
  focusArea: ["face overall (for makeup)", "eyes and lashes (for eye makeup)", "lips (for lipstick)", "ears (for earrings)", "neckline and collarbones (for necklaces)", "hands near face (for rings)"],
  mood: ["elegant and timeless", "natural and casual", "modern and trendy", "cinematic and dramatic"],
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
      background: "seamless white",
      lighting: "soft frontal studio light",
      camera: "eye-level with an 85mm portrait lens",
      dof: "shallow depth of field (eyes sharp, background blurred)",
      focusArea: "face overall (for makeup)",
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
      background: "soft gray studio backdrop",
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

/* --- Pro Enhancers (curated) --- */
const ENHANCERS = {
  Texture: [
    "fine skin pores visible",
    "tiny vellus hairs along jawline",
    "subtle peach fuzz highlights",
    "natural freckles visible",
    "glossy lip micro-creases",
    "hair flyaways catching light",
  ],
  Lighting: [
    "soft wrap around light",
    "gentle specular highlights on cheekbones",
    "shadowless beauty dish feel",
    "feathered rim light",
  ],
  Realism: [
    "very fine film grain in shadow regions",
    "slight chromatic aberration on high-contrast edges",
    "portrait-lens compression (85mm look)",
  ],
  ColorGrading: [
    "neutral color balance",
    "soft warm skin bias",
    "cool background bias",
    "pastel tonality",
  ],
  Background: [
    "seamless gradient vignette at top",
    "very light paper texture",
    "soft falloff to light gray at upper edge",
  ],
  Composition: [
    "eyes line a third from top",
    "slight low-angle POV (~5°)",
    "tight crop from collarbones up",
  ],
  Retouch: [
    "clean beauty retouch while preserving pores",
    "no plastic skin smoothing",
  ],
};

/* --- UI primitives (dark theme) --- */
function Field({ label, children }) {
  return (
    <label className="block text-sm mb-3">
      <span className="block mb-1 font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border text-xs px-3 py-1 mr-2 mb-2 " +
        (active
          ? "border-lime-400 bg-lime-400 text-black"
          : "border-[#13161b] bg-white/5 text-white hover:bg-white/10")
      }
    >
      {children}
    </button>
  );
}

const CUSTOM_PREFIX = "__custom__:";
const isCustom = (v) => typeof v === "string" && v.startsWith(CUSTOM_PREFIX);
const stripCustom = (v) => (isCustom(v) ? v.slice(CUSTOM_PREFIX.length) : v);

function SelectOrCustom({ label, value, onChange, options, id, placeholder }) {
  const showCustom = isCustom(value);
  const baseValue = stripCustom(value);
  const selectOptions = [...options, "Custom…"];

  if (showCustom) {
    return (
      <Field label={label}>
        <div className="flex gap-2">
          <input
            id={id}
            className="w-full rounded-lg border border-[#13161b] bg-[#111316] text-white placeholder-white/40 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
            value={baseValue}
            placeholder={placeholder || `Type custom ${label.toLowerCase()}`}
            onChange={(e) => onChange(CUSTOM_PREFIX + e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg border border-[#13161b] bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10"
            onClick={() => onChange(options[0])}
            title="Back to dropdown"
          >
            Back
          </button>
        </div>
        <span className="mt-1 block text-xs text-white/50">Custom input active. Keep it short and descriptive.</span>
      </Field>
    );
  }

  return (
    <Field label={label}>
      <select
        id={id}
        className="w-full rounded-lg border border-[#13161b] bg-[#111316] text-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
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
    </Field>
  );
}

/* --- Main component --- */
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
  const [enhancers, setEnhancers] = useState(() => new Set());

  const toggleEnhancer = (value) =>
    setEnhancers((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const assembled = useMemo(() => {
    const s = Object.fromEntries(Object.entries(state).map(([k, v]) => [k, stripCustom(v)]));
    const parts = [];
    parts.push(`${s.quality} ${s.orientation} editorial portrait of a ${s.subject} with ${s.skin} and a ${s.faceShape} face, framed ${s.framing}, against a ${s.background}.`);
    parts.push(`Lighting is ${s.lighting}, captured at ${s.camera} with ${s.dof}.`);
    parts.push(`
