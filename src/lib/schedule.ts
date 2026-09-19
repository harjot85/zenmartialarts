import scheduleData from "../content/schedule.json";
import { programIncludes, type ProgramDef } from "./programs";

export type Audience = "adults" | "kids" | "both";

export type ClassEntry = {
  start: string;
  end: string;
  name: string;
  detail?: string;
  category: string;
};

export type ScheduleDay = {
  day: string;
  shortDay: string;
  classes: ClassEntry[];
};

export const days = scheduleData.days as ScheduleDay[];
export const notes = scheduleData.notes;
export const effective = scheduleData.effective;
export const gymHours = scheduleData.gymHours;

/** Maps day name → JS getDay() value (0=Sun, 1=Mon … 6=Sat) */
export const dayIndexMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/** "7:30 PM" → minutes since midnight, for sorting. */
export const parseMinutes = (t: string) => {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 9999;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  if (m[3].toUpperCase() === "PM" && h !== 12) h += 12;
  if (m[3].toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + min;
};

const meridiem = (t: string) => t.slice(-2).toUpperCase();
const bare = (t: string) => t.replace(/\s*(AM|PM)$/i, "");

/**
 * "6:00 AM"+"7:00 AM" → "6:00 – 7:00 AM"
 * "11:00 AM"+"12:00 PM" → "11:00 AM – 12:00 PM"
 */
export const formatRange = (start: string, end: string) =>
  meridiem(start) === meridiem(end)
    ? `${bare(start)} – ${end}`
    : `${start} – ${end}`;

/** Does this class belong in the adults table / the kids table? */
export const inAudience = (cls: ClassEntry, audience: "adults" | "kids") =>
  cls.category === audience || cls.category === "both";

export const audienceLabel = (category: string) =>
  category === "kids" ? "Kids" : category === "both" ? "All ages" : "Adults";

/** Days filtered to one audience, each still carrying its full day metadata. */
export const daysFor = (audience: "adults" | "kids") =>
  days.map((day) => ({
    ...day,
    classes: day.classes.filter((cls) => inAudience(cls, audience)),
  }));

/** Sorted, de-duplicated start times across the given days. */
export const startTimesFor = (list: ScheduleDay[]) =>
  [...new Set(list.flatMap((d) => d.classes.map((c) => c.start)))].sort(
    (a, b) => parseMinutes(a) - parseMinutes(b),
  );

/** day name → start time → concurrent classes */
export const indexByDayAndStart = (list: ScheduleDay[]) => {
  const index: Record<string, Record<string, ClassEntry[]>> = {};
  for (const day of list) {
    index[day.day] = {};
    for (const cls of day.classes) {
      (index[day.day][cls.start] ||= []).push(cls);
    }
  }
  return index;
};

/* ─────────────────────────── Colour + level ─────────────────────────── */

/**
 * Colour groups for the schedule grid, keyed by schedule.json class name.
 * Coarser than the classes themselves: Gi and No-Gi BJJ (adults and kids)
 * share one hue, as do Muay Thai and Kickboxing, and Ladies/Yoga. Open mats
 * take the neutral silver.
 */
export type Discipline =
  | "bjj"
  | "wrestling"
  | "striking"
  | "boxing"
  | "mma"
  | "specialty"
  | "openmat";

const DISCIPLINE_BY_NAME: Record<string, Discipline> = {
  "No-Gi BJJ": "bjj",
  "Adv No-Gi BJJ": "bjj",
  "Kids BJJ": "bjj",
  "Gi BJJ": "bjj",
  "Gi BJJ Kids": "bjj",
  "BJJ Fundamentals": "bjj",
  "Adv BJJ Gi": "bjj",
  "Muay Thai": "striking",
  Kickboxing: "striking",
  "Fund. Boxing": "boxing",
  "Adv. Boxing": "boxing",
  Boxing: "boxing",
  Wrestling: "wrestling",
  "Kids Wrestling": "wrestling",
  "Kids MMA": "mma",
  Ladies: "specialty",
  "Ladies Self-Defence": "specialty",
  Yoga: "specialty",
  "Open Mat": "openmat",
  "MMA Open Mat": "openmat",
  "BJJ Open Mat": "openmat",
};

export const disciplineOf = (cls: ClassEntry): Discipline => {
  const discipline = DISCIPLINE_BY_NAME[cls.name];
  if (!discipline) {
    throw new Error(
      `schedule.ts: unmapped class "${cls.name}" in schedule.json. Add it to DISCIPLINE_BY_NAME.`,
    );
  }
  return discipline;
};

export type Level = "advanced" | "fundamental" | "standard";

/**
 * Advanced classes take the brighter shade of their discipline's colour.
 * Read from the class name rather than a stored field, so the CMS schema stays
 * as it is — rename a class away from these conventions and it falls back to
 * the standard shade.
 */
export const levelOf = (cls: ClassEntry): Level => {
  const detail = cls.detail ?? "";
  if (
    /^adv\b/i.test(cls.name) ||
    /^adv\./i.test(cls.name) ||
    detail === "Level 2"
  )
    return "advanced";
  if (
    /fundamental/i.test(`${cls.name} ${detail}`) ||
    /^fund\./i.test(cls.name) ||
    detail === "Level 1"
  )
    return "fundamental";
  return "standard";
};

/* ──────────────────────────── Time blocks ───────────────────────────── */

/**
 * The grid groups classes into coarse blocks rather than one row per start
 * time. Exact start times as rows made back-to-back classes on one day look
 * gapped whenever another day started something in between.
 */
export const BANDS = [
  { label: "Early morning", from: 5 * 60, to: 8 * 60 },
  { label: "Morning", from: 8 * 60, to: 12 * 60 },
  { label: "Midday", from: 12 * 60, to: 15 * 60 },
  { label: "Afternoon", from: 15 * 60, to: 18 * 60 },
  { label: "Evening", from: 18 * 60, to: 24 * 60 },
] as const;

const to12 = (m: number) => {
  const h24 = Math.floor(m / 60);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m % 60).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
};

