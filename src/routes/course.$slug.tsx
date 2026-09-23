import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionBand } from "@/components/page-parts";
import { courseBySlug } from "@/lib/academy-content";
import { getCourseVisual } from "@/lib/course-visuals";

export const Route = createFileRoute("/course/$slug")({
  loader: ({ params }) => {
    const course = courseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Course not found | Dar ul Uloom Online Quran Academy & Islamic Center" }, { name: "robots", content: "noindex" }] };
    }
    const { course } = loaderData;
    const description = `${course.summary} Level: ${course.level}. Duration: ${course.duration}.`;
    return {
      meta: [
        { title: `${course.name} Course Online | Dar ul Uloom Online Quran Academy & Islamic Center` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${course.name} Course Online | Dar ul Uloom Online Quran Academy & Islamic Center Quran Academy & Islamic Center` },
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
  const visual = getCourseVisual(course.slug);

  return (
    <>
      {/* Premium hero header for this course */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${visual.gradient} py-20 text-white`}>
        {/* Background pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="course-hero-pat" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="0.3" fill="none" />
              <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="0.3" />
              <line x1="24" y1="6" x2="24" y2="42" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#course-hero-pat)" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            {" "}/  <Link to="/courses" className="hover:text-white">Courses</Link>
            {" "}/ {course.name}
          </p>

          <div className="flex items-start gap-6">
            <div className="text-5xl opacity-80">{visual.emoji}</div>
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {course.name}
              </h1>
              <p className="mt-3 text-xl text-white/80">{course.urdu}</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">{course.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm ring-1 ring-white/20">
                  <Clock3 className="inline size-4 mr-1 -mt-0.5" />{course.level}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm ring-1 ring-white/20">
                  ⏱ {course.duration}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm ring-1 ring-white/20">
                  👤 {course.audience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            {/* What you'll achieve */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl text-primary">What you will achieve</h2>
              <ul className="mt-5 space-y-4">
                {course.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Course outline */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl text-primary">Course outline</h2>
              <ol className="mt-5 space-y-4">
                {course.syllabus.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: visual.accentTo }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-lg">
              <h3 className="font-display text-xl text-primary">Course details</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="font-semibold text-primary">Level</dt>
                  <dd className="text-muted-foreground">{course.level}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="font-semibold text-primary">Duration</dt>
                  <dd className="text-muted-foreground">{course.duration}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-semibold text-primary">For</dt>
                  <dd className="text-muted-foreground">{course.audience}</dd>
                </div>
              </dl>

              <Button asChild variant="gold" className="mt-6 w-full rounded-xl">
                <a
                  href="https://wa.me/923298503412?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20book%20a%20free%20trial%20class."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4" />
                  Book free trial
                </a>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full rounded-xl">
                <Link to="/courses">All courses</Link>
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                3 free trial classes · No payment required
              </p>
            </div>
          </aside>
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
