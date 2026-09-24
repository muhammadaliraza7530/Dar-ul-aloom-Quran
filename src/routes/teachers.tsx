import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpenCheck, MessageCircle, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionBand, PageHero, SectionHeading } from "@/components/page-parts";
import { useLanguage } from "@/components/academy-layout";
import { galleryPhotos } from "@/lib/gallery";
const teacherPhoto = "/media/maulana-yasir-muhammadi.jpeg";
const femaleTeacherPhoto = "/media/aleema-laiba-habib.jpeg";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      {
        title: "Our Quran Teachers | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        name: "description",
        content:
          "Meet Maulana Yasir Muhammadi, Aleema Laiba Habib, and our qualified male and female teachers at Dar ul Uloom Online Quran Academy & Islamic Center.",
      },
      {
        property: "og:title",
        content: "Our Quran Teachers | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        property: "og:description",
        content: "Qualified Quran teachers for personal online learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/teachers" }],
  }),
  component: TeachersPage,
});

function TeachersPage() {
  const { language } = useLanguage();
  const ur = language === "ur";

  return (
    <>
      <PageHero
        title="Learn with dedicated teachers"
        urdu="قابل اساتذہ سے قرآن سیکھیں"
        description="Personal instruction, patient guidance, and learning suited to every age and level."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Senior teacher"
            title="Maulana Yasir Muhammadi"
            urdu="مولانا یاسر محمدی"
          />
          <article className="mx-auto grid max-w-4xl overflow-hidden border border-border bg-card shadow-sm md:grid-cols-[340px_1fr]">
            <div className="bg-primary p-6">
              <img
                src={teacherPhoto}
                alt="Maulana Yasir Muhammadi, founder and Quran instructor"
                className="mx-auto aspect-[3/4] w-full border-4 border-gold object-cover object-top"
                width={340}
                height={453}
              />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-gold-dark">
                Senior Teacher &amp; Founder
              </p>
              <h3 className="mt-2 font-display text-2xl text-primary">Maulana Yasir Muhammadi</h3>
              <h2 className="mt-3 font-display text-3xl text-primary">
                {ur ? "قرآن · تجوید · اسلامی تعلیم" : "Quran · Tajweed · Islamic Studies"}
              </h2>
              <p className="mt-4 font-urdu text-xl text-gold-dark">مولانا یاسر محمدی</p>
              <div className="mt-8 space-y-5 text-sm text-muted-foreground">
                <p className="flex gap-3">
                  <BookOpenCheck className="size-5 shrink-0 text-gold-dark" />
                  Focused one-to-one teaching for children and adults.
                </p>
                <p className="flex gap-3">
                  <Users className="size-5 shrink-0 text-gold-dark" />
                  Male and female teachers available according to student needs.
                </p>
                <p className="flex gap-3">
                  <Award className="size-5 shrink-0 text-gold-dark" />
                  Structured guidance in Quran reading, Tajweed, and Islamic studies.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="gold">
                  <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    {ur ? "مولانا یاسر سے رابطہ کریں" : "Meet your teacher"}
                  </a>
                </Button>
                <a
                  href="tel:+923298503412"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-dark"
                  dir="ltr"
                >
                  <Phone className="size-4 text-gold-dark" />
                  +92 329 8503412
                </a>
              </div>
            </div>
          </article>

          {/* Aleema Laiba Habib Section */}
          <div className="mt-16">
            <SectionHeading
              eyebrow="Senior female teacher"
              title="Aleema Laiba Habib"
              urdu="عالمہ لائبہ حبیب"
            />
            <article className="mx-auto grid max-w-4xl overflow-hidden border border-border bg-card shadow-sm md:grid-cols-[340px_1fr]">
              <div className="bg-primary p-6">
                <img
                  src={femaleTeacherPhoto}
                  alt="Aleema Laiba Habib, female Quran and Islamic studies teacher"
                  className="mx-auto aspect-[3/4] w-full border-4 border-gold object-cover object-top"
                  width={340}
                  height={453}
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-gold-dark">
                  {ur ? "سینئر معلمہ و عالمہ" : "Senior Female Teacher & Aleema"}
                </p>
                <h3 className="mt-2 font-display text-2xl text-primary">Aleema Laiba Habib</h3>
                <h2 className="mt-3 font-display text-3xl text-primary">
                  {ur
                    ? "قرآن · تجوید · درس نظامی و دینی تعلیم"
                    : "Quran · Tajweed · Islamic Studies"}
                </h2>
                <p className="mt-4 font-urdu text-xl text-gold-dark">عالمہ لائبہ حبیب</p>
                <div className="mt-8 space-y-5 text-sm text-muted-foreground">
                  <p className="flex gap-3">
                    <BookOpenCheck className="size-5 shrink-0 text-gold-dark" />
                    {ur
                      ? "خواتین، بچیوں اور چھوٹے بچوں کے لیے پردہ دار اور مخصوص آن لائن کلاسز۔"
                      : "Specialized one-to-one online classes for sisters, girls, and young children."}
                  </p>
                  <p className="flex gap-3">
                    <Award className="size-5 shrink-0 text-gold-dark" />
                    {ur
                      ? "فاضلہ درس نظامی (عالمہ کورس)، تجوید، ناظرہ قرآن اور دینی و فقہی مسائل کی تعلیم۔"
                      : "Certified Aleema (Dars-e-Nizami graduate) with expertise in Tajweed, Nazra, and Islamic studies."}
                  </p>
                  <p className="flex gap-3">
                    <Users className="size-5 shrink-0 text-gold-dark" />
                    {ur
                      ? "گھریلو ماحول، شائستہ انداز تدریس اور ملکی و بین الاقوامی طالبات کے لیے اوقات کی لچک۔"
                      : "Supportive, modest learning environment with flexible timing for students worldwide."}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button asChild variant="gold">
                    <a
                      href="https://wa.me/923449422577?text=Assalamu%20Alaikum%20Aleema%20Laiba%20Habib%2C%20I%20would%20like%20to%20inquire%20about%20classes."
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="size-4" />
                      {ur ? "عالمہ لائبہ حبیب سے رابطہ کریں" : "Contact Aleema Laiba Habib"}
                    </a>
                  </Button>
                  <a
                    href="https://wa.me/923449422577"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-dark"
                    dir="ltr"
                  >
                    <Phone className="size-4 text-gold-dark" />
                    +92 344 9422577
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={ur ? "کلاس روم" : "Inside our classes"}
            title="Teachers and students at work"
            urdu="اساتذہ اور طلبہ"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {galleryPhotos.slice(0, 8).map((photo) => (
              <img
                key={photo.url}
                src={photo.url}
                alt={ur ? photo.urdu : photo.alt}
                loading="lazy"
                className="aspect-square w-full border border-border object-cover shadow-sm"
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/gallery">{ur ? "مکمل گیلری دیکھیں" : "View full gallery"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  );
}
