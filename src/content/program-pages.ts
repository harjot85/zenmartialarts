import type { ProgramSlug } from "../lib/programs";

// Page content for /programs/<slug>, transcribed from the approved mockup
// (zen-martial-arts-site3/programs/*.html). Schedule tables are NOT stored
// here: they're generated from schedule.json via lib/schedule.ts.

export type SectionBg = "ink" | "soft" | "paper";
export type StripeColor = "gold" | "steel";

interface SectionBase {
  heading: string;
  bg: SectionBg;
  stripe: StripeColor;
}

export interface ExplainerSection extends SectionBase {
  type: "explainer";
  intro?: string;
  cards?: { title: string; text: string }[];
  /** Small muted note under the cards. */
  note?: string;
}

export interface ScheduleSection extends SectionBase {
  type: "schedule";
  /** Header for the class column ("Class" by default). */
  classColumn?: string;
  /** Adds an Ages column and moves "Ages 4–8" details into it. */
  showAges?: boolean;
}

export interface FaqSection extends SectionBase {
  type: "faq";
  items: { q: string; a: string }[];
}

export type ProgramPageSection =
  | ExplainerSection
  | ScheduleSection
  | FaqSection;

export interface ProgramPage {
  title: string;
  description: string;
  h1: string;
  heroStripe: StripeColor;
  lede: string;
  ctaLabel: string;
  sections: ProgramPageSection[];
  closing: { heading: string; text: string };
}

