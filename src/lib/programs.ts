import scheduleData from "../content/schedule.json";

// Single source of truth for the programs shown on the homepage teaser
// (short copy) and the full /programs page (long copy). Both derive from
// schedule.json so a program only appears if it's actually on the schedule.

export type ProgramKey =
  | "bjj-nogi"
  | "bjj-gi"
  | "muay-thai"
  | "boxing"
  | "wrestling"
  | "kids-mma"
  | "ladies-self-defence";

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
  "boxing",
  "wrestling",
  "kids-mma",
  "ladies-self-defence",
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
  "ladies-self-defence": {
    name: "Ladies Self-Defence",
    short:
      "Practical, confidence-building self-defence for women — no experience needed.",
    description:
      "Practical, confidence-building self-defence for women. Learn to recognize threats and respond with simple, effective techniques — no experience required.",
  },
};

// Maps each raw schedule class name to a program key. `null` means the class is
// intentionally not surfaced as its own program (e.g. drop-in Open Mat).
const nameToKey: Record<string, ProgramKey | null> = {
  "No Gi BJJ Fundamentals": "bjj-nogi",
  "No Gi BJJ All Levels": "bjj-nogi",
  "No Gi BJJ": "bjj-nogi",
  "BJJ No Gi Kids — Ages 4–8": "bjj-nogi",
  "BJJ No Gi Kids — Ages 9–13": "bjj-nogi",
  "BJJ No Gi Kids — Ages 8+": "bjj-nogi",
  "Gi BJJ All Levels": "bjj-gi",
  "Muay Thai": "muay-thai",
  "Adult Boxing": "boxing",
  "Wrestling — Adults & Kids 8+": "wrestling",
  "Kids MMA — Ages 4–8": "kids-mma",
  "Kids MMA — Ages 9–13": "kids-mma",
  "Ladies Self-Defence": "ladies-self-defence",
  "Sunday Open Mat — All Levels": null,
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
    if (!(cls.name in nameToKey)) {
      throw new Error(
        `programs.ts: unmapped class name "${cls.name}" in schedule.json. Add it to nameToKey.`,
      );
    }
    const key = nameToKey[cls.name];
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
