// General FAQ for /faq, transcribed verbatim from the approved mockup
// (zen-martial-arts-site3/faq.html). The same list feeds the visible
// accordion and the FAQPage JSON-LD, so edit it here only.

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "Do I need any experience to join?",
    a: "No. Most members had never trained anything before their first class. Every program runs a fundamentals track built specifically for beginners, and coaches scale drills to whoever is on the mat that day.",
  },
  {
    q: "I'm out of shape and older than most people who train — will I be able to keep up?",
    a: "Yes. Fitness comes from training, not the other way around. You set your own pace in every class, and you'll find you're not the only person in the room who felt exactly this way on day one.",
  },
  {
    q: "What should I wear to my first class?",
    a: "A t-shirt and athletic shorts or leggings, no shoes on the mats. If you continue with Gi BJJ, we'll walk you through gi sizing and gear after your first couple of classes — no need to buy anything before you try it.",
  },
  {
    q: "Is there a contract or long-term commitment?",
    a: "No. Memberships run month to month.",
  },
  {
    q: "How much does it cost to train at Zen Martial Arts?",
    a: "Your first week of training is free. Call or drop by for current membership pricing, since it depends on which programs you want access to.",
  },
  {
    q: "What ages do you accept for kids' classes?",
    a: "Kids' BJJ and Kids' MMA run from age 4 through 13, split into age-appropriate groups (roughly 4–8 and 9–13). Kids' Wrestling runs ages 4–9, with a combined kids-and-adults wrestling block afterward.",
  },
  {
    q: "Is martial arts safe for kids?",
    a: "Classes are coach-led and scaled to age and size, with an emphasis on discipline, coordination and respect alongside technique. Talk to a coach about what a specific age group's class looks like before your child's first session.",
  },
  {
    q: "Do you offer a women-only class?",
    a: "Yes — our Ladies Self-Defence class is designed for women, with no experience required.",
  },
  {
    q: "What's the difference between Gi and No-Gi BJJ?",
    a: "Gi BJJ is trained in the traditional kimono, which adds grips you can use for control and submissions. No-Gi is trained in shorts and a rashguard, faster-paced and more focused on wrestling-style control. We run both, and most members try each before choosing a favorite.",
  },
  {
    q: "Where is Zen Martial Arts located?",
    a: "48640 Yale Rd, Chilliwack, BC V4Z 0B1.",
  },
];
