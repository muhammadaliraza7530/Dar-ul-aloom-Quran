/**
 * Course visual data — maps slug to gradient colours, pattern and a decorative SVG icon
 * so every course card has a unique Islamic-themed look.
 */
export type CourseVisual = {
  gradient: string; // Tailwind classes for the card accent strip
  accentFrom: string; // CSS colour for SVG gradient start
  accentTo: string; // CSS colour for SVG gradient end
  pattern: "arabesque" | "star8" | "lattice" | "chevron" | "wave" | "diamond";
  emoji: string; // fallback emoji displayed when SVG not shown
};

export const courseVisuals: Record<string, CourseVisual> = {
  "noorani-qaida": {
    gradient: "from-emerald-900 to-emerald-700",
    accentFrom: "#064e3b",
    accentTo: "#059669",
    pattern: "arabesque",
    emoji: "📖",
  },
  "quran-reading": {
    gradient: "from-amber-900 to-amber-700",
    accentFrom: "#78350f",
    accentTo: "#d97706",
    pattern: "star8",
    emoji: "🕌",
  },
  "quran-with-tajweed": {
    gradient: "from-blue-900 to-blue-700",
    accentFrom: "#1e3a5f",
    accentTo: "#2563eb",
    pattern: "lattice",
    emoji: "✨",
  },
  "hifz-quran": {
    gradient: "from-purple-900 to-purple-700",
    accentFrom: "#3b0764",
    accentTo: "#7c3aed",
    pattern: "chevron",
    emoji: "🧠",
  },
  "quran-translation": {
    gradient: "from-teal-900 to-teal-700",
    accentFrom: "#042f2e",
    accentTo: "#0d9488",
    pattern: "wave",
    emoji: "📝",
  },
  tafseer: {
    gradient: "from-rose-900 to-rose-700",
    accentFrom: "#4c0519",
    accentTo: "#e11d48",
    pattern: "diamond",
    emoji: "🌟",
  },
  "basic-islamic-studies": {
    gradient: "from-orange-900 to-orange-700",
    accentFrom: "#431407",
    accentTo: "#ea580c",
    pattern: "arabesque",
    emoji: "🌙",
  },
  "duas-and-azkar": {
    gradient: "from-sky-900 to-sky-700",
    accentFrom: "#082f49",
    accentTo: "#0284c7",
    pattern: "star8",
    emoji: "🤲",
  },
  "namaz-course": {
    gradient: "from-green-900 to-green-700",
    accentFrom: "#052e16",
    accentTo: "#16a34a",
    pattern: "chevron",
    emoji: "🕋",
  },
  "arabic-language": {
    gradient: "from-indigo-900 to-indigo-700",
    accentFrom: "#1e1b4b",
    accentTo: "#4338ca",
    pattern: "lattice",
    emoji: "🔤",
  },
  "spoken-arabic": {
    gradient: "from-cyan-900 to-cyan-700",
    accentFrom: "#083344",
    accentTo: "#0891b2",
    pattern: "wave",
    emoji: "💬",
  },
  "islamic-studies-for-kids": {
    gradient: "from-lime-900 to-lime-700",
    accentFrom: "#1a2e05",
    accentTo: "#65a30d",
    pattern: "arabesque",
    emoji: "⭐",
  },
  "female-quran-teacher": {
    gradient: "from-pink-900 to-pink-700",
    accentFrom: "#500724",
    accentTo: "#db2777",
    pattern: "diamond",
    emoji: "👩‍🏫",
  },
  "ijazah-course": {
    gradient: "from-yellow-900 to-yellow-700",
    accentFrom: "#422006",
    accentTo: "#ca8a04",
    pattern: "star8",
    emoji: "🏆",
  },
};

export function getCourseVisual(slug: string): CourseVisual {
  return (
    courseVisuals[slug] ?? {
      gradient: "from-stone-900 to-stone-700",
      accentFrom: "#1c1917",
      accentTo: "#78716c",
      pattern: "arabesque",
      emoji: "📚",
    }
  );
}
