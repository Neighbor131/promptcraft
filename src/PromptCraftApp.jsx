import React, { useMemo, useState } from "react";



/** ===== Helpers & UI bits (added) ===== */
export const NewBadge = () => (
  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-400/30">
    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
    NEW
  </span>
);

export const HelpTooltip = ({ text }) => (
  <span className="ml-2 cursor-help text-xs text-zinc-400" title={text}>ⓘ</span>
);

export function LabeledSelect({ label, items, value, onChange, fresh = false, className = "" }) {
  const hint = React.useMemo(() => items.find(x => String(x.value) == String(value))?.hint || "", [items, value]);
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center">
        <span className="text-sm text-zinc-300">{label}</span>
        {fresh && <NewBadge />}
        {hint && <HelpTooltip text={hint} />}
      </div>
      <select
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none hover:border-zinc-600 focus:border-zinc-400"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {items.map(o => (
          <option key={o.value} value={o.value} title={o.hint || ""}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// Newness highlighter (optional)
export function isFresh(key, days = 14) {
  try {
    const seen = localStorage.getItem(`seen_${key}`);
    if (!seen) return true;
    const age = (Date.now() - Number(seen)) / (1000 * 60 * 60 * 24);
    return age >= days;
  } catch { return true; }
}
export function markSeen(key) { try { localStorage.setItem(`seen_${key}`, String(Date.now())); } catch {} }

export function NewHighlight({ children, featureKey, className = "" }) {
  const fresh = isFresh(featureKey);
  return (
    <div
      className={fresh ? `p-1 rounded-lg bg-amber-50/30 ring-1 ring-amber-200/40 ${className}` : className}
      onFocusCapture={() => markSeen(featureKey)}
      onMouseEnter={() => markSeen(featureKey)}
    >
      {children}
    </div>
  );
}

/** ===== Camera vocab constants (added) ===== */
// Use *_OPTS to avoid clashing with existing arrays
export const APERTURE_OPTS = [
  { value: "f/1.2", label: "f/1.2", hint: "ultra blurry background, dreamy bokeh" },
  { value: "f/2.8", label: "f/2.8", hint: "shallow depth, subject pops" },
  { value: "f/4",   label: "f/4",   hint: "balanced blur vs detail" },
  { value: "f/8",   label: "f/8",   hint: "sharp scene, tabletop sweet spot" },
  { value: "f/11",  label: "f/11",  hint: "deep focus" },
];

export const FOCAL_LENGTHS = [
  { value: 24,  label: "24 mm (wide)",     hint: "dramatic perspective, more context" },
  { value: 35,  label: "35 mm (street)",   hint: "natural wide" },
  { value: 50,  label: "50 mm (normal)",   hint: "human-like view, classic" },
  { value: 85,  label: "85 mm (portrait)", hint: "flattering, background melt" },
  { value: 105, label: "105 mm (tele)",    hint: "compressed, tight product/beauty" },
];

export const CAMERA_ANGLE_OPTS = [
  { value: "eye-level", label: "Eye-level",       hint: "neutral, honest" },
  { value: "low-angle", label: "Low angle",       hint: "heroic, powerful" },
  { value: "high-angle",label: "High angle",      hint: "delicate, overview" },
  { value: "top-down",  label: "Top-down (flat)", hint: "graphic layout" },
  { value: "Dutch tilt",label: "Dutch tilt",      hint: "stylized tension" },
];

export const ASPECT_RATIOS = [
  { value: "1:1",  label: "1:1 (Square)",     hint: "balanced; grid friendly" },
  { value: "4:5",  label: "4:5 (Portrait)",   hint: "IG feed tall" },
  { value: "3:2",  label: "3:2 (Classic)",    hint: "photo native" },
  { value: "16:9", label: "16:9 (Wide)",      hint: "cover/hero" },
  { value: "9:16", label: "9:16 (Vertical)",  hint: "Stories/Reels" },
];

/** ===== Prompt helpers (added) ===== */
export const labelFor = (opts, v) => (opts.find(o => String(o.value) == String(v))?.label || v);
export function frag(list, value) {
  const item = list.find(i => String(i.value) == String(value));
  return item ? item.hint || item.label : "";
}

// Camera add-on builder
export function buildCameraAddonLine({ aperture, focal, angle, ratio }) {
  const line = [
    focal    && `${labelFor(FOCAL_LENGTHS, focal)} lens`,
    aperture && `${labelFor(APERTURE_OPTS, aperture)} aperture`,
    angle    && `${labelFor(CAMERA_ANGLE_OPTS, angle)} angle`,
    ratio    && `ratio ${labelFor(ASPECT_RATIOS, ratio)}`,
  ].filter(Boolean).join(" · ");
  return line ? `Camera: ${line}` : "";
}
const ACCENT = "#bfff2f";

const SUBJECT_TYPES = [
  { label: "Human", value: "human" },
  { label: "Creature", value: "creature" },
  { label: "Product", value: "product" },
  { label: "Food", value: "food" },
  { label: "Architecture", value: "architecture" },
  { label: "Landscape", value: "landscape" },
  { label: "Scene / Multi-subject", value: "scene" }
];

const HUMAN_TRAITS = [
  "female",
  "male",
  "androgynous",
  "20s",
  "30s",
  "40s",
  "East Asian",
  "Latina",
  "Black",
  "Caucasian",
  "Middle Eastern",
  "freckles",
  "short platinum hair",
  "braided hair",
  "cybernetic arm"
];

const WARDROBE = [
  "flowing silk dress",
  "editorial suit",
  "streetwear jacket",
  "glossy black kimono",
  "sports outfit",
  "armor",
  "vintage linen"
];

const GENRES = [
  "cinematic",
  "editorial",
  "fine-art",
  "cyberpunk",
  "noir",
  "vintage 1970s",
  "fantasy",
  "documentary",
  "product hero"
];

const SHOT_TYPES = [
  { label: "Extreme close-up (ECU)", value: "ECU" },
  { label: "Close-up (CU)", value: "CU" },
  { label: "Medium close-up (MCU)", value: "MCU" },
  { label: "Medium (MS)", value: "MS" },
  { label: "Full body (FS)", value: "FS" },
  { label: "Wide / Establishing (WS)", value: "WS" }
];

const CAMERA_ANGLES = [
  "straight-on",
  "low angle",
  "high angle",
  "bird's-eye",
  "worm's-eye",
  "Dutch tilt"
];

const LENS_PRESETS = [
  { label: "24mm ultra-wide", value: "24mm" },
  { label: "35mm reportage", value: "35mm" },
  { label: "50mm classic", value: "50mm" },
  { label: "85mm portrait", value: "85mm" },
  { label: "135mm tele", value: "135mm" },
  { label: "Anamorphic 40mm", value: "40mm anamorphic" }
];

const APERTURES = ["f/1.2", "f/1.8", "f/2.8", "f/4", "f/8", "f/11"];

const LIGHT_SOURCES = [
  "softbox",
  "window light",
  "golden hour sun",
  "blue hour",
  "neon signage",
  "tungsten practicals",
  "candlelight",
  "firelight",
  "moonlight",
  "projector patterns"
];

const LIGHT_DIRECTIONS = ["front", "side", "back rim", "top", "under"];
const LIGHT_QUALITIES = [
  "soft diffused",
  "hard contrast",
  "volumetric",
  "chiaroscuro",
  "silhouette"
];

const ENV_SETTINGS = [
  "minimalist studio",
  "urban alley",
  "night market",
  "brutalist atrium",
  "foggy forest",
  "mountain ridge",
  "vintage diner",
  "sterile lab",
  "cozy cafe"
];

const ATMOSPHERE = [
  "none",
  "rain",
  "light mist",
  "fog",
  "dust motes",
  "smoke",
  "steam",
  "snow flurries"
];

const PALETTES = [
  "teal-orange",
  "earth tones",
  "muted pastels",
  "rich jewel tones",
  "high-contrast black & white",
  "Kodak Portra film",
  "Ektachrome cool",
  "Fuji Eterna soft"
];

const TEXTURES = [
  "glossy leather",
  "matte leather",
  "distressed leather",
  "brushed aluminum",
  "anodized metal",
  "chrome mirror",
  "polished brass",
  "brushed steel",
  "frosted glass",
  "holographic foil",
  "iridescent plastic",
  "pearlescent enamel",
  "velvet pile",
  "suede nap",
  "raw linen weave",
  "silk sheen",
  "organza translucency",
  "tulle mesh",
  "coarse burlap",
  "porcelain glaze",
  "patina bronze",
  "weathered wood grain",
  "peeling paint",
  "micro-scratches",
  "scuffed enamel",
  "tarnished silver",
  "oxidized copper",
  "faded print",
  "sun-bleached fabric",
  "frayed edge threads",
  "Portra warm grain",
  "Tri-X chunky grain",
  "Fujifilm soft grain",
  "Kodak Gold pastel grain",
  "halftone dots",
  "screen-print ink bleed",
  "offset print misregistration",
  "dust specks",
  "light leaks",
  "lens flare streak",
  "chromatic aberration",
  "starburst highlights",
  "glare bloom",
  "specular clipping",
  "scan border",
  "VHS static",
  "interlaced scan lines",
  "tape hiss banding",
  "oil-slick rainbow",
  "wet sheen",
  "matte powder finish",
  "gloss varnish",
  "glitter particles",
  "sequined surface",
  "metallic thread glints",
  "spark pin highlights",
  "glass refraction",
  "diffraction rainbow"
];

const QUALITY_TAGS = [
  "cinematic",
  "editorial",
  "glamour photorealism",
  "award-winning",
  "fine-art"
];

const RESOLUTIONS = ["4K", "8K", "print-ready"];

const EMOTIONS = [
  "runway drama",
  "editorial minimalism",
  "couture surrealism",
  "street-style candid",
  "vintage Vogue opulence",
  "032c irreverence",
  "Purple Fashion grit",
  "mall-portrait nostalgia",
  "backstage chaos",
  "museum stillness",
  "golden hour intimacy",
  "blue hour melancholy",
  "neon noir",
  "overcast soft drama",
  "harsh noon realism",
  "misty dawn calm",
  "thunderstorm tension",
  "monsoon humidity",
  "heatwave shimmer",
  "arctic clarity",
  "Y2K gloss",
  "’90s portrait studio",
  "’80s synthwave glow",
  "’70s Kodachrome pop",
  "’60s Technicolor cheer",
  "’50s Polaroid warmth",
  "early digital harshness",
  "VHS home-video softness",
  "film still suspense",
  "grainy documentary truth",
  "luxury product heroism",
  "forbidden romance tension",
  "undercover secrecy",
  "celebration euphoria",
  "protest urgency",
  "industrial grit",
  "deserted urban quiet",
  "seaside nostalgia",
  "high-stakes glamour",
  "melancholic reflection"
];

const STORY_BEATS = [
  "waiting for someone",
  "preparing for a performance",
  "quiet morning routine",
  "final confrontation",
  "mid-escape through rain",
  "lost in thought"
];

const ENGINES = ["Generic", "Midjourney", "Stable Diffusion", "DALL·E"];

function autoCameraFromSelections({ shotType, environment }) {
  const mapByShot = {
    ECU: { lens: "135mm", aperture: "f/2.8" },
    CU: { lens: "85mm", aperture: "f/1.8" },
    MCU: { lens: "50mm", aperture: "f/2.8" },
    MS: { lens: "50mm", aperture: "f/4" },
    FS: { lens: "35mm", aperture: "f/4" },
    WS: { lens: "24mm", aperture: "f/8" }
  };
  const base = mapByShot[shotType || "MS"];
  let iso = "ISO 200";
  if (environment?.includes("night") || environment?.includes("alley")) iso = "ISO 800";
  if (environment?.includes("studio")) iso = "ISO 100";
  return { ...base, iso };
}

const cls = (...arr) => arr.filter(Boolean).join(" ");

function Pill({ children }) {
  return (
    <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
      {children}
    </span>
  );
}

function Section({ title, help, children }) {
  return (
    <div className="bg-[#0b0e12] rounded-xl p-4 border border-[#161a20] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-baseline gap-3 mb-3">
        <h3 className="text-white text-sm font-semibold tracking-wide">{title}</h3>
        {help && <p className="text-zinc-500 text-xs">{help}</p>}
      </div>
      {children}
    </div>
  );
}

function Select({ label, value, onChange, options, disabled }) {
  return (
    <label className="flex flex-col gap-1 w-full">
      <span className="text-xs text-zinc-500">{label}</span>
      <select
        disabled={disabled}
        className={cls(
          "bg-[#0c0f13] border border-[#1a1e25] rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500",
          "focus:outline-none focus:ring-2 focus:ring-lime-300/20 focus:border-lime-300/30 transition-colors",
          "hover:border-[#2a313b]",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function buildGenericPrompt(state, resolvedCam) {
  const {
    subjectType,
    subjectTraits,
    wardrobe,
    genre,
    pose,
    eye,
    angle,
    shotType,
    lens,
    aperture,
    lightSource,
    lightDirection,
    lightQuality,
    environment,
    atmosphere,
    palette,
    textures,
    quality,
    resolution,
    emotion,
    story
  } = state;

  const subjectBits = [];
  if (subjectType === "human") {
    if (subjectTraits.length) subjectBits.push(subjectTraits.join(", "));
    if (wardrobe) subjectBits.push(wardrobe);
  } else if (subjectType) {
    subjectBits.push(subjectType);
  }
  if (genre) subjectBits.push(genre);

  const cameraLine = `Shot from a ${angle || "straight-on"} angle as a ${shotType || "medium shot"}, using a ${
    lens || resolvedCam.lens
  } lens at ${aperture || resolvedCam.aperture} (${resolvedCam.iso}).`;

  const lightingLine = `Lighting: ${lightSource || "soft diffused"}, ${lightDirection || "side"}, ${
    lightQuality || "soft diffused"
  }.`;

  const envLine = `Environment: ${environment || "minimalist studio"}${
    atmosphere && atmosphere !== "none" ? ` with ${atmosphere}` : ""
  }.`;

  const textureLine = textures.length ? `Textures & details: ${textures.join(", ")}.` : "";
  const colorLine = palette ? `Color & grading: ${palette}.` : "";
  const qualityLine = `${resolution || "8K"} resolution${quality ? ", " + quality : ""}.`;
  const narrativeLine = emotion || story ? `Mood: ${emotion || ""}${emotion && story ? ", " : ""}${story || ""}.` : "";

  return [
    `A ${subjectBits.join(", ") || "well-defined subject"}. ${pose || ""} ${eye ? `Eyes ${eye}.` : ""}`.trim(),
    cameraLine,
    lightingLine,
    envLine,
    textureLine,
    colorLine,
    qualityLine,
    narrativeLine
  ]
    .filter(Boolean)
    .join("\n");
}

function buildMidjourney(state, resolvedCam, ratio) {
  const generic = buildGenericPrompt(state, resolvedCam).replaceAll("\n", " ").trim();
  return `${generic} --ar ${ratio || "3:2"} --stylize 300 --seed 1234`;
}

function buildStableDiffusion(state, resolvedCam) {
  const generic = buildGenericPrompt(state, resolvedCam).replaceAll("\n", ", ");
  const negatives = "low-res, deformed, extra fingers, watermark, oversaturated skin, blurry";
  return `(masterpiece, cinematic), ${generic} \nNEGATIVE: ${negatives} \nCFG=7 STEPS=30 SAMPLER=DPM++ SDE Karras SEED=1234`;
}

function buildDALLE(state, resolvedCam) {
  const lines = buildGenericPrompt(state, resolvedCam).split("\n");
  return `Create a high-end cinematic image. ${lines.join(" ")}`;
}

export default function PromptCraftApp({ hideHeader = true }) {
  const [engine, setEngine] = useState("Generic");
  const [proMode, setProMode] = useState(false);

  // Added camera enhancement states (separate from big state object)
  const [apertureExtra, setApertureExtra] = useState("f/2.8");
  const [focal, setFocal]                 = useState(85);
  const [angleExtra, setAngleExtra]       = useState("eye-level");
  const [ratio, setRatio]                 = useState("4:5");

  const [state, setState] = useState({
    subjectType: "human",
    subjectTraits: ["female", "20s"],
    wardrobe: "flowing silk dress",
    genre: "cinematic",
    pose: "standing still",
    eye: "looking into the camera",
    angle: "straight-on",
    shotType: "MCU",
    lens: "",
    aperture: "",
    lightSource: "softbox",
    lightDirection: "side",
    lightQuality: "soft diffused",
    environment: "minimalist studio",
    atmosphere: "none",
    palette: "teal-orange",
    textures: ["film grain"],
    quality: "cinematic",
    resolution: "8K",
    emotion: "serene",
    story: "quiet moment before performance"
  });

  const resolvedCam = useMemo(
    () => autoCameraFromSelections({ shotType: state.shotType, environment: state.environment }),
    [state.shotType, state.environment]
  );

  const prompt = useMemo(() => {
    const base = (() => {
      switch (engine) {
        case "Midjourney":
          return buildMidjourney(state, resolvedCam, ratio);
        case "Stable Diffusion":
          return buildStableDiffusion(state, resolvedCam);
        case "DALL·E":
          return buildDALLE(state, resolvedCam);
        default:
          return buildGenericPrompt(state, resolvedCam);
      }
    })();
    const camLine = buildCameraAddonLine({ aperture: apertureExtra || state.aperture, focal, angle: angleExtra || state.angle, ratio });
    return camLine ? `${base} ${camLine}` : base;
  }, [engine, state, resolvedCam, apertureExtra, angleExtra, focal, ratio]);

  const cameraStrip = `${state.lens || resolvedCam.lens} • ${state.aperture || resolvedCam.aperture} • ${resolvedCam.iso}`;

  const update = (patch) => setState((s) => ({ ...s, ...patch }));

  const toggleTrait = (trait) => {
    setState((s) => {
      const has = s.subjectTraits.includes(trait);
      return { ...s, subjectTraits: has ? s.subjectTraits.filter((t) => t !== trait) : [...s.subjectTraits, trait] };
    });
  };

  const toggleTexture = (t) => {
    setState((s) => {
      const has = s.textures.includes(t);
      return { ...s, textures: has ? s.textures.filter((x) => x !== t) : [...s.textures, t] };
    });
  };

 return (
  <div
    className="min-h-screen bg-[#0a0c0f] text-white"
    style={{ fontFamily: "ui-sans-serif, system-ui" }}
  >
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#13161b]">
      {/* Left: logo area (hidden when hideHeader = true) */}
      <div className="flex items-center gap-3">
        {!hideHeader ? (
          <>
            <img
              src={`${import.meta.env.BASE_URL}promptcraftfavicon.svg`}
              alt="PromptCraft Logo"
              className="w-8 h-8"
            />
            <span className="font-semibold tracking-wide">PromptCraft</span>
          </>
        ) : (
          // optional spacer to keep layout from jumping when logo is hidden
          <span className="w-8 h-8 inline-block" />
        )}
      </div>

      {/* Right: tabs + toggle (always visible) */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400">
        {ENGINES.map((e) => (
          <button
            key={e}
            className={cls(
              "px-3 py-1 rounded-lg border",
              engine === e
                ? "border-transparent text-black"
                : "border-[#2a2a2a] hover:border-zinc-600"
            )}
            style={engine === e ? { background: ACCENT } : {}}
            onClick={() => setEngine(e)}
          >
            {e}
          </button>
        ))}
        <div className="w-px h-6 bg-[#1f1f1f] mx-2" />
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={proMode}
            onChange={(e) => setProMode(e.target.checked)}
          />
          <span className="text-zinc-300">Pro camera controls</span>
        </label>
      </nav>
    </header>

      <section className="px-6 py-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Craft stunning, cinematic prompts</h1>
        <p className="text-zinc-400 mt-3">Pick what you see. We’ll handle the camera math.</p>
      </section>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-20 max-w-6xl mx-auto">
        <div className="space-y-4">
          <Section title="Subject & Style" help="Who/what, styling and vibe">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Subject type" value={state.subjectType} onChange={(v) => update({ subjectType: v })} options={SUBJECT_TYPES} />
              <Select label="Wardrobe / Materials" value={state.wardrobe} onChange={(v) => update({ wardrobe: v })} options={WARDROBE} disabled={state.subjectType !== "human"} />
              <Select label="Genre / Style" value={state.genre} onChange={(v) => update({ genre: v })} options={GENRES} />
              <Select label="Pose / Action" value={state.pose} onChange={(v) => update({ pose: v })} options={["standing still", "seated", "walking", "running", "reclining", "reaching", "leaning"]} />
              <Select label="Eye direction" value={state.eye} onChange={(v) => update({ eye: v })} options={["looking into the camera", "looking left", "looking right", "gazing downward", "gazing upward", "eyes closed"]} />
            </div>
            {state.subjectType === "human" && (
              <div className="mt-3">
                <p className="text-xs text-zinc-400 mb-2">Human traits</p>
                <div className="flex flex-wrap gap-2">
                  {HUMAN_TRAITS.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTrait(t)}
                      className={cls(
                        "px-2 py-1 rounded-full text-xs border",
                        state.subjectTraits.includes(t) ? "text-black border-transparent" : "text-zinc-300 border-[#2a2a2a] hover:border-zinc-600"
                      )}
                      style={state.subjectTraits.includes(t) ? { background: ACCENT } : {}}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section title="Camera & Composition" help="We auto-fill smart settings from your shot type">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Shot type" value={state.shotType} onChange={(v) => update({ shotType: v })} options={SHOT_TYPES} />
              <Select label="Camera angle" value={state.angle} onChange={(v) => update({ angle: v })} options={CAMERA_ANGLES} />
              <Select label="Lens (pro)" value={state.lens} onChange={(v) => update({ lens: v })} options={LENS_PRESETS} disabled={!proMode} />
              <Select label="Aperture (pro)" value={state.aperture} onChange={(v) => update({ aperture: v })} options={APERTURES} disabled={!proMode} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
              <Pill>Auto camera: {`${(state.lens || "")} ${(state.aperture || "")}`.trim() || `${resolvedCam.lens} ${resolvedCam.aperture}`}</Pill>
              <Pill>{resolvedCam.iso}</Pill>
            </div>
          </Section>
          <Section title="Camera settings" help="Quick, human-friendly camera picks">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              <LabeledSelect
                label="Aperture"
                items={APERTURE_OPTS}
                value={apertureExtra}
                onChange={setApertureExtra}
                fresh
              />
              <LabeledSelect
                label="Focal length"
                items={FOCAL_LENGTHS}
                value={focal}
                onChange={(v) => setFocal(Number(v))}
                fresh
              />
              <LabeledSelect
                label="Angle"
                items={CAMERA_ANGLE_OPTS}
                value={angleExtra}
                onChange={setAngleExtra}
                fresh
              />
              <LabeledSelect
                label="Aspect ratio"
                items={ASPECT_RATIOS}
                value={ratio}
                onChange={setRatio}
                fresh
              />
            </div>
          </Section>


          <Section title="Scene & Lighting" help="Where it happens and how it’s lit">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Lighting source" value={state.lightSource} onChange={(v) => update({ lightSource: v })} options={LIGHT_SOURCES} />
              <Select label="Lighting direction" value={state.lightDirection} onChange={(v) => update({ lightDirection: v })} options={LIGHT_DIRECTIONS} />
              <Select label="Lighting quality" value={state.lightQuality} onChange={(v) => update({ lightQuality: v })} options={LIGHT_QUALITIES} />
              <Select label="Environment" value={state.environment} onChange={(v) => update({ environment: v })} options={ENV_SETTINGS} />
              <Select label="Atmosphere" value={state.atmosphere} onChange={(v) => update({ atmosphere: v })} options={ATMOSPHERE} />
              <Select label="Color palette / grading" value={state.palette} onChange={(v) => update({ palette: v })} options={PALETTES} />
            </div>
            <div className="mt-3">
              <p className="text-xs text-zinc-400 mb-2">Textures & micro details</p>
              <div className="flex flex-wrap gap-2">
                {TEXTURES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTexture(t)}
                    className={cls(
                      "px-2 py-1 rounded-full text-xs border",
                      state.textures.includes(t) ? "text-black border-transparent" : "text-zinc-300 border-[#2a2a2a] hover:border-zinc-600"
                    )}
                    style={state.textures.includes(t) ? { background: ACCENT } : {}}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Quality & Narrative" help="Finish with resolution and mood">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select label="Quality tag" value={state.quality} onChange={(v) => update({ quality: v })} options={QUALITY_TAGS} />
              <Select label="Resolution" value={state.resolution} onChange={(v) => update({ resolution: v })} options={RESOLUTIONS} />
              <Select label="Emotion" value={state.emotion} onChange={(v) => update({ emotion: v })} options={EMOTIONS} />
              <Select label="Story beat" value={state.story} onChange={(v) => update({ story: v })} options={STORY_BEATS} />
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Live Prompt" help="Updates instantly as you choose">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-zinc-400">Camera: {cameraStrip}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(prompt)}
                  className="text-sm px-3 py-1.5 rounded-lg border border-[#2a2a2a] hover:border-zinc-600"
                >
                  Copy prompt
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText("low-res, deformed, extra fingers, watermark, oversaturated skin, blurry")}
                  className="text-sm px-3 py-1.5 rounded-lg"
                  style={{ background: ACCENT, color: "#111" }}
                >
                  Copy negatives
                </button>
              </div>
            </div>
            <textarea
              readOnly
              className="w-full h-[360px] bg-[#0b0f14] border border-[#151a21] rounded-xl p-4 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-lime-300/20"
              value={prompt}
            />
          </Section>
          <Section title="Camera glossary" help="Plain-language reminders">
            <ul className="space-y-2 text-sm text-zinc-300">
              {apertureExtra && <li><strong>Aperture:</strong> {labelFor(APERTURE_OPTS, apertureExtra)} — {frag(APERTURE_OPTS, apertureExtra)}</li>}
              {focal         && <li><strong>Focal length:</strong> {labelFor(FOCAL_LENGTHS, focal)} — {frag(FOCAL_LENGTHS, focal)}</li>}
              {angleExtra    && <li><strong>Angle:</strong> {labelFor(CAMERA_ANGLE_OPTS, angleExtra)} — {frag(CAMERA_ANGLE_OPTS, angleExtra)}</li>}
              {ratio         && <li><strong>Aspect ratio:</strong> {labelFor(ASPECT_RATIOS, ratio)} — {frag(ASPECT_RATIOS, ratio)}</li>}
            </ul>
          </Section>


          <Section title="Tips" help="Small things that make outputs premium">
            <ul className="text-sm text-zinc-300 list-disc ml-5 space-y-2">
              <li>Choose a shot type before everything else. It drives lens + depth for you.</li>
              <li>Pick one strong palette; avoid mixing too many styles at once.</li>
              <li>Use 1–3 textures max. Clutter kills clarity.</li>
              <li>If it’s night, try neon signage + rain for instant cinematic reflections.</li>
            </ul>
          </Section>
        </div>
      </main>

      <footer className="px-6 py-10 text-center text-zinc-500 border-t border-[#13161b]">
        Made for creators who know what they want but not what it’s called.
      </footer>
    </div>
  );
}
