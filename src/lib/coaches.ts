import scheduleData from "../content/schedule.json";

// Single source of truth for everyone who coaches at Zen.
//
// - `coachRoster` is the public coach list, in display order. It feeds the
//   stacked CoachList on the homepage ("Meet the coaches") and on /about.
// - `coaches` holds the long-form profiles (credentials, record, archive).
//   Each one gets a /coaches/<slug> page and a large CoachProfile card, and
//   its roster row links to that page.
//
// To add a coach: add a row to `coachRoster`. Leave `bio` or `photo` out until
// the real copy / photo exists — the list renders a "Photo coming soon" tile
// and skips the bio. Give them a `profile` only once a full write-up exists.

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
  /** Instructor name as it appears in schedule.json. */
  scheduleName: string;
  /** Full display name for headings. */
  displayName: string;
  /** e.g. "Head Coach" / "Owner". */
  role: string;
  bio: string;
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

export interface CoachPhoto {
  /** Path under /public. */
  src: string;
  alt: string;
  /** Intrinsic pixel size, so the browser can reserve space. */
  width: number;
  height: number;
}

/** One row in the public coach list. */
export interface Coach {
  /** Name as shown in the list, e.g. "Devlin C.". */
  name: string;
  /** Disciplines they teach, e.g. "BJJ · Muay Thai". */
  role: string;
  /** Short bio. Omit until real copy exists — never ship placeholder text. */
  bio?: string;
  /** Omit to show the "Photo coming soon" tile. */
  photo?: CoachPhoto;
  /** Slug of their /coaches/<slug> profile page, if they have one. */
  profileSlug?: string;
}

const eric: CoachProfileData = {
  slug: "eric-a",
  scheduleName: "Eric A.",
  displayName: "Coach Eric",
  role: "Head Coach & Owner",
  bio: "Coach Eric brings over 20 years of Brazilian Jiu-Jitsu experience and holds a Black Belt under Marcus Soares (Carlson Gracie lineage). He also has 12 years of Muay Thai and 4 years of wrestling training.",
  credentials: [
    { years: "20+", discipline: "Brazilian Jiu-Jitsu" },
    { years: "12", discipline: "Muay Thai" },
    { years: "4", discipline: "Wrestling" },
  ],
  photo: "/images/Eric-a.jpg",
  photoAlt:
    "Coach Eric, head coach and owner of Zen Martial Arts in Chilliwack, BC",
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
        "Coach Eric's first professional MMA fight — and a win. A black belt and two decades of coaching came later. Every coach on our mats started with one nervous first step, then the work.",
      width: 1721,
      height: 968,
    },
  ],
};

/** Coaches with a full profile page at /coaches/<slug>. */
export const coaches: CoachProfileData[] = [eric];

/** Everyone on the public coach list, in display order. */
export const coachRoster: Coach[] = [
  {
    name: "Eric A.",
    role: "BJJ · Boxing · Ladies Self-Defence",
    bio: eric.bio,
    photo: {
      src: eric.photo!,
      alt: eric.photoAlt!,
      width: eric.photoWidth!,
      height: eric.photoHeight!,
    },
    profileSlug: eric.slug,
  },
  {
    name: "Devlin Crew",
    role: "BJJ · No-Gi · Wrestling",
    bio: "Coach Devlin Crew serves as a core martial arts instructor based out of Zen Martial Arts in Chilliwack, British Columbia. Recognized as a Brazilian Jiu-Jitsu (BJJ) black belt, he leverages a profound foundational background in combat sports—including early roots in his family's karate studio—to structure high-level training programs. At the academy, he is heavily involved in instructing dynamic evening classes that span multiple disciplines, primarily leading sessions in No-Gi grappling, wrestling, and Brazilian Jiu-Jitsu. Coach Devlin is highly valued in the local Chilliwack martial arts community for his technique-driven approach, his patience with beginners, and his structured methodology that benefits both casual hobbyists and active competitors.",
    photo: {
      src: "/images/coach-devlin.jpg",
      alt: "Coach Devlin Crew in the cage at Zen Martial Arts in Chilliwack, BC",
      width: 480,
      height: 480,
    },
  },
  {
    name: "Stephen Sanderson",
    role: "Boxing",
    bio: 'Coach Stephen Sanderson brings over 25 years of extensive ring experience to Chilliwack\'s martial arts community, instructing students out of the Zen Martial Arts & Fitness facility. Known for his technical mastery, he specializes in teaching the highly tactical "Cuban style" of boxing, which prioritizes slick footwork, clever head movement, and precise counter-striking. Beyond sharpening the skills of individual competitors, Stephen takes an inclusive approach to fitness by co-running specialized family striking programs that allow parents and children to train and build confidence together.',
    photo: {
      src: "/images/coach-stefan.jpg",
      alt: "Coach Stephen Sanderson coaching a class at Zen Martial Arts in Chilliwack, BC",
      width: 480,
      height: 480,
    },
  },
  {
    name: "Americo Peña",
    role: "Wrestling",
    bio: "Americo Peña is an accomplished former national wrestling champion from El Salvador who has transitioned into a highly respected Olympic-level wrestling coach in British Columbia, Canada. Based in the Chilliwack community, he leverages his extensive background with the El Salvador National Wrestling Program to train the next generation of athletes at both the Chilliwack Grapplers Wrestling Club and Zen Martial Arts & Fitness. Known for his technical expertise in international freestyle wrestling, Peña is a dedicated mentor who guides everyone from young kids aiming for regional championships to adults mastering competitive grappling.",
  },
  {
    name: "Broden Fowler",
    role: "BJJ",
    bio: "Coach Broden Fowler is an experienced Brazilian Jiu-Jitsu Black Belt dedicated to helping students of all skill levels build confidence, refine technique, and reach their full potential. As an active competitor on the tournament circuit, he brings modern, battle-tested strategies directly to the mats. His structured classes focus on technical precision, smart leverage, and fostering a safe, high-energy environment where everyone from beginners to seasoned athletes can thrive.",
  },
  {
    name: "Mike",
    role: "BJJ",
    bio: "Mike brings over 13 years of dedicated Brazilian Jiu-Jitsu experience to the mats, blending technical expertise with an infectious energy. Known for his welcoming and high-vibe coaching style, he is passionate about helping students of all ages and skill levels unlock their true potential. Whether you are stepping onto the mats for your very first day or looking to sharpen your competitive edge, Mike creates a supportive, empowering environment designed to build real-world confidence, sharp skills, and a lifelong love for grappling.",
  },
  {
    name: 'Ashley "Smash City" Watkins',
    role: "Striking · Kickboxing",
    bio: 'Ashley "Smash City" Watkins is an accomplished amateur mixed martial arts fighter and kickboxing practitioner who brings nearly 20 years of combat sports experience to the cage. She is an AMA Kickboxing Champion who began her training journey around 2007. Known as a highly seasoned striker who loves a brawl, her signature fighting style relies on nonstop forward pressure to overwhelm her opponents, though she is also well-versed in grappling with a particular fondness for submission techniques like bicep slicers. In addition to giving back to the martial arts community as a dedicated striking coach, she has proven her explosive finishing ability in competition, most notably securing a lightning-fast 0:44-second Round 1 TKO victory at Mamba Fight League 13.',
  },
  {
    name: "Rob",
    role: "Muay Thai",
  },
];

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