/** Band label plus its span, e.g. "6:00 PM – 12:00 AM". */
export const bandRange = (band: { from: number; to: number }) =>
  `${to12(band.from)} – ${to12(band.to)}`;

/**
 * Rows for one audience: each band that has at least one class somewhere in the
 * week, with that band's classes per day (in time order).
 */
export const bandRows = (list: ScheduleDay[]) =>
  BANDS.map((band) => ({
    ...band,
    perDay: list.map((day) =>
      day.classes
        .filter((cls) => {
          const s = parseMinutes(cls.start);
          return s >= band.from && s < band.to;
        })
        .sort((a, b) => parseMinutes(a.start) - parseMinutes(b.start)),
    ),
  })).filter((row) => row.perDay.some((classes) => classes.length > 0));

/* ─────────────────────────── Program tables ─────────────────────────── */

const EXPANDED_NAMES: Record<string, string> = {
  "Fund. Boxing": "Fundamentals Boxing",
  "Adv. Boxing": "Advanced Boxing",
};

/** Name + detail pairs that read as one name rather than "Name — Detail". */
const JOINED_LABELS: Record<string, string> = {
  "Ladies | Self-Defence": "Ladies Self-Defence",
};

/** Readable class name, e.g. "Gi BJJ — All Levels", "Advanced Boxing". */
export const classLabel = (cls: ClassEntry, withDetail = true) => {
  const joined = JOINED_LABELS[`${cls.name} | ${cls.detail ?? ""}`];
  if (joined) return joined;
  const name = EXPANDED_NAMES[cls.name] ?? cls.name;
  return withDetail && cls.detail ? `${name} — ${cls.detail}` : name;
};

/** "Ages 4–8" → "4–8"; "both" classes → "All ages"; otherwise undefined. */
export const ageBand = (cls: ClassEntry) => {
  const m = cls.detail?.match(/^Ages?\s+(.+)$/i);
  if (m) return m[1];
  return cls.category === "both" ? "All ages" : undefined;
};

export type ProgramScheduleRow = {
  day: string;
  time: string;
  label: string;
  /** Only set when `showAges` is on. */
  ages?: string;
};

/**
 * One row per class in the given program, Mon→Sun, in time order. With
 * `showAges`, an "Ages 4–8" detail moves out of the label into `ages`.
 */
export const programScheduleRows = (
  program: ProgramDef,
  { showAges = false } = {},
): ProgramScheduleRow[] =>
  days.flatMap((day) =>
    day.classes
      .filter((cls) => programIncludes(program, cls))
      .sort((a, b) => parseMinutes(a.start) - parseMinutes(b.start))
      .map((cls) => {
        const ageDetail = /^Ages?\s/i.test(cls.detail ?? "");
        return {
          day: day.day,
          time: formatRange(cls.start, cls.end),
          label: classLabel(cls, !(showAges && ageDetail)),
          ages: showAges ? ageBand(cls) : undefined,
        };
      }),
  );
