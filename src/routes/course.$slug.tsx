import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, ConversionBand } from "@/components/page-parts";
import { courseBySlug } from "@/lib/academy-content";

export const Route = createFileRoute("/course/$slug")({
  loader: ({ params }) => {
    const course = courseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Course not found | Dar-ul-Uloom" }, { name: "robots", content: "noindex" }] };
    }
    const { course } = loaderData;
    const description = `${course.summary} Level: ${course.level}. Duration: ${course.duration}.`;
    return {
      meta: [
        { title: `${course.name} Course Online | Dar-ul-Uloom Academy` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${course.name} Course Online | Dar-ul-Uloom` },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  return (
    <>
      <PageHero title={course.name} urdu={course.urdu} description={course.summary} />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-primary">What you will achieve</h2>
              <ul className="mt-4 space-y-3">
                {course.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-primary">Course outline</h2>
              <ol className="mt-4 space-y-3">
                {course.syllabus.map((item, index) => (
                  <li key={item} className="border-s-2 border-gold ps-4 text-sm leading-6 text-muted-foreground">
                    <span className="font-semibold text-primary">Step {index + 1}. </span>{item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="h-fit border border-border bg-card p-7 shadow-sm">
            <dl className="space-y-4 text-sm">
              <div><dt className="font-semibold text-primary">Level</dt><dd className="text-muted-foreground">{course.level}</dd></div>
              <div><dt className="font-semibold text-primary">Duration</dt><dd className="text-muted-foreground">{course.duration}</dd></div>
              <div><dt className="font-semibold text-primary">Who it is for</dt><dd className="text-muted-foreground">{course.audience}</dd></div>
            </dl>
            <Button asChild variant="gold" className="mt-6 w-full"><Link to="/free-trial">Book free trial</Link></Button>
            <Button asChild variant="outline" className="mt-3 w-full"><Link to="/courses">All courses</Link></Button>
          </aside>
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
