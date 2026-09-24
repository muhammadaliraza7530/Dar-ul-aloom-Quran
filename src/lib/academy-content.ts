export type Course = {
  slug: string;
  name: string;
  urdu: string;
  summary: string;
  level: string;
  duration: string;
  audience: string;
  outcomes: string[];
  syllabus: string[];
};

export const courses: Course[] = [
  {
    slug: "noorani-qaida",
    name: "Noorani Qaida",
    urdu: "نورانی قاعدہ",
    summary: "Build a strong foundation in Arabic letters and pronunciation.",
    level: "Beginner",
    duration: "3–5 months",
    audience: "Kids & absolute beginners",
    outcomes: [
      "Recognise and pronounce all Arabic letters correctly",
      "Read joined words and short verses with confidence",
      "Understand harakat, madd, sukoon and tanween",
    ],
    syllabus: [
      "Individual letters and their articulation points",
      "Joined letters and letter shapes",
      "Harakat, tanween and sukoon",
      "Madd, shaddah and practice exercises",
    ],
  },
  {
    slug: "quran-reading",
    name: "Quran Reading (Nazra)",
    urdu: "ناظرہ قرآن",
    summary: "Read the Holy Quran fluently with correct pronunciation.",
    level: "Beginner to intermediate",
    duration: "6–12 months",
    audience: "Kids & adults",
    outcomes: [
      "Read any page of the Quran fluently",
      "Apply correct pronunciation while reading",
      "Complete the Quran with teacher supervision",
    ],
    syllabus: [
      "Revision of Qaida rules",
      "Guided reading, para by para",
      "Common recitation mistakes and corrections",
      "Fluency and speed building",
    ],
  },
  {
    slug: "quran-with-tajweed",
    name: "Quran with Tajweed",
    urdu: "قرآن مع تجوید",
    summary: "Learn and apply the essential rules of Tajweed.",
    level: "Intermediate",
    duration: "8–12 months",
    audience: "Students who can already read",
    outcomes: [
      "Apply Tajweed rules while reciting",
      "Recite with correct makharij and sifaat",
      "Beautify recitation with proper pauses",
    ],
    syllabus: [
      "Makharij al-huroof (articulation points)",
      "Noon and meem sakinah rules",
      "Madd categories and their lengths",
      "Waqf (pausing) rules and practice",
    ],
  },
  {
    slug: "hifz-quran",
    name: "Quran Memorization (Hifz)",
    urdu: "حفظ القرآن",
    summary: "A structured memorization plan with regular revision.",
    level: "All levels",
    duration: "Ongoing, plan based",
    audience: "Kids & adults",
    outcomes: [
      "Memorize with a realistic daily target",
      "Retain memorized portions through daily revision",
      "Recite memorized parts with Tajweed",
    ],
    syllabus: [
      "Personal memorization plan (sabaq)",
      "Recent revision (sabqi)",
      "Old revision (manzil)",
      "Monthly memorization tests",
    ],
  },
  {
    slug: "quran-translation",
    name: "Translation of Quran",
    urdu: "ترجمہ قرآن",
    summary: "Understand Quranic meanings through guided study.",
    level: "Intermediate",
    duration: "12 months+",
    audience: "Teens & adults",
    outcomes: [
      "Understand word-by-word meaning of common verses",
      "Build a working Quranic vocabulary",
      "Connect verses to daily life",
    ],
    syllabus: [
      "Word-by-word translation method",
      "Frequently repeated Quranic words",
      "Selected surahs in depth",
      "Reflection and application",
    ],
  },
  {
    slug: "tafseer",
    name: "Tafseer",
    urdu: "تفسیر القرآن",
    summary: "Study context, explanation, and lessons from the Quran.",
    level: "Advanced",
    duration: "Ongoing",
    audience: "Adults",
    outcomes: [
      "Understand the background of revelation",
      "Learn classical explanations of key verses",
      "Draw practical lessons from each surah",
    ],
    syllabus: [
      "Introduction to the sciences of Tafseer",
      "Asbab al-nuzul (context of revelation)",
      "Surah-by-surah study",
      "Lessons and reflections",
    ],
  },
  {
    slug: "basic-islamic-studies",
    name: "Basic Islamic Studies",
    urdu: "بنیادی اسلامی تعلیم",
    summary: "Learn essential beliefs, manners, and daily practice.",
    level: "Beginner",
    duration: "4–8 months",
    audience: "Kids & adults",
    outcomes: [
      "Know the pillars of Iman and Islam",
      "Practise Islamic manners in daily life",
      "Understand worship with confidence",
    ],
    syllabus: [
      "Aqeedah (beliefs) basics",
      "Purification and prayer",
      "Fasting, zakat and hajj basics",
      "Seerah and Islamic manners",
    ],
  },
  {
    slug: "duas-and-azkar",
    name: "Daily Duas & Azkar",
    urdu: "مسنون دعائیں و اذکار",
    summary: "Memorize everyday supplications and remembrance.",
    level: "Beginner",
    duration: "2–4 months",
    audience: "Kids & adults",
    outcomes: [
      "Memorize the daily masnoon duas",
      "Understand the meaning of each dua",
      "Build a daily azkar routine",
    ],
    syllabus: [
      "Morning and evening azkar",
      "Duas for eating, sleeping and travel",
      "Duas from the Quran",
      "Meanings and virtues",
    ],
  },
  {
    slug: "namaz-course",
    name: "Namaz / Salah Course",
    urdu: "نماز کورس",
    summary: "Learn prayer step by step with practical guidance.",
    level: "Beginner",
    duration: "1–3 months",
    audience: "Kids & adults",
    outcomes: [
      "Perform wudu and salah correctly",
      "Recite all salah adhkar accurately",
      "Know the rulings of missed and travel prayers",
    ],
    syllabus: [
      "Wudu, ghusl and tayammum",
      "Fard, sunnah and nawafil prayers",
      "Salah recitations with Tajweed",
      "Common mistakes and sajda sahw",
    ],
  },
  {
    slug: "arabic-language",
    name: "Arabic Language",
    urdu: "عربی زبان",
    summary: "Develop a solid foundation in classical Arabic.",
    level: "Beginner to intermediate",
    duration: "8–12 months",
    audience: "Teens & adults",
    outcomes: [
      "Read simple classical Arabic texts",
      "Understand basic grammar (nahw & sarf)",
      "Build core Arabic vocabulary",
    ],
    syllabus: [
      "Arabic alphabet and word structures",
      "Nouns, verbs and particles",
      "Basic sentence construction",
      "Reading graded texts",
    ],
  },
  {
    slug: "spoken-arabic",
    name: "Spoken Arabic",
    urdu: "عربی گفتگو",
    summary: "Build confidence in practical Arabic conversation.",
    level: "Beginner to intermediate",
    duration: "6 months",
    audience: "Teens & adults",
    outcomes: [
      "Hold everyday conversations in Arabic",
      "Use practical phrases for travel and work",
      "Improve listening comprehension",
    ],
    syllabus: [
      "Greetings and introductions",
      "Daily-life dialogues",
      "Shopping, travel and workplace phrases",
      "Conversation practice with the teacher",
    ],
  },
  {
    slug: "islamic-studies-for-kids",
    name: "Islamic Studies for Kids",
    urdu: "بچوں کی اسلامی تعلیم",
    summary: "Age-appropriate faith, character, and worship lessons.",
    level: "Kids",
    duration: "Ongoing",
    audience: "Ages 4–12",
    outcomes: [
      "Learn faith basics in a friendly way",
      "Memorize short surahs and duas",
      "Develop good Islamic character",
    ],
    syllabus: [
      "Stories of the Prophets",
      "Short surahs and duas",
      "Manners and character building",
      "Fun quizzes and activities",
    ],
  },
  {
    slug: "quran-for-adults",
    name: "Quran for Adults",
    urdu: "بڑوں کے لیے قرآن",
    summary: "Flexible, respectful learning designed for adult students.",
    level: "All levels",
    duration: "Flexible",
    audience: "Adults, including late starters",
    outcomes: [
      "Start or restart Quran learning without pressure",
      "Progress at your own comfortable pace",
      "Fit classes around work and family",
    ],
    syllabus: [
      "Assessment and personal plan",
      "Letters and pronunciation refresh",
      "Reading with Tajweed",
      "Understanding selected surahs",
    ],
  },
  {
    slug: "quran-for-beginners",
    name: "Quran for Beginners",
    urdu: "ابتدائی قرآن کورس",
    summary: "Start from the basics at a comfortable pace.",
    level: "Beginner",
    duration: "3–6 months",
    audience: "Complete beginners",
    outcomes: [
      "Recognise Arabic letters and sounds",
      "Read short surahs correctly",
      "Gain confidence to continue further",
    ],
    syllabus: [
      "Letters and sounds",
      "Joining letters into words",
      "Short surahs practice",
      "Next-step guidance",
    ],
  },
];

