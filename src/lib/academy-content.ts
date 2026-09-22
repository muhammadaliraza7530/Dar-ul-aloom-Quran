import type { Bi } from "./i18n";

export const academy = {
  nameShort: ["Dar Uloom", "دارالعلوم"] as Bi,
  nameFull: [
    "Dar Uloom Quran Academy & Islamic Center",
    "دارالعلوم آن لائن قرآن اکیڈمی اینڈ اسلامک سینٹر",
  ] as Bi,
  tagline: [
    "Online Quran Academy & Islamic Center",
    "آن لائن قرآن اکیڈمی اینڈ اسلامک سینٹر",
  ] as Bi,
  founder: ["Maulana Yasir Muhammadi", "مولانا یاسر محمدی"] as Bi,
};

export type Course = {
  slug: string;
  name: Bi;
  summary: Bi;
  level: Bi;
  duration: Bi;
  audience: Bi;
  outcomes: Bi[];
  syllabus: Bi[];
  tags: ("kids" | "adults" | "arabic")[];
};

export const courses: Course[] = [
  {
    slug: "noorani-qaida",
    name: ["Noorani Qaida", "نورانی قاعدہ"],
    summary: [
      "Build a strong foundation in Arabic letters and pronunciation.",
      "عربی حروف اور صحیح تلفظ کی مضبوط بنیاد رکھیں۔",
    ],
    level: ["Beginner", "ابتدائی"],
    duration: ["3–5 months", "3 تا 5 ماہ"],
    audience: ["Kids & absolute beginners", "بچے اور بالکل نئے طلبہ"],
    outcomes: [
      ["Recognise and pronounce all Arabic letters correctly", "تمام عربی حروف درست پہچاننا اور ادا کرنا"],
      ["Read joined words and short verses with confidence", "ملے ہوئے الفاظ اور مختصر آیات اعتماد سے پڑھنا"],
      ["Understand harakat, madd, sukoon and tanween", "حرکات، مد، سکون اور تنوین سمجھنا"],
    ],
    syllabus: [
      ["Individual letters and their articulation points", "مفرد حروف اور ان کے مخارج"],
      ["Joined letters and letter shapes", "مرکب حروف اور حروف کی شکلیں"],
      ["Harakat, tanween and sukoon", "حرکات، تنوین اور سکون"],
      ["Madd, shaddah and practice exercises", "مد، شد اور مشقی تمرین"],
    ],
    tags: ["kids"],
  },
  {
    slug: "quran-reading",
    name: ["Quran Reading (Nazra)", "ناظرہ قرآن"],
    summary: [
      "Read the Holy Quran fluently with correct pronunciation.",
      "قرآن مجید روانی اور درست تلفظ کے ساتھ پڑھیں۔",
    ],
    level: ["Beginner to intermediate", "ابتدائی تا درمیانی"],
    duration: ["6–12 months", "6 تا 12 ماہ"],
    audience: ["Kids & adults", "بچے اور بڑے"],
    outcomes: [
      ["Read any page of the Quran fluently", "قرآن کا کوئی بھی صفحہ روانی سے پڑھنا"],
      ["Apply correct pronunciation while reading", "پڑھتے وقت درست تلفظ کا خیال رکھنا"],
      ["Complete the Quran with teacher supervision", "استاد کی نگرانی میں قرآن مکمل کرنا"],
    ],
    syllabus: [
      ["Revision of Qaida rules", "قاعدہ کے قواعد کا اعادہ"],
      ["Guided reading, para by para", "پارہ بہ پارہ نگرانی میں تلاوت"],
      ["Common recitation mistakes and corrections", "عام غلطیاں اور ان کی اصلاح"],
      ["Fluency and speed building", "روانی اور رفتار میں بہتری"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "quran-with-tajweed",
    name: ["Quran with Tajweed", "قرآن مع تجوید"],
    summary: [
      "Learn and apply the essential rules of Tajweed.",
      "تجوید کے بنیادی قواعد سیکھ کر تلاوت میں لاگو کریں۔",
    ],
    level: ["Intermediate", "درمیانی"],
    duration: ["8–12 months", "8 تا 12 ماہ"],
    audience: ["Students who can already read", "وہ طلبہ جو پڑھ سکتے ہیں"],
    outcomes: [
      ["Apply Tajweed rules while reciting", "تلاوت میں تجوید کے قواعد کا استعمال"],
      ["Recite with correct makharij and sifaat", "درست مخارج و صفات کے ساتھ تلاوت"],
      ["Beautify recitation with proper pauses", "درست وقف کے ساتھ خوبصورت تلاوت"],
    ],
    syllabus: [
      ["Makharij al-huroof (articulation points)", "مخارج الحروف"],
      ["Noon and meem sakinah rules", "نون و میم ساکنہ کے احکام"],
      ["Madd categories and their lengths", "مد کی اقسام اور مقدار"],
      ["Waqf (pausing) rules and practice", "وقف کے قواعد اور مشق"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "hifz-quran",
    name: ["Quran Memorization (Hifz)", "حفظ القرآن"],
    summary: [
      "A structured memorization plan with regular revision.",
      "منظم حفظ کا منصوبہ اور باقاعدہ دہرائی۔",
    ],
    level: ["All levels", "ہر سطح"],
    duration: ["Ongoing, plan based", "جاری، منصوبے کے مطابق"],
    audience: ["Kids & adults", "بچے اور بڑے"],
    outcomes: [
      ["Memorize with a realistic daily target", "روزانہ مناسب سبق کے ساتھ حفظ"],
      ["Retain memorized portions through daily revision", "روزانہ دہرائی سے یاد شدہ حصہ محفوظ رکھنا"],
      ["Recite memorized parts with Tajweed", "یاد شدہ حصہ تجوید کے ساتھ سنانا"],
    ],
    syllabus: [
      ["Personal memorization plan (sabaq)", "ذاتی سبق کا منصوبہ"],
      ["Recent revision (sabqi)", "سبقی (قریبی دہرائی)"],
      ["Old revision (manzil)", "منزل (پرانی دہرائی)"],
      ["Monthly memorization tests", "ماہانہ ٹیسٹ"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "quran-translation",
    name: ["Translation of Quran", "ترجمہ قرآن"],
    summary: [
      "Understand Quranic meanings through guided study.",
      "استاد کی رہنمائی میں قرآنی معانی سمجھیں۔",
    ],
    level: ["Intermediate", "درمیانی"],
    duration: ["12 months+", "12 ماہ یا زائد"],
    audience: ["Teens & adults", "نوجوان اور بڑے"],
    outcomes: [
      ["Understand word-by-word meaning of common verses", "عام آیات کا لفظی ترجمہ سمجھنا"],
      ["Build a working Quranic vocabulary", "قرآنی الفاظ کا ذخیرہ بنانا"],
      ["Connect verses to daily life", "آیات کو روزمرہ زندگی سے جوڑنا"],
    ],
    syllabus: [
      ["Word-by-word translation method", "لفظی ترجمہ کا طریقہ"],
      ["Frequently repeated Quranic words", "کثرت سے آنے والے قرآنی الفاظ"],
      ["Selected surahs in depth", "منتخب سورتوں کا تفصیلی مطالعہ"],
      ["Reflection and application", "تدبر اور عمل"],
    ],
    tags: ["adults"],
  },
  {
    slug: "tafseer",
    name: ["Tafseer", "تفسیر القرآن"],
    summary: [
      "Study context, explanation, and lessons from the Quran.",
      "قرآن کے پس منظر، تشریح اور اسباق کا مطالعہ۔",
    ],
    level: ["Advanced", "اعلیٰ"],
    duration: ["Ongoing", "جاری"],
    audience: ["Adults", "بڑے"],
    outcomes: [
      ["Understand the background of revelation", "شانِ نزول سمجھنا"],
      ["Learn classical explanations of key verses", "اہم آیات کی مستند تشریح جاننا"],
      ["Draw practical lessons from each surah", "ہر سورت سے عملی اسباق حاصل کرنا"],
    ],
    syllabus: [
      ["Introduction to the sciences of Tafseer", "علومِ تفسیر کا تعارف"],
      ["Asbab al-nuzul (context of revelation)", "اسبابِ نزول"],
      ["Surah-by-surah study", "سورت بہ سورت مطالعہ"],
      ["Lessons and reflections", "اسباق اور تدبر"],
    ],
    tags: ["adults"],
  },
  {
    slug: "basic-islamic-studies",
    name: ["Basic Islamic Studies", "بنیادی اسلامی تعلیم"],
    summary: [
      "Learn essential beliefs, manners, and daily practice.",
      "بنیادی عقائد، آداب اور روزمرہ عمل سیکھیں۔",
    ],
    level: ["Beginner", "ابتدائی"],
    duration: ["4–8 months", "4 تا 8 ماہ"],
    audience: ["Kids & adults", "بچے اور بڑے"],
    outcomes: [
      ["Know the pillars of Iman and Islam", "ارکانِ ایمان و اسلام جاننا"],
      ["Practise Islamic manners in daily life", "روزمرہ زندگی میں اسلامی آداب"],
      ["Understand worship with confidence", "عبادات کو اعتماد کے ساتھ سمجھنا"],
    ],
    syllabus: [
      ["Aqeedah (beliefs) basics", "بنیادی عقائد"],
      ["Purification and prayer", "طہارت اور نماز"],
      ["Fasting, zakat and hajj basics", "روزہ، زکوٰۃ اور حج کے بنیادی مسائل"],
      ["Seerah and Islamic manners", "سیرت اور اسلامی آداب"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "duas-and-azkar",
    name: ["Daily Duas & Azkar", "مسنون دعائیں و اذکار"],
    summary: [
      "Memorize everyday supplications and remembrance.",
      "روزمرہ کی مسنون دعائیں اور اذکار یاد کریں۔",
    ],
    level: ["Beginner", "ابتدائی"],
    duration: ["2–4 months", "2 تا 4 ماہ"],
    audience: ["Kids & adults", "بچے اور بڑے"],
    outcomes: [
      ["Memorize the daily masnoon duas", "روزمرہ مسنون دعائیں یاد کرنا"],
      ["Understand the meaning of each dua", "ہر دعا کا مفہوم سمجھنا"],
      ["Build a daily azkar routine", "روزانہ اذکار کی عادت بنانا"],
    ],
    syllabus: [
      ["Morning and evening azkar", "صبح و شام کے اذکار"],
      ["Duas for eating, sleeping and travel", "کھانے، سونے اور سفر کی دعائیں"],
      ["Duas from the Quran", "قرآنی دعائیں"],
      ["Meanings and virtues", "معانی اور فضائل"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "namaz-course",
    name: ["Namaz / Salah Course", "نماز کورس"],
    summary: [
      "Learn prayer step by step with practical guidance.",
      "نماز قدم بہ قدم عملی رہنمائی کے ساتھ سیکھیں۔",
    ],
    level: ["Beginner", "ابتدائی"],
    duration: ["1–3 months", "1 تا 3 ماہ"],
    audience: ["Kids & adults", "بچے اور بڑے"],
    outcomes: [
      ["Perform wudu and salah correctly", "وضو اور نماز درست طریقے سے ادا کرنا"],
      ["Recite all salah adhkar accurately", "نماز کے تمام اذکار درست پڑھنا"],
      ["Know the rulings of missed and travel prayers", "قضا اور سفر کی نماز کے احکام جاننا"],
    ],
    syllabus: [
      ["Wudu, ghusl and tayammum", "وضو، غسل اور تیمم"],
      ["Fard, sunnah and nawafil prayers", "فرض، سنت اور نوافل"],
      ["Salah recitations with Tajweed", "نماز کے اذکار تجوید کے ساتھ"],
      ["Common mistakes and sajda sahw", "عام غلطیاں اور سجدہ سہو"],
    ],
    tags: ["kids", "adults"],
  },
  {
    slug: "arabic-language",
    name: ["Arabic Language", "عربی زبان"],
    summary: [
      "Develop a solid foundation in classical Arabic.",
      "فصیح عربی زبان کی مضبوط بنیاد بنائیں۔",
    ],
    level: ["Beginner to intermediate", "ابتدائی تا درمیانی"],
    duration: ["8–12 months", "8 تا 12 ماہ"],
    audience: ["Teens & adults", "نوجوان اور بڑے"],
    outcomes: [
      ["Read simple classical Arabic texts", "آسان عربی عبارات پڑھنا"],
      ["Understand basic grammar (nahw & sarf)", "بنیادی نحو و صرف سمجھنا"],
      ["Build core Arabic vocabulary", "عربی الفاظ کا ذخیرہ بنانا"],
    ],
    syllabus: [
      ["Arabic alphabet and word structures", "عربی حروف اور کلمات کی ساخت"],
      ["Nouns, verbs and particles", "اسم، فعل اور حرف"],
      ["Basic sentence construction", "بنیادی جملوں کی ترکیب"],
      ["Reading graded texts", "درجہ بدرجہ عبارات کی مشق"],
    ],
    tags: ["arabic", "adults"],
  },
  {
    slug: "spoken-arabic",
    name: ["Spoken Arabic", "عربی گفتگو"],
    summary: [
      "Build confidence in practical Arabic conversation.",
      "عملی عربی گفتگو میں اعتماد پیدا کریں۔",
    ],
    level: ["Beginner to intermediate", "ابتدائی تا درمیانی"],
    duration: ["6 months", "6 ماہ"],
    audience: ["Teens & adults", "نوجوان اور بڑے"],
    outcomes: [
      ["Hold everyday conversations in Arabic", "روزمرہ عربی گفتگو کرنا"],
      ["Use practical phrases for travel and work", "سفر و کام کے عملی جملے استعمال کرنا"],
      ["Improve listening comprehension", "سننے کی سمجھ بہتر بنانا"],
    ],
    syllabus: [
      ["Greetings and introductions", "سلام اور تعارف"],
      ["Daily-life dialogues", "روزمرہ مکالمے"],
      ["Shopping, travel and workplace phrases", "بازار، سفر اور کام کے جملے"],
      ["Conversation practice with the teacher", "استاد کے ساتھ گفتگو کی مشق"],
    ],
    tags: ["arabic", "adults"],
  },
  {
    slug: "islamic-studies-for-kids",
    name: ["Islamic Studies for Kids", "بچوں کی اسلامی تعلیم"],
    summary: [
      "Age-appropriate faith, character, and worship lessons.",
      "بچوں کی عمر کے مطابق ایمان، کردار اور عبادات کے اسباق۔",
    ],
    level: ["Kids", "بچے"],
    duration: ["Ongoing", "جاری"],
    audience: ["Ages 4–12", "عمر 4 تا 12 سال"],
    outcomes: [
      ["Learn faith basics in a friendly way", "آسان انداز میں بنیادی ایمانیات سیکھنا"],
      ["Memorize short surahs and duas", "مختصر سورتیں اور دعائیں یاد کرنا"],
      ["Develop good Islamic character", "اچھے اسلامی اخلاق پیدا کرنا"],
    ],
    syllabus: [
      ["Stories of the Prophets", "انبیاء کرام کے قصے"],
      ["Short surahs and duas", "مختصر سورتیں اور دعائیں"],
      ["Manners and character building", "آداب اور تربیت"],
      ["Fun quizzes and activities", "دلچسپ سوالات اور سرگرمیاں"],
    ],
    tags: ["kids"],
  },
  {
    slug: "quran-for-adults",
    name: ["Quran for Adults", "بڑوں کے لیے قرآن"],
    summary: [
      "Flexible, respectful learning designed for adult students.",
      "بڑی عمر کے طلبہ کے لیے آسان اور باوقار تعلیم۔",
    ],
    level: ["All levels", "ہر سطح"],
    duration: ["Flexible", "لچکدار"],
    audience: ["Adults, including late starters", "بڑے، بشمول دیر سے آغاز کرنے والے"],
    outcomes: [
      ["Start or restart Quran learning without pressure", "بغیر دباؤ قرآن کی تعلیم کا آغاز یا دوبارہ آغاز"],
      ["Progress at your own comfortable pace", "اپنی سہولت کی رفتار سے ترقی"],
      ["Fit classes around work and family", "کام اور گھر کے مطابق کلاس کا وقت"],
    ],
    syllabus: [
      ["Assessment and personal plan", "جائزہ اور ذاتی منصوبہ"],
      ["Letters and pronunciation refresh", "حروف اور تلفظ کا اعادہ"],
      ["Reading with Tajweed", "تجوید کے ساتھ تلاوت"],
      ["Understanding selected surahs", "منتخب سورتوں کی سمجھ"],
    ],
    tags: ["adults"],
  },
  {
    slug: "quran-for-beginners",
    name: ["Quran for Beginners", "ابتدائی قرآن کورس"],
    summary: [
      "Start from the basics at a comfortable pace.",
      "بنیاد سے آغاز، آسان رفتار کے ساتھ۔",
    ],
    level: ["Beginner", "ابتدائی"],
    duration: ["3–6 months", "3 تا 6 ماہ"],
    audience: ["Complete beginners", "بالکل نئے طلبہ"],
    outcomes: [
      ["Recognise Arabic letters and sounds", "عربی حروف اور آوازیں پہچاننا"],
      ["Read short surahs correctly", "مختصر سورتیں درست پڑھنا"],
      ["Gain confidence to continue further", "آگے بڑھنے کا اعتماد حاصل کرنا"],
    ],
    syllabus: [
      ["Letters and sounds", "حروف اور آوازیں"],
      ["Joining letters into words", "حروف کو ملا کر الفاظ بنانا"],
      ["Short surahs practice", "مختصر سورتوں کی مشق"],
      ["Next-step guidance", "اگلے مرحلے کی رہنمائی"],
    ],
    tags: ["kids", "adults"],
  },
];

export const courseBySlug = (slug: string) => courses.find((course) => course.slug === slug);

export const benefits: Bi[] = [
  ["Qualified Quran teachers", "مستند قرآن اساتذہ"],
  ["Male and female teachers", "مرد اور خواتین اساتذہ"],
  ["One-to-one online classes", "ایک بہ ایک آن لائن کلاسز"],
  ["Classes for kids and adults", "بچوں اور بڑوں کے لیے کلاسز"],
  ["Flexible timings", "لچکدار اوقات"],
  ["Classes worldwide", "دنیا بھر میں کلاسز"],
  ["Free trial class", "مفت آزمائشی کلاس"],
  ["Affordable monthly plans", "مناسب ماہانہ فیس"],
  ["Safe and friendly learning", "محفوظ اور پُرسکون ماحول"],
  ["Regular progress updates", "کارکردگی کی باقاعدہ رپورٹ"],
];

export type Faq = { question: Bi; answer: Bi };

export const faqs: Faq[] = [
  {
    question: ["Is the trial class free?", "کیا آزمائشی کلاس مفت ہے؟"],
    answer: [
      "Yes. You can book a free trial class before choosing a plan.",
      "جی ہاں۔ کوئی بھی پلان منتخب کرنے سے پہلے آپ مفت آزمائشی کلاس لے سکتے ہیں۔",
    ],
  },
  {
    question: ["Do you teach children and adults?", "کیا بچوں اور بڑوں دونوں کو پڑھایا جاتا ہے؟"],
    answer: [
      "Yes. Lessons are available for children, adults, and complete beginners.",
      "جی ہاں۔ بچوں، بڑوں اور بالکل نئے طلبہ سب کے لیے کلاسز موجود ہیں۔",
    ],
  },
  {
    question: ["Do you have female teachers?", "کیا خواتین اساتذہ بھی دستیاب ہیں؟"],
    answer: [
      "Yes. Male and female teachers are available according to student needs.",
      "جی ہاں۔ طلبہ کی ضرورت کے مطابق مرد اور خواتین اساتذہ دستیاب ہیں۔",
    ],
  },
  {
    question: ["What countries do you teach in?", "آپ کن ممالک میں پڑھاتے ہیں؟"],
    answer: [
      "We teach students online worldwide, including the UK, USA, Canada, Gulf countries, Australia, and Europe.",
      "ہم دنیا بھر میں آن لائن پڑھاتے ہیں، بشمول برطانیہ، امریکہ، کینیڈا، خلیجی ممالک، آسٹریلیا اور یورپ۔",
    ],
  },
  {
    question: ["Are classes one-to-one?", "کلاسز ایک بہ ایک ہوتی ہیں؟"],
    answer: [
      "Yes. One-to-one classes give every student focused attention and an individual pace.",
      "جی ہاں۔ ایک بہ ایک کلاس میں ہر طالب علم کو مکمل توجہ اور اپنی رفتار ملتی ہے۔",
    ],
  },
  {
    question: ["How do I pay the monthly fee?", "ماہانہ فیس کیسے ادا کریں؟"],
    answer: [
      "Payment can be made through Meezan Bank, Easypaisa/JazzCash, or NayaPay using the details on our Pricing page.",
      "فیس میزان بینک، ایزی پیسہ/جاز کیش یا نیا پے کے ذریعے ادا کی جا سکتی ہے؛ تفصیل فیس کے صفحے پر موجود ہے۔",
    ],
  },
];

export type Plan = { name: Bi; features: Bi[] };

export const plans: Plan[] = [
  {
    name: ["Basic", "بنیادی"],
    features: [
      ["3 classes per week", "ہفتے میں 3 کلاسز"],
      ["One-to-one classes", "ایک بہ ایک کلاسز"],
      ["Quran reading", "ناظرہ قرآن"],
      ["Tajweed", "تجوید"],
    ],
  },
  {
    name: ["Standard", "معیاری"],
    features: [
      ["5 classes per week", "ہفتے میں 5 کلاسز"],
      ["One-to-one classes", "ایک بہ ایک کلاسز"],
      ["Quran + Tajweed", "قرآن مع تجوید"],
      ["Islamic studies", "اسلامی تعلیم"],
    ],
  },
  {
    name: ["Premium", "خصوصی"],
    features: [
      ["Customized schedule", "اپنی مرضی کا شیڈول"],
      ["Quran + Tajweed", "قرآن مع تجوید"],
      ["Translation", "ترجمہ"],
      ["Islamic studies", "اسلامی تعلیم"],
      ["Progress monitoring", "کارکردگی کی نگرانی"],
    ],
  },
];

export const contact = {
  email: "yasirnazeem709@gmail.com",
  phonePrimary: "+92 329 8503412",
  phoneSecondary: "+92 335 0909536",
  whatsapp: "923298503412",
  address: [
    "Based in Karak, Khyber Pakhtunkhwa, Pakistan — serving students worldwide",
    "کرک، خیبر پختونخوا، پاکستان — دنیا بھر کے طلبہ کے لیے آن لائن خدمات",
  ] as Bi,
};

export type BlogPost = { slug: string; date: string; title: Bi; excerpt: Bi; body: Bi[] };

export const blogPosts: BlogPost[] = [
  {
    slug: "why-tajweed-matters",
    date: "2026-08-14",
    title: ["Why Tajweed matters when you read the Quran", "تلاوت میں تجوید کی اہمیت"],
    excerpt: [
      "Tajweed protects the meaning of the words of Allah. Here is why every reader should learn it early.",
      "تجوید کلامِ الٰہی کے معنی کی حفاظت کرتی ہے۔ ہر پڑھنے والے کو یہ ابتدا میں سیکھنی چاہیے۔",
    ],
    body: [
      [
        "Tajweed is the set of rules that governs how each letter of the Quran is pronounced. Learning it early prevents mistakes that change meaning.",
        "تجوید وہ قواعد ہیں جو قرآن کے ہر حرف کی درست ادائیگی بتاتے ہیں۔ ابتدا میں سیکھنے سے وہ غلطیاں بچ جاتی ہیں جو معنی بدل دیتی ہیں۔",
      ],
      [
        "Students who begin with Noorani Qaida and then move into a Tajweed course usually read far more confidently within a year.",
        "جو طلبہ نورانی قاعدہ سے آغاز کر کے تجوید کورس کرتے ہیں، وہ عموماً ایک سال میں کہیں زیادہ اعتماد سے پڑھنے لگتے ہیں۔",
      ],
      [
        "In our one-to-one classes the teacher listens to every letter and corrects gently, so progress is steady and pressure-free.",
        "ہماری ایک بہ ایک کلاس میں استاد ہر حرف سنتا اور نرمی سے اصلاح کرتا ہے، اس لیے ترقی مستحکم اور بغیر دباؤ ہوتی ہے۔",
      ],
    ],
  },
  {
    slug: "hifz-plan-for-busy-students",
    date: "2026-07-29",
    title: ["A realistic Hifz plan for busy students", "مصروف طلبہ کے لیے حفظ کا حقیقی منصوبہ"],
    excerpt: [
      "Memorizing the Quran is possible even with school or a full-time job. Consistency beats intensity.",
      "اسکول یا ملازمت کے ساتھ بھی حفظ ممکن ہے۔ تسلسل شدت سے بہتر ہے۔",
    ],
    body: [
      [
        "A small daily portion that never breaks is stronger than a large portion that stops after two weeks.",
        "روزانہ کا مختصر سبق جو کبھی نہ ٹوٹے، اُس بڑے سبق سے بہتر ہے جو دو ہفتوں میں رک جائے۔",
      ],
      [
        "We split every Hifz lesson into three parts: new memorization, recent revision, and old revision.",
        "ہم ہر حفظ کے سبق کو تین حصوں میں تقسیم کرتے ہیں: نیا سبق، سبقی اور منزل۔",
      ],
      [
        "Monthly tests keep the student honest about retention and let us adjust the daily target.",
        "ماہانہ ٹیسٹ سے یاد کی حقیقی صورت سامنے آتی ہے اور روزانہ کا ہدف بہتر بنایا جاتا ہے۔",
      ],
    ],
  },
  {
    slug: "helping-children-love-quran",
    date: "2026-07-05",
    title: ["Helping children build a love for the Quran", "بچوں میں قرآن کی محبت پیدا کرنا"],
    excerpt: [
      "Encouragement, short sessions, and stories do more for young learners than long, strict lessons.",
      "حوصلہ افزائی، مختصر کلاسز اور کہانیاں بچوں کے لیے طویل اور سخت اسباق سے زیادہ مفید ہیں۔",
    ],
    body: [
      [
        "Children learn best in short, lively sessions with clear praise for effort rather than perfection.",
        "بچے مختصر اور دلچسپ کلاس میں بہتر سیکھتے ہیں، جہاں کوشش کی تعریف ہو، نہ کہ صرف کمال کی۔",
      ],
      [
        "Stories of the Prophets and simple duas give young students something to look forward to each week.",
        "انبیاء کے قصے اور آسان دعائیں بچوں کے لیے ہر ہفتے دلچسپی کا سامان بنتی ہیں۔",
      ],
      [
        "Parents receive regular progress updates so encouragement continues at home.",
        "والدین کو کارکردگی کی باقاعدہ رپورٹ دی جاتی ہے تاکہ گھر میں بھی حوصلہ افزائی جاری رہے۔",
      ],
    ],
  },
];

export const blogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
