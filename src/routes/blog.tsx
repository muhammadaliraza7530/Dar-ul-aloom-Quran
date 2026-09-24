import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ConversionBand } from "@/components/page-parts";
import { blogPosts } from "@/lib/academy-content";
import { useLanguage } from "@/components/academy-layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Quran Learning Blog | Dar ul Uloom Online Quran Academy & Islamic Center" },
      {
        name: "description",
        content:
          "Articles on Tajweed, Hifz planning and helping children build a lasting love for the Quran.",
      },
      {
        property: "og:title",
        content: "Quran Learning Blog | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        property: "og:description",
        content: "Guidance on Tajweed, Hifz and teaching children the Quran.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { language } = useLanguage();
  return (
    <>
      <PageHero
        title="Blog & articles"
        urdu="مضامین"
        description="Practical guidance from our teachers on learning, memorizing and living the Quran."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border border-border bg-card p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                {post.date}
              </p>
              <h2 className="mt-3 font-display text-2xl text-primary">
                {language === "ur" ? post.urdu : post.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