export const programPages: Record<ProgramSlug, ProgramPage> = {
  bjj: {
    title:
      "Brazilian Jiu-Jitsu (BJJ) Classes in Chilliwack, BC — Zen Martial Arts",
    description:
      "Gi and No-Gi Brazilian Jiu-Jitsu in Chilliwack, BC. Fundamentals classes for total beginners plus all-levels and advanced training, kids programs, and open mat. 1 week free trial.",
    h1: "Brazilian Jiu-Jitsu in Chilliwack, BC",
    heroStripe: "steel",
    lede: "Fast, athletic grappling built on control, leverage, and submissions — no gi required, though we teach both. Gi and No-Gi, fundamentals through advanced, adults and kids.",
    ctaLabel: "Book your free trial",
    sections: [
      {
        type: "explainer",
        heading: "What is BJJ, really?",
        bg: "ink",
        stripe: "gold",
        intro:
          "Brazilian Jiu-Jitsu is a grappling martial art centered on controlling a resisting opponent from positions of leverage, working toward a submission rather than a strike. It rewards technique over size and strength, which is why it's one of the few combat sports where a smaller, newer student can hold their own against someone twice their size — with the right position.",
        cards: [
          {
            title: "Gi BJJ",
            text: 'Trained in the traditional kimono. The fabric adds grips you can use for control, sweeps, and submissions — the more "classical" side of the art.',
          },
          {
            title: "No-Gi BJJ",
            text: "Trained in shorts and a rashguard. Faster-paced, closer to wrestling and MMA grappling, with a bigger emphasis on scrambles and pace.",
          },
          {
            title: "Fundamentals",
            text: "A dedicated track for people brand new to grappling. This is where every beginner starts, regardless of age or fitness level.",
          },
          {
            title: "Leg Locks (Fri)",
            text: "A weekly specialty class digging into leg entanglements and footlocks — for members who already have the fundamentals down and want to go deeper.",
          },
        ],
      },
      {
        type: "explainer",
        heading: "What your first class actually looks like",
        bg: "paper",
        stripe: "gold",
        cards: [
          {
            title: "1. Warm up",
            text: "Light movement drills to get your body ready — nobody's grading your fitness here.",
          },
          {
            title: "2. Technique",
            text: "A coach walks the room through one or two positions, step by step, with a partner.",
          },
          {
            title: "3. Light drilling",
            text: "You'll repeat the technique slowly with a partner. Total beginners are paired thoughtfully.",
          },
          {
            title: "4. Optional rolling",
            text: "Live practice for those who want it. Nobody is pushed into sparring before they're ready.",
          },
        ],
      },
      {
        type: "schedule",
        heading: "BJJ on the schedule",
        bg: "soft",
        stripe: "steel",
      },
      {
        type: "faq",
        heading: "BJJ questions",
        bg: "ink",
        stripe: "gold",
        items: [
          {
            q: "Do I need to buy a gi before I start?",
            a: "No. Come to a No-Gi class in a t-shirt and shorts, or try a Gi class — we can usually help you find a loaner for your first session before you decide whether to buy one.",
          },
          {
            q: "Will I have to spar on day one?",
            a: "Never against your will. Rolling (live sparring) is part of a normal class, but it's always optional while you're learning the basics.",
          },
          {
            q: "How often should I train to see progress?",
            a: "Two to three times a week is a realistic, sustainable pace for most beginners. Consistency matters far more than intensity when you're starting out.",
          },
        ],
      },
    ],
    closing: {
      heading: "Try BJJ with a free week",
      text: "No gi, no gear, no experience required — just show up.",
    },
  },

  "muay-thai-kickboxing": {
    title:
      "Muay Thai & Kickboxing Classes in Chilliwack, BC — Zen Martial Arts",
    description:
      "Muay Thai and kickboxing classes in Chilliwack, BC. Real pad work, punches, elbows, knees and kicks, taught for total beginners through competitors. 1 week free trial.",
    h1: "Muay Thai & kickboxing in Chilliwack, BC",
    heroStripe: "gold",
    lede: 'Looking for kickboxing classes near you? Muay Thai is exactly that — the original striking art punches, elbows, knees and kicks are built on, sometimes called "the art of eight limbs." If you searched for kickboxing, you found the right class.',
    ctaLabel: "Book your free trial",
    sections: [
      {
        type: "explainer",
        heading: "What to expect",
        bg: "ink",
        stripe: "steel",
        intro:
          "Classes run around real pad work — you'll spend most of a session on Thai pads or heavy bags with a partner or coach, not just shadowboxing at the air. Expect footwork, combinations, and conditioning, with technique broken down at a pace beginners can follow.",
        cards: [
          {
            title: "Level 1 — Kickboxing",
            text: "Stance, guard, and the core strikes — jab, cross, kick, and knee — taught from zero. This is where every beginner starts.",
          },
          {
            title: "Level 2 — Muay Thai",
            text: 'Once the Level 1 fundamentals are solid, elbows and clinch work are added — the full "art of eight limbs."',
          },
          {
            title: "Pad work & conditioning",
            text: "Both levels run on real holder-and-striker pad drills, not solo shadowboxing — expect to sweat, at any level.",
          },
        ],
      },
      {
        type: "schedule",
        heading: "On the schedule",
        bg: "paper",
        stripe: "gold",
      },
      {
        type: "faq",
        heading: "Muay Thai & kickboxing questions",
        bg: "soft",
        stripe: "steel",
        items: [
          {
            q: 'Is this the same as "kickboxing"?',
            a: "Yes — it's literally on our schedule as Level 1 Kickboxing, the entry point for every striking student. Level 2 Muay Thai builds on it by adding elbows and clinch work. If you searched for kickboxing classes, start at Level 1.",
          },
          {
            q: "Do I need gloves or shin guards to start?",
            a: "No — come in athletic wear for your first class. We'll point you toward gear once you know you're sticking with it.",
          },
          {
            q: "Is it a good workout even if I never compete?",
            a: "Yes — most members train purely for fitness and conditioning and never step into a ring. Competing is entirely optional.",
          },
        ],
      },
    ],
    closing: {
      heading: "Try Muay Thai with a free week",
      text: "Real pad work, real coaching, zero pressure to compete.",
    },
  },

  boxing: {
    title:
      "Boxing Classes in Chilliwack, BC — Fundamentals & Advanced — Zen Martial Arts",
    description:
      "Boxing classes in Chilliwack, BC for every level — fundamentals and advanced sessions, footwork, head movement and punching power. 1 week free trial.",
    h1: "Boxing classes in Chilliwack, BC",
    heroStripe: "steel",
    lede: "Sharp footwork, head movement, and punching power — trained for fitness, self-defense, or the ring. Fundamentals and advanced sessions, taught separately so beginners aren't drilling next to five-year veterans.",
    ctaLabel: "Book your free trial",
    sections: [
      {
        type: "explainer",
        heading: "Two tracks, so you're training at your level",
        bg: "ink",
        stripe: "gold",
        cards: [
          {
            title: "Fundamentals Boxing",
            text: "Stance, guard, the jab-cross-hook-uppercut foundation, and defensive footwork. Built for people who have never thrown a punch with intent before.",
          },
          {
            title: "Advanced Boxing",
            text: "Combinations, counters, and pad work at a faster pace, for members who've already got the fundamentals down.",
          },
        ],
      },
      {
        type: "schedule",
        heading: "Boxing on the schedule",
        bg: "paper",
        stripe: "gold",
      },
      {
        type: "faq",
        heading: "Boxing questions",
        bg: "soft",
        stripe: "steel",
        items: [
          {
            q: "Do I need boxing gloves for my first class?",
            a: "No — come in athletic wear and we'll get you started. Once you know you're sticking with it, a coach can point you toward the right gloves and wraps.",
          },
          {
            q: "Which class should a total beginner start in?",
            a: "Fundamentals Boxing — it's built specifically for people learning stance and technique from the ground up.",
          },
          {
            q: "Is sparring required?",
            a: "No. Fundamentals classes focus on pad work and technique; sparring, when it happens, is for members who are ready and choose to.",
          },
        ],
      },
    ],
    closing: {
      heading: "Try boxing with a free week",
      text: "No gear required to start — just show up.",
    },
  },

  wrestling: {
    title: "Wrestling Classes in Chilliwack, BC — Zen Martial Arts",
    description:
      "Wrestling classes in Chilliwack, BC for adults and kids. Takedowns, control, and top pressure — great standalone training or cross-training for BJJ and MMA. 1 week free trial.",
    h1: "Wrestling classes in Chilliwack, BC",
    heroStripe: "gold",
    lede: "Takedowns, control, and top pressure — the relentless backbone of MMA, and one of the best standalone strength-and-conditioning workouts there is. Open to adults and kids, no experience required.",
    ctaLabel: "Book your free trial",
    sections: [
      {
        type: "explainer",
        heading: "Why train wrestling, even if you're not competing",
        bg: "ink",
        stripe: "steel",
        intro:
          "Wrestling builds a base every other grappling art depends on: how to take someone down, how to stay on top once you're there, and how to scramble back to your feet. It's also brutally effective conditioning — expect a harder cardio session than most gym classes, built entirely from functional movement rather than machines.",
      },
      {
        type: "schedule",
        heading: "Wrestling on the schedule",
        bg: "paper",
        stripe: "gold",
        classColumn: "Who",
      },
      {
        type: "faq",
        heading: "Wrestling questions",
        bg: "soft",
        stripe: "steel",
        items: [
          {
            q: "Do I need a wrestling background to join?",
            a: "No — most adults training with us have never wrestled before, including in school. Every session starts with the basics of stance and motion.",
          },
          {
            q: "Is it a good complement to BJJ or MMA training?",
            a: "Yes — wrestling's takedowns and top control translate directly into both, and many members treat it as cross-training alongside their main program.",
          },
        ],
      },
    ],
    closing: {
      heading: "Try wrestling with a free week",
      text: "No experience, no gear, just show up ready to move.",
    },
  },

  "kids-martial-arts": {
    title: "Kids Martial Arts in Chilliwack, BC (Ages 4–13) — Zen Martial Arts",
    description:
      "Kids BJJ and Kids MMA in Chilliwack, BC for ages 4–13. Confidence, coordination and respect through age-appropriate martial arts. 1 week free trial.",
    h1: "Kids martial arts in Chilliwack, BC",
    heroStripe: "steel",
    lede: "Confidence, coordination, and respect, taught through age-appropriate BJJ, wrestling, and MMA for ages 4–13. Split into groups by age so the four-year-olds and the thirteen-year-olds are never learning side by side.",
    ctaLabel: "Book a free trial class",
    sections: [
      {
        type: "explainer",
        heading: "Three programs, split by age",
        bg: "ink",
        stripe: "gold",
        cards: [
          {
            title: "Kids BJJ",
            text: "Grappling-focused: positional control, escapes, and movement games that build coordination without requiring contact strikes. Runs both no-gi (Monday) and gi (Wednesday).",
          },
          {
            title: "Kids Wrestling",
            text: "Takedowns, base, and scrambling, built through games before it's built through drilling — a great fit for kids who like to move.",
          },
          {
            title: "Kids MMA",
            text: "A blend of striking fundamentals and grappling, scaled for younger athletes, with an emphasis on listening, discipline, and controlled movement.",
          },
        ],
        note: "BJJ and MMA run in two age bands: 4–8 and 9–13. Kids Wrestling runs ages 4–9, with an older-kids-and-adults wrestling block later the same evening.",
      },
      {
        type: "faq",
        heading: "What parents ask us most",
        bg: "paper",
        stripe: "gold",
        items: [
          {
            q: "What does a kids' class actually look like?",
            a: "Coach-led warm-up games, a technique broken into simple steps, and partnered drilling — all scaled to the age group in the room. It reads more like structured, active play for the youngest kids and more like real technique training as they get older.",
          },
          {
            q: "My child has never done anything like this — is that a problem?",
            a: "No — most kids who start with us haven't. Classes are built assuming zero prior experience.",
          },
          {
            q: "Do kids spar or fight each other?",
            a: "Any live practice is coach-supervised, consensual, and matched thoughtfully by size and experience — never full-contact striking for young kids. Ask a coach for specifics on the age group you're considering.",
          },
          {
            q: "What should my child wear?",
            a: "A t-shirt and shorts or leggings for the first class — no shoes on the mats. We'll tell you if a gi or other gear makes sense once you know which program fits.",
          },
        ],
      },
      {
        type: "schedule",
        heading: "Kids' classes on the schedule",
        bg: "soft",
        stripe: "steel",
        showAges: true,
      },
    ],
    closing: {
      heading: "Bring your child in for a free week",
      text: "See how they respond to the coaches and the mat before committing to anything.",
    },
  },

  "womens-self-defense": {
    title: "Women's Self-Defense Classes in Chilliwack, BC — Zen Martial Arts",
    description:
      "Women's self-defense classes in Chilliwack, BC. Practical, confidence-building training in a supportive group of women — no experience needed. 1 week free trial.",
    h1: "Women's self-defense classes in Chilliwack, BC",
    heroStripe: "gold",
    lede: "Practical, confidence-building self-defense for women, taught in a supportive class of other women — no experience needed, no partner required.",
    ctaLabel: "Book your free trial",
    // The mockup's "What this class covers" section is an unfinished
    // [Gym: …] placeholder, so it's left out until the gym supplies specifics.
    sections: [
      {
        type: "schedule",
        heading: "On the schedule",
        bg: "paper",
        stripe: "gold",
      },
      {
        type: "faq",
        heading: "Questions",
        bg: "soft",
        stripe: "steel",
        items: [
          {
            q: "Do I need to be in shape to join?",
            a: "No — this class is built for women starting from zero, at any fitness level.",
          },
          {
            q: "Is it just this one class, or can I train other programs too?",
            a: "Many women who start here go on to train BJJ, Muay Thai, or boxing as well — this class is a low-pressure way to walk through the door for the first time.",
          },
        ],
      },
    ],
    closing: {
      heading: "Try your first week free",
      text: "No experience, no equipment, no pressure.",
    },
  },
};
