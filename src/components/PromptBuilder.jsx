import React, { useMemo, useState } from "react";

/* --- Options --- */
const OPTIONS = {
  subject: ["young woman", "young man", "androgynous model", "middle-aged woman", "middle-aged man"],
  skin: ["fair skin", "light tan", "olive", "deep complexion"],
  eyes: ["Slightly almond-shaped, set a bit apart, honey-brown color. Eyelids slightly heavy, giving a dreamy gaze; enhanced with spider lashes."],
  faceShape: ["oval", "round", "heart-shaped", "angular", "Oval-rounded face with high, full, rounded cheekbones"],
  framing: ["from the shoulders up", "from the collarbones up", "close-up on face"],
  background: ["seamless white", "matte beige", "soft gray studio backdrop", "pastel gradient"],
  lighting: ["soft frontal studio light", "diffused side lighting", "even high-key studio light", "dramatic low-key lighting"],
  camera: ["eye-level with an 85mm portrait lens", "slight low angle with a 50mm lens", "high angle with a 35mm lens", "straight-on macro close-up"],
  dof: ["shallow depth of field (eyes sharp, background blurred)", "medium depth of field (face sharp, background soft)", "deep focus (all details sharp)"],
  focusArea: ["face overall (for makeup)", "eyes and lashes (for eye makeup)", "lips (for lipstick)", "ears (for earrings)", "neckline and collarbones (for necklaces)", "hands near face (for rings)"],
  mood: ["elegant and timeless", "natural and casual", "modern and trendy", "cinematic and dramatic"],
  quality: ["Ultra-realistic 4K", "Photorealistic", "High-quality"],
  orientation: ["vertical portrait", "square", "4:5 portrait"],
};

const PRESETS = [
  {
    name: "Makeup — Lips Focus",
    values: {
      subject: "young woman",
      skin: "fair skin",
      eyes: "Slightly almond-shaped, set a bit apart, honey-brown color. Eyelids slightly heavy, giving a dreamy gaze; enhanced with spider lashes.",
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

/* --- Custom option handling --- */
const CUSTOM_PREFIX = "__custom__:";
const isCustom = (v) => typeof v === "string" && v.startsWith(CUSTOM_PREFIX);
const stripCustom = (v) => (isCustom(v) ? v.slice(CUSTOM_PREFIX.length) : v);

/* --- UI primitives styled for your dark theme --- */
function Field({ label, children }) {
  return (
    <label className="block text-sm mb-3">
      <span className="block mb-1 font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

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
            Ba
