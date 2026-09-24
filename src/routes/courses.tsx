import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, ConversionBand } from "@/components/page-parts";
import { courses } from "@/lib/academy-content";
import { useLanguage } from "@/components/academy-layout";
import { CourseCard } from "@/components/course-card";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Online Quran Courses | Dar ul Uloom Online Quran Academy & Islamic Center" },
      {
        name: "description",
        content:
          "Explore 14 online Quran, Tajweed, Hifz, Arabic and Islamic studies courses for kids and adults.",
      },
      {
        property: "og:title",
        content: "Online Quran Courses | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        property: "og:description",
        content: "Quran and Islamic education courses for all ages and levels.",
      },
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
          {/* Filter pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "gold" : "outline"}
                className="rounded-full px-6"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          {/* Course grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                index={courses.findIndex((c) => c.slug === course.slug)}
                language={language}
                showActions={true}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No courses match this filter.
            </p>
          ) : null}
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
