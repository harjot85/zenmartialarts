import scheduleData from "../content/schedule.json";

// Single source of truth for the programs shown on the homepage teaser
// (short copy) and the full /programs page (long copy). Both derive from
// schedule.json so a program only appears if it's actually on the schedule.

export type ProgramKey =
  | "bjj-nogi"
  | "bjj-gi"
  | "muay-thai"
  | "kickboxing"
  | "boxing"
  | "wrestling"
  | "kids-mma"
  | "ladies-self-defence"
  | "yoga";

export interface Program {
  key: ProgramKey;
  name: string;
  /** One-line teaser copy for the homepage. */
  short: string;
  /** Fuller copy for the dedicated /programs page. */
  description: string;
  /** Short day names this program runs on, ordered Mon→Sun. */
  days: string[];
}

// Controls display order everywhere.
const programOrder: ProgramKey[] = [
  "bjj-nogi",
  "bjj-gi",
  "muay-thai",
  "kickboxing",
  "boxing",
  "wrestling",
  "kids-mma",
  "ladies-self-defence",
  "yoga",
];

const programDefs: Record<ProgramKey, Omit<Program, "key" | "days">> = {
  "bjj-nogi": {
    name: "Brazilian Jiu-Jitsu (No Gi)",
    short:
      "Fast, athletic grappling built on control, leverage, and submissions — no gi required.",
    description:
      "Grappling without the traditional gi — fast-paced, athletic, and built on control, leverage, and submissions. Sessions run from fundamentals through all-levels rolling, so there's a place for you whatever your experience.",
  },
  "bjj-gi": {
    name: "Brazilian Jiu-Jitsu (Gi)",
    short:
      "Classic ground fighting in the traditional gi — grips, sweeps, and submissions.",
    description:
      "The classic art of ground fighting in the traditional gi. Learn positional control, sweeps, and submissions while using the grips and friction the gi provides. All levels welcome on the mat.",
  },
  "muay-thai": {
    name: "Muay Thai",
    short:
      "The art of eight limbs — punches, elbows, knees, and kicks with real pad work.",
    description:
      "The 'art of eight limbs' — striking with fists, elbows, knees, and shins. Sharpen your stand-up game through pad work, clinch, and conditioning in every class.",
  },
  kickboxing: {
    name: "Kickboxing",
    short:
      "Punches and kicks at pace — Level 1 builds the technique, then you step up to Level 2 Muay Thai.",
    description:
      "Striking that pairs boxing hands with kicks, knees, and footwork. Our Level 1 classes build clean technique and conditioning from the ground up, and flow straight into Level 2 Muay Thai for anyone who wants the full art of eight limbs.",
  },
  boxing: {
    name: "Boxing",
    short:
      "Sharp footwork, head movement, and punching power — for fitness or the ring.",
    description:
      "Footwork, head movement, and clean punching power. Our adult boxing classes build technique and cardio whether you're training for fitness or the ring.",
  },
  wrestling: {
    name: "Wrestling",
    short:
      "Takedowns, control, and top pressure — the relentless backbone of MMA.",
    description:
      "Takedowns, control, and top pressure — the backbone of MMA. Open to adults and kids 8+, wrestling builds toughness, balance, and relentless conditioning.",
  },
  "kids-mma": {
    name: "Kids MMA",
    short:
      "Confidence, coordination, and respect through striking and grappling for ages 4–13.",
    description:
      "A fun, disciplined introduction to mixed martial arts for ages 4–13. Kids build coordination, confidence, and respect while learning striking and grappling basics in a safe, supportive environment.",
  },
  yoga: {
    name: "Yoga",
    short:
      "Mobility, breathing, and recovery — the session that keeps the rest of your training going.",
    description:
      "A recovery-focused session built for people who train hard. Open hips and shoulders, restore mobility, and work on breathing and control so you come back to the mats fresher and stay injury-free.",
  },
  "ladies-self-defence": {
    name: "Ladies Self-Defence",
    short:
      "Practical, confidence-building self-defence for women — no experience needed.",
    description:
      "Practical, confidence-building self-defence for women. Learn to recognize threats and respond with simple, effective techniques — no experience required.",
  },
};

// Maps a schedule class to a program key. Keyed by "Name | Detail" first so
// classes that share a name can differ (Level 1 is Kickboxing, Level 2 is Muay
// Thai), falling back to the bare name. `null` means the class is intentionally
// not surfaced as its own program (e.g. drop-in Open Mat).
const nameToKey: Record<string, ProgramKey | null> = {
  // No-Gi BJJ
  "No-Gi BJJ": "bjj-nogi",
  "Adv No-Gi BJJ": "bjj-nogi",
  "Kids BJJ": "bjj-nogi",
  // Gi BJJ
  "Gi BJJ": "bjj-gi",
  "Gi BJJ Kids": "bjj-gi",
  "BJJ Fundamentals": "bjj-gi",
  "Adv BJJ Gi": "bjj-gi",
  // Striking
  "Muay Thai": "muay-thai",
  Kickboxing: "kickboxing",
  "Fund. Boxing": "boxing",
  "Adv. Boxing": "boxing",
  Boxing: "boxing",
  // Wrestling
  Wrestling: "wrestling",
  "Kids Wrestling": "wrestling",
  // Other
  "Kids MMA": "kids-mma",
  Ladies: "ladies-self-defence",
  "Ladies Self-Defence": "ladies-self-defence",
  Yoga: "yoga",
  // Drop-in sessions — not standalone programs
  "Open Mat": null,
  "MMA Open Mat": null,
  "BJJ Open Mat": null,
};

/** Looks up a class's program key, preferring the name+detail form. */
export const keyFor = (cls: { name: string; detail?: string }) => {
  const compound = cls.detail ? `${cls.name} | ${cls.detail}` : null;
  if (compound && compound in nameToKey) return nameToKey[compound];
  if (cls.name in nameToKey) return nameToKey[cls.name];
  throw new Error(
    `programs.ts: unmapped class "${compound ?? cls.name}" in schedule.json. Add it to nameToKey.`,
  );
};

const dayOrder: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

// Collect, per program, which days it runs on (derived from the live schedule).
const programDays = new Map<ProgramKey, Set<string>>();
for (const day of scheduleData.days) {
  for (const cls of day.classes) {
    const key = keyFor(cls);
    if (!key) continue;
    if (!programDays.has(key)) programDays.set(key, new Set());
    programDays.get(key)!.add(day.shortDay);
  }
}

export const programs: Program[] = programOrder
  .filter((key) => programDays.has(key))
  .map((key) => ({
    key,
    ...programDefs[key],
    days: Array.from(programDays.get(key)!).sort(
      (a, b) => dayOrder[a] - dayOrder[b],
    ),
  }));
