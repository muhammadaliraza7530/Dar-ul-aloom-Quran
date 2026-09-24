import { Link } from "@tanstack/react-router";
import { Clock3, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourseVisual } from "@/lib/course-visuals";
import type { Course } from "@/lib/academy-content";

/* ──────────────────────────────────────────────
   Islamic geometric SVG patterns
────────────────────────────────────────────── */
function IslamicPattern({ pattern, id }: { pattern: string; id: string }) {
  switch (pattern) {
    case "star8":
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="white" strokeWidth="0.5" opacity="0.15">
                <polygon points="20,2 24,10 33,10 26,16 29,25 20,20 11,25 14,16 7,10 16,10" />
                <rect x="14" y="14" width="12" height="12" transform="rotate(45 20 20)" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "lattice":
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <g stroke="white" strokeWidth="0.5" opacity="0.15" fill="none">
                <circle cx="12" cy="12" r="5" />
                <line x1="0" y1="12" x2="24" y2="12" />
                <line x1="12" y1="0" x2="12" y2="24" />
                <line x1="0" y1="0" x2="24" y2="24" />
                <line x1="24" y1="0" x2="0" y2="24" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "chevron":
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
              <path
                d="M0 16 L16 0 L32 16"
                stroke="white"
                strokeWidth="0.6"
                fill="none"
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "diamond":
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <polygon
                points="14,2 26,14 14,26 2,14"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "wave":
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 10 Q10 0 20 10 Q30 20 40 10"
                stroke="white"
                strokeWidth="0.6"
                fill="none"
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    default: // arabesque
      return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id={id} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <g stroke="white" strokeWidth="0.5" fill="none" opacity="0.15">
                <circle cx="18" cy="18" r="8" />
                <circle cx="18" cy="18" r="14" />
                <line x1="4" y1="18" x2="32" y2="18" />
                <line x1="18" y1="4" x2="18" y2="32" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
  }
}

/* ──────────────────────────────────────────────
   Individual Course Card — used on home + courses pages
────────────────────────────────────────────── */
export function CourseCard({
  course,
  index,
  language,
  showActions = false,
}: {
  course: Course;
  index: number;
  language: string;
  showActions?: boolean;
}) {
  const visual = getCourseVisual(course.slug);
  const patternId = `pat-${course.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-1 hover:ring-gold/40">
      {/* Coloured header with pattern */}
      <div className={`relative h-32 bg-gradient-to-br ${visual.gradient} overflow-hidden`}>
        <div className="absolute inset-0">
          <IslamicPattern pattern={visual.pattern} id={patternId} />
        </div>
        {/* Decorative moon/arc */}
        <div className="absolute -bottom-4 -end-4 size-24 rounded-full border border-white/10 opacity-20" />
        <div className="absolute -bottom-8 -end-8 size-36 rounded-full border border-white/10 opacity-10" />

        {/* Number badge */}
        <div className="absolute start-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white backdrop-blur-sm ring-1 ring-white/20">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Emoji icon */}
        <div className="absolute end-4 top-4 text-2xl opacity-80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {visual.emoji}
        </div>

        {/* Course name overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm px-4 pb-3 pt-4 border-t border-white/20">
          <h3 className="font-display text-base font-bold text-gray-950 leading-tight sm:text-lg">
            {language === "ur" ? course.urdu : course.name}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>

        {/* Level + duration */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock3 className="size-3.5 shrink-0 text-gold-dark" />
          <span>{course.level}</span>
          <span className="text-border">·</span>
          <span>{course.duration}</span>
        </div>

        {/* CTA */}
        <div className="mt-4 flex flex-col gap-2">
          {showActions ? (
            <>
              <Button asChild variant="gold" size="sm" className="w-full">
                <Link to="/course/$slug" params={{ slug: course.slug }}>
                  View course
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                  Free trial
                </a>
              </Button>
            </>
          ) : (
            <Link
              to="/course/$slug"
              params={{ slug: course.slug }}
              className="inline-flex items-center gap-1 text-sm font-bold tracking-wide text-gold-dark transition-colors hover:text-gold"
            >
              {language === "ur" ? "مزید جانیں" : "Learn more"} →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────
   Featured / hero-style course card (larger, for specific courses)
────────────────────────────────────────────── */
export function FeaturedCourseCard({
  course,
  index,
  language,
}: {
  course: Course;
  index: number;
  language: string;
}) {
  const visual = getCourseVisual(course.slug);
  const patternId = `feat-${course.slug}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Full background with pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`}>
        <IslamicPattern pattern={visual.pattern} id={patternId} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm ring-1 ring-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-3xl opacity-80 transition-transform duration-500 group-hover:scale-110">
            {visual.emoji}
          </span>
        </div>

        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
            {course.level} · {course.duration}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            {language === "ur" ? course.urdu : course.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{course.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="sm">
              <Link to="/course/$slug" params={{ slug: course.slug }}>
                View course
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                Free trial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
