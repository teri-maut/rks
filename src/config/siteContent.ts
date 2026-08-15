/**
 * Cinematic Raksha Bandhan Gift Configuration
 * Personalized for Vanika by Preet with Authentic Childhood Memories & Photo
 */

export interface SiblingMemory {
  id: string;
  tag: string;
  emoji: string;
  title: string;
  story: string;
  funnyQuote?: string;
  range: [number, number];
}

export interface SiteContent {
  recipient: {
    name: string;
    relationship: string;
    nickname: string;
  };
  sender: {
    name: string;
    relationship: string;
  };
  music: {
    src: string;
    title: string;
    artist: string;
  };
  frames: {
    totalFrames: number;
    prefix: string;
    extension: string;
    padLength: number;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    scrollPrompt: string;
  };
  childhoodMemories: SiblingMemory[];
  schoolPhoto: {
    src: string;
    badge: string;
    title: string;
    caption: string;
    subCaption?: string;
    range: [number, number];
  };
  climax: {
    badge: string;
    title: string;
    subtitle: string;
    specialLines: string[];
  };
  outro: {
    mainGreeting: string;
    subGreeting: string;
    thanksMessage: string;
    dedication: string;
    footerNote: string;
  };
}

export const siteContent: SiteContent = {
  recipient: {
    name: "Vanika",
    relationship: "Sister",
    nickname: "Choti",
  },
  sender: {
    name: "Preet",
    relationship: "Brother",
  },
  music: {
    src: "/audio/dance-music.m4a",
    title: "Kuchipudi Classical Raga",
    artist: "Live Rangapravesham",
  },
  frames: {
    totalFrames: 120,
    prefix: "/frames/ezgif-frame-",
    extension: ".jpg",
    padLength: 3,
  },
  hero: {
    eyebrow: "A Brother's Untold Memories",
    title: "For Vanika, by Preet",
    subtitle: "From school day apologies to Rangapravesham stage lights — a story made just for you.",
    scrollPrompt: "Scroll down to relive our memories ↓",
  },
  childhoodMemories: [
    {
      id: "memory-1",
      tag: "Memory 01 • The School Incident",
      emoji: "🩹",
      title: "The 2-Day Apology",
      story:
        "I still remember our first day of school. That incident happened where your hand got hurt, and I felt so terribly guilty that I kept saying sorry to you continuously for 2 whole days straight! I was so scared that my little sister was in pain.",
      funnyQuote: "Two whole days of non-stop 'Sorry Vanika' on loop!",
      range: [0.08, 0.21],
    },
    {
      id: "memory-2",
      tag: "Memory 02 • Name Confusion",
      emoji: "👶",
      title: "When I Couldn't Even Say Your Name",
      story:
        "In the early days, I struggled so much to pronounce your name properly! I would keep forgetting it again and again, inventing new versions every time until it finally stuck.",
      funnyQuote: "Took me forever to get 'Vanika' right!",
      range: [0.22, 0.35],
    },
    {
      id: "memory-3",
      tag: "Memory 03 • Classroom Departure",
      emoji: "🩺",
      title: "Checking Up On You With Fingers",
      story:
        "That first time we were sitting together in class during departure, when you felt weak and fell asleep from anemia... I got so worried that I sat beside you showing my fingers, asking 'how many fingers is this?' just to make sure my sister was okay.",
      funnyQuote: "Counting fingers to make sure you were fine ❤️",
      range: [0.36, 0.49],
    },
    {
      id: "memory-4",
      tag: "Memory 04 • Home Chaos",
      emoji: "🐕",
      title: "The Dog's Grand Welcome",
      story:
        "From all those past moments to today, the way your dog welcomes you home with absolute chaos and madness... well, let's keep that chaotic story aside for now!",
      funnyQuote: "Pure unadulterated canine drama at the door.",
      range: [0.50, 0.63],
    },
    {
      id: "memory-5",
      tag: "Memory 05 • The Iconic Line",
      emoji: "🎭",
      title: "“Jassi, Ghar Ki Yaad Nahi Ayi?!”",
      story:
        "And how on earth could either of us ever forget the most legendary dialogue of all time: “Jassi, ghar ki yaad nahi ayi?!” That line will forever remain rent-free in our sibling vault.",
      funnyQuote: "An unforgettable inside joke that never gets old!",
      range: [0.64, 0.76],
    },
  ],
  schoolPhoto: {
    src: "/images/school-memory.jpg",
    badge: "Classroom Vault • Ryan Days",
    title: "Moong Daal & Classroom Chaos",
    caption: "mung ki daal khao or mast maggan hoajao and i dont knwo why we all are black in this photo",
    range: [0.77, 0.89],
  },
  climax: {
    badge: "Raksha Bandhan 2026",
    title: "Happy Raksha Bandhan",
    subtitle: "To the most talented, resilient, and beloved sister in the world.",
    specialLines: [
      "Always my little sister.",
      "Always inspiring.",
      "Forever protected.",
    ],
  },
  outro: {
    mainGreeting: "Happy Raksha Bandhan, Vanika ❤️",
    subGreeting: "For Vanika, by Preet",
    thanksMessage: "THANKS",
    dedication: "Thank you for being the most incredible sister and for every unforgettable memory.",
    footerNote: "A timeless memory frozen in rhythm & love",
  },
};
