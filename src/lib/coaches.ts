import scheduleData from "../content/schedule.json";

// Single source of truth for coach profiles. Keyed by the exact instructor
// string used in schedule.json so the Instructors carousel, the /about page,
// and the /coaches/[slug] pages all read the same record.
//
// To add a coach: drop a new entry in `coachDefs` keyed by their
// schedule.json instructor name. Coaches without an entry still appear in
// the Instructors carousel (name + disciplines from the schedule), they just
// don't get a linked profile page until their info is collected.

export interface CoachCredential {
  years: string;
  discipline: string;
}

export interface CoachRecord {
  label: string;
  value: string;
}

/** A milestone photo from a coach's career, shown on their profile page. */
export interface CoachMoment {
  src: string;
  alt: string;
  /** Headline for the moment, e.g. "First Fight — First Win". */
  title: string;
  /** Year or era label shown beside the title. */
  year: string;
  caption: string;
  width: number;
  height: number;
}

export interface CoachProfileData {
  /** URL slug — /coaches/<slug>. */
  slug: string;
  /** Name as it appears in schedule.json. */
  scheduleName: string;
  /** Full display name for headings. */
  displayName: string;
  /** e.g. "Head Coach" / "Owner". */
  role: string;
  bio: string;
  /** One-line version of the bio for the Instructors carousel card. */
  teaser: string;
  credentials: CoachCredential[];
  record: CoachRecord[];
  /** Path under /public, or undefined for the placeholder tile. */
  photo?: string;
  photoAlt?: string;
  /** Intrinsic pixel size of `photo`, so the browser can reserve space. */
  photoWidth?: number;
  photoHeight?: number;
  /** Milestone photos, oldest first. Rendered on /coaches/<slug>. */
  archive?: CoachMoment[];
}

const coachDefs: Record<string, Omit<CoachProfileData, "scheduleName">> = {
  "Eric A.": {
    slug: "eric-a",
    displayName: "Coach Eric",
    role: "Head Coach & Owner",
    teaser: "BJJ Black Belt under Marcus Soares — 20+ years on the mats.",
    bio: "Coach Eric brings over 20 years of Brazilian Jiu-Jitsu experience and holds a Black Belt under Marcus Soares (Carlson Gracie lineage). He also has 12 years of Muay Thai and 4 years of wrestling training.",
    credentials: [
      { years: "20+", discipline: "Brazilian Jiu-Jitsu" },
      { years: "12", discipline: "Muay Thai" },
      { years: "4", discipline: "Wrestling" },
    ],
    photo: "/images/Eric-a.jpg",
    photoAlt: "Coach Eric, head coach and owner of Zen MMA in Chilliwack, BC",
    photoWidth: 1232,
    photoHeight: 1249,
    record: [
      { label: "Amateur MMA", value: "7-3-0" },
      { label: "Amateur Kickboxing", value: "3-0-0" },
      { label: "Professional MMA", value: "1-1-0" },
    ],
    archive: [
      {
        src: "/images/first-fight.jpg",
        alt: "Coach Eric competing in his first professional MMA fight",
        title: "First Pro MMA Fight",
        year: "2010",
        caption:
          "Coach Eric's first professional MMA fight — and a win. Every coach on our mats started with one nervous first step, then the work.",
        width: 1721,
        height: 968,
      },
    ],
  },
};

export const coaches: CoachProfileData[] = Object.entries(coachDefs).map(
  ([scheduleName, def]) => ({ scheduleName, ...def }),
);

/** Profile for a schedule.json instructor name, if one has been written. */
export function getCoachByScheduleName(
  scheduleName: string,
): CoachProfileData | undefined {
  return coaches.find((c) => c.scheduleName === scheduleName);
}

export function getCoachBySlug(slug: string): CoachProfileData | undefined {
  return coaches.find((c) => c.slug === slug);
}

function toDiscipline(className: string): string {
  const s = className.toLowerCase();
  if (s.includes("muay thai")) return "Muay Thai";
  if (s.includes("wrestling")) return "Wrestling";
  if (s.includes("boxing")) return "Boxing";
  if (s.includes("kickboxing")) return "Kickboxing";
  if (s.includes("bjj") || s.includes("jiu-jitsu")) return "BJJ";
  if (s.includes("gi training")) return "Gi BJJ";
  if (s.includes("self defense")) return "Self Defense";
  if (s.includes("open mat")) return "Open Mat";
  return className;
}

/** Disciplines a coach is on the schedule for, in first-seen order. */
export function getDisciplines(scheduleName: string): string[] {
  const found = new Set<string>();
  type ClsEntry = { name: string; instructor?: string };
  for (const day of scheduleData.days) {
    for (const cls of day.classes as ClsEntry[]) {
      if (cls.instructor === scheduleName) found.add(toDiscipline(cls.name));
    }
  }
  return [...found];
}

export interface InstructorListing {
  name: string;
  title: string;
  bio: string;
  /** Profile URL, or undefined while their info is still being collected. */
  href?: string;
  /** Card photo, or undefined for the placeholder tile. */
  photo?: string;
  photoAlt?: string;
}

/** Everyone teaching on the schedule, enriched with a profile where we have one. */
export function getInstructorListings(): InstructorListing[] {
  const names: string[] = [];
  type ClsEntry = { name: string; instructor?: string };
  for (const day of scheduleData.days) {
    for (const cls of day.classes as ClsEntry[]) {
      if (cls.instructor && !names.includes(cls.instructor))
        names.push(cls.instructor);
    }
  }

  return names.map((name) => {
    const coach = getCoachByScheduleName(name);
    return {
      name,
      title: getDisciplines(name).slice(0, 3).join(" · "),
      bio: coach ? coach.teaser : "Full coach profile coming soon.",
      href: coach ? `/coaches/${coach.slug}` : undefined,
      photo: coach?.photo,
      photoAlt: coach?.photoAlt,
    };
  });
}