export const courseBySlug = (slug: string) => courses.find((course) => course.slug === slug);

export const benefits = [
  "Qualified Quran teachers",
  "Male and female teachers",
  "One-to-one online classes",
  "Classes for kids and adults",
  "Flexible timings",
  "Classes worldwide",
  "Free trial class",
  "Affordable monthly plans",
  "Safe and friendly learning",
  "Regular progress updates",
];

export const faqs = [
  ["Is the trial class free?", "Yes. You can book a free trial class before choosing a plan."],
  [
    "Do you teach children and adults?",
    "Yes. Lessons are available for children, adults, and complete beginners.",
  ],
  [
    "Do you have female teachers?",
    "Yes. Male and female teachers are available according to student needs.",
  ],
  [
    "What countries do you teach in?",
    "We teach students online worldwide, including the UK, USA, Canada, Gulf countries, Australia, and Europe.",
  ],
  [
    "Are classes one-to-one?",
    "Yes. One-to-one classes give every student focused attention and an individual pace.",
  ],
  [
    "How do I pay the monthly fee?",
    "Payment can be made through Meezan Bank, Easypaisa/JazzCash, or NayaPay using the details on our Pricing page.",
  ],
] as const;

export const plans = [
  {
    name: "Basic",
    features: ["3 classes per week", "One-to-one classes", "Quran reading", "Tajweed"],
  },
  {
    name: "Standard",
    features: ["5 classes per week", "One-to-one classes", "Quran + Tajweed", "Islamic studies"],
  },
  {
    name: "Premium",
    features: [
      "Customized schedule",
      "Quran + Tajweed",
      "Translation",
      "Islamic studies",
      "Progress monitoring",
    ],
  },
];

