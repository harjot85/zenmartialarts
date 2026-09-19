import scheduleData from "../content/schedule.json";

// Single source of truth for the six programs: the homepage cards (short
// copy), the /programs cards (longer copy), the header/footer program links
// and the /programs/<slug> detail pages. Each program lists the schedule.json
// class names it covers, so its days and its schedule table are derived from
// the live schedule rather than hard-coded.

export type ProgramSlug =
  | "bjj"
  | "muay-thai-kickboxing"
  | "boxing"
  | "wrestling"
  | "kids-martial-arts"
  | "womens-self-defense";

export interface ProgramDef {
  slug: ProgramSlug;
  name: string;
  /** Card copy for the homepage. */
  short: string;
  /** Card copy for the /programs page. */
  description: string;
  /** Link text on cards, e.g. "Explore BJJ". */
  cta: string;
  /** schedule.json class `name`s this program covers. */
  classNames: string[];
  /**
   * Restricts matching to one audience. Kids only picks up "Wrestling" blocks
   * that are open to kids ("both"), never an adults-only block.
   */
  audience?: "adults" | "kids";
}

export interface Program extends ProgramDef {
  href: string;
  /** Short day names this program runs on, ordered Mon→Sun. */
  days: string[];
}

type ScheduleClass = { name: string; detail?: string; category: string };

// Display order everywhere (mockup order).
const programDefs: ProgramDef[] = [
  {
    slug: "bjj",
    name: "Brazilian Jiu-Jitsu",
    short:
      "Gi and no-gi grappling built on control, leverage, and submissions.",
    description:
      "Gi and no-gi grappling built on control, leverage, and submissions — fundamentals through advanced.",
    cta: "Explore BJJ",
    classNames: [
      "No-Gi BJJ",
      "Adv No-Gi BJJ",
      "Gi BJJ",
      "BJJ Fundamentals",
      "Adv BJJ Gi",
      "BJJ Open Mat",
    ],
    audience: "adults",
  },
  {
    slug: "muay-thai-kickboxing",
    name: "Muay Thai & Kickboxing",
    short:
      "The art of eight limbs — punches, elbows, knees, and kicks with real pad work.",
    description:
      "The art of eight limbs — punches, elbows, knees, and kicks with real pad work.",
    cta: "Explore Muay Thai",
    classNames: ["Kickboxing", "Muay Thai"],
    audience: "adults",
  },
  {
    slug: "boxing",
    name: "Boxing",
    short:
      "Footwork, head movement, and punching power, from fundamentals to advanced.",
    description:
      "Footwork, head movement, and punching power, from fundamentals to advanced.",
    cta: "Explore Boxing",
    classNames: ["Fund. Boxing", "Adv. Boxing", "Boxing"],
    audience: "adults",
  },
  {
    slug: "wrestling",
    name: "Wrestling",
    short:
      "Takedowns, control, and top pressure — the backbone of every grappling art.",
    description:
      "Takedowns, control, and top pressure — the backbone of every grappling art.",
    cta: "Explore Wrestling",
    classNames: ["Kids Wrestling", "Wrestling"],
  },
  {
    slug: "kids-martial-arts",
    name: "Kids Martial Arts",
    short:
      "Confidence, coordination and respect through age-appropriate BJJ and MMA, ages 4–13.",
    description:
      "Confidence, coordination and respect through age-appropriate BJJ and MMA, ages 4–13.",
    cta: "Explore Kids' Program",
    classNames: [
      "Kids BJJ",
      "Gi BJJ Kids",
      "Kids Wrestling",
      "Wrestling",
      "Kids MMA",
    ],
    audience: "kids",
  },
  {
    slug: "womens-self-defense",
    name: "Women's Self-Defense",
    short:
      "Practical, confidence-building self-defense for women — no experience needed.",
    description:
      "Practical, confidence-building self-defense for women — no experience needed.",
    cta: "Explore Self-Defense",
    classNames: ["Ladies", "Ladies Self-Defence"],
    audience: "adults",
  },
];

// Classes on the schedule that deliberately have no program card: Yoga (on
// the schedule, not a program per the redesign) and the drop-in open mats.
const unlistedClassNames = new Set(["Yoga", "Open Mat", "MMA Open Mat"]);

const inAudience = (cls: ScheduleClass, audience?: "adults" | "kids") =>
  !audience || cls.category === audience || cls.category === "both";

/** Does this schedule class belong to the given program? */
export const programIncludes = (program: ProgramDef, cls: ScheduleClass) =>
  program.classNames.includes(cls.name) && inAudience(cls, program.audience);

// Fail the build if a class is added to schedule.json that no program (or the
// unlisted set) accounts for, so it can't silently disappear from the site.
for (const day of scheduleData.days) {
  for (const cls of day.classes) {
    const covered =
      unlistedClassNames.has(cls.name) ||
      programDefs.some((p) => programIncludes(p, cls));
    if (!covered) {
      throw new Error(
        `programs.ts: class "${cls.name}" (${cls.category}) in schedule.json isn't in any program. Add it to a program's classNames or to unlistedClassNames.`,
      );
    }
  }
}

export const programs: Program[] = programDefs.map((def) => ({
  ...def,
  href: `/programs/${def.slug}`,
  days: scheduleData.days
    .filter((day) => day.classes.some((cls) => programIncludes(def, cls)))
    .map((day) => day.shortDay),
}));

export const getProgram = (slug: string) =>
  programs.find((p) => p.slug === slug);
