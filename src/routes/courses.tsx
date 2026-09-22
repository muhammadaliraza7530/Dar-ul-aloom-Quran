import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, ConversionBand } from "@/components/page-parts";
import { courses } from "@/lib/academy-content";
import { useLanguage } from "@/components/academy-layout";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Online Quran Courses | Dar-ul-Uloom" },
      { name: "description", content: "Explore 14 online Quran, Tajweed, Hifz, Arabic and Islamic studies courses for kids and adults." },
      { property: "og:title", content: "Online Quran Courses | Dar-ul-Uloom" },
      { property: "og:description", content: "Quran and Islamic education courses for all ages and levels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

const filters = ["All", "Kids", "Adults", "Arabic"] as const;

function CoursesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const { language } = useLanguage();

  const filtered = courses.filter((course) => {
    if (filter === "All") return true;
    const haystack = `${course.name} ${course.audience}`.toLowerCase();
    return haystack.includes(filter.toLowerCase().replace(/s$/, ""));
  });

  return (
    <>
      <PageHero
        title="Online Quran & Islamic courses"
        urdu="آن لائن قرآن و اسلامی کورسز"
        description="Structured one-to-one learning for children, adults, beginners, and advancing students."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <Button key={f} variant={filter === f ? "gold" : "outline"} onClick={() => setFilter(f)}>{f}</Button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <article key={course.slug} className="flex flex-col border border-border bg-card p-7 shadow-sm">
                <BookOpen className="size-7 text-gold-dark" />
                <h2 className="mt-5 font-display text-2xl text-primary">{language === "ur" ? course.urdu : course.name}</h2>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{course.summary}</p>
                <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <Clock3 className="size-4" />{course.level} · {course.duration}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button asChild variant="gold"><Link to="/course/$slug" params={{ slug: course.slug }}>View course</Link></Button>
                  <Button asChild variant="outline"><Link to="/free-trial">Free trial</Link></Button>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">No courses match this filter.</p>
          ) : null}
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