export const contact = {
  email: "yasirnazeem709@gmail.com",
  phonePrimary: "+92 329 8503412",
  phoneSecondary: "+92 335 0909536",
  whatsapp: "923298503412",
  address: "Based in Karak, Khyber Pakhtunkhwa, Pakistan — serving students worldwide",
};

export const blogPosts = [
  {
    slug: "why-tajweed-matters",
    title: "Why Tajweed matters when you read the Quran",
    urdu: "تجوید کی اہمیت",
    date: "2026-08-14",
    excerpt:
      "Tajweed protects the meaning of the words of Allah. Here is why every reader should learn it early.",
    body: [
      "Tajweed is the set of rules that governs how each letter of the Quran is pronounced. Learning it early prevents mistakes that change meaning.",
      "Students who begin with Noorani Qaida and then move into a Tajweed course usually read far more confidently within a year.",
      "In our one-to-one classes the teacher listens to every letter and corrects gently, so progress is steady and pressure-free.",
    ],
  },
  {
    slug: "hifz-plan-for-busy-students",
    title: "A realistic Hifz plan for busy students",
    urdu: "مصروف طلبہ کے لیے حفظ کا منصوبہ",
    date: "2026-07-29",
    excerpt:
      "Memorizing the Quran is possible even with school or a full-time job. Consistency beats intensity.",
    body: [
      "A small daily portion that never breaks is stronger than a large portion that stops after two weeks.",
      "We split every Hifz lesson into three parts: new memorization, recent revision, and old revision.",
      "Monthly tests keep the student honest about retention and let us adjust the daily target.",
    ],
  },
  {
    slug: "helping-children-love-quran",
    title: "Helping children build a love for the Quran",
    urdu: "بچوں میں قرآن کی محبت",
    date: "2026-07-05",
    excerpt:
      "Encouragement, short sessions, and stories do more for young learners than long, strict lessons.",
    body: [
      "Children learn best in short, lively sessions with clear praise for effort rather than perfection.",
      "Stories of the Prophets and simple duas give young students something to look forward to each week.",
      "Parents receive regular progress updates so encouragement continues at home.",
    ],
  },
];

export const blogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
