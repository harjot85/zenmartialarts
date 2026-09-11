import scheduleData from "../content/schedule.json";
import { keyFor, type ProgramKey } from "./programs";

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
  category === "kids" ? "Kids" : category === "both" ? "All Ages" : "Adults";

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
 * Colour groups are coarser than program keys: Gi and No-Gi BJJ share one hue,
 * as do Muay Thai and Kickboxing, and Ladies/Yoga. Derived from the program
 * mapping so there is only one place that knows what a class actually is.
 */
export type Discipline =
  | "bjj"
  | "wrestling"
  | "striking"
  | "boxing"
  | "mma"
  | "specialty"
  | "openmat";

const GROUP: Record<ProgramKey, Discipline> = {
  "bjj-nogi": "bjj",
  "bjj-gi": "bjj",
  "muay-thai": "striking",
  kickboxing: "striking",
  boxing: "boxing",
  wrestling: "wrestling",
  "kids-mma": "mma",
  "ladies-self-defence": "specialty",
  yoga: "specialty",
};

/** Open Mat has no program of its own, so it takes the neutral silver. */
export const disciplineOf = (cls: ClassEntry): Discipline => {
  const key = keyFor(cls);
  return key ? GROUP[key] : "openmat";
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
