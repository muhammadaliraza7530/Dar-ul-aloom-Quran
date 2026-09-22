import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { ConversionBand, PageHero, SectionHeading } from "@/components/page-parts";
import { useLanguage } from "@/components/academy-layout";
import { galleryPhotos, galleryVideos } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Classes, Students & Teachers | Dar-ul-Uloom" },
      { name: "description", content: "Photos and videos from our online Quran classes: students, teachers, Tajweed practice and memorization sessions at Dar-ul-Uloom Online Quran Academy." },
      { property: "og:title", content: "Gallery — Classes, Students & Teachers | Dar-ul-Uloom" },
      { property: "og:description", content: "See our online Quran classes in photos and videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <PageHero
        title="Our classes in pictures and video"
        urdu="ہماری کلاسز تصاویر اور ویڈیو میں"
        description="A look inside our one-to-one online lessons with students and teachers from around the world."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={ur ? "ویڈیوز" : "Videos"} title="Watch a class" urdu="کلاس دیکھیں" />
          <div className="grid gap-6 md:grid-cols-2">
            {galleryVideos.map((video) => (
              <figure key={video.url} className="group overflow-hidden border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                <video
                  className="aspect-video w-full bg-noir object-cover"
                  poster={video.poster}
                  controls
                  preload="metadata"
                  playsInline
                >
                  <source src={video.url} type="video/mp4" />
                  <source src={video.webm} type="video/webm" />
                </video>
                <figcaption className="flex items-center gap-2 p-5 text-sm font-semibold text-primary">
                  <Play className="size-4 shrink-0 text-gold-dark" />
                  {ur ? video.urdu : video.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={ur ? "تصاویر" : "Photos"} title="Students and teachers" urdu="طلبہ اور اساتذہ" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.url}
                type="button"
                onClick={() => setLightbox(index)}
                className="group relative overflow-hidden border border-border bg-card shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={ur ? photo.urdu : photo.alt}
              >
                <img
                  src={photo.url}
                  alt={ur ? photo.urdu : photo.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-noir/0 transition-colors group-hover:bg-noir/25" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && galleryPhotos[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] grid place-items-center bg-noir/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={ur ? "بند کریں" : "Close"}
            className="absolute end-5 top-5 grid size-11 place-items-center rounded-full border border-gold/50 text-ivory"
          >
            <X />
          </button>
          <img
            src={galleryPhotos[lightbox]!.url}
            alt={ur ? galleryPhotos[lightbox]!.urdu : galleryPhotos[lightbox]!.alt}
            className="max-h-[85vh] w-auto max-w-full border-2 border-gold object-contain"
          />
        </div>
      )}

      <ConversionBand />
    </>
  );
}
