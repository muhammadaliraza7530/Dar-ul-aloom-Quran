import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Clock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-parts";
import { useLanguage } from "@/components/academy-layout";

export const Route = createFileRoute("/free-trial")({
  head: () => ({
    meta: [
      { title: "Book a Free Trial Class | Dar ul Uloom Online Quran Academy & Islamic Center" },
      { name: "description", content: "Book your free online Quran trial class. Contact us on WhatsApp to get started with a qualified male or female teacher." },
      { property: "og:title", content: "Book a Free Trial Class | Dar ul Uloom Online Quran Academy & Islamic Center" },
      { property: "og:description", content: "Contact us on WhatsApp to book your free one-to-one online Quran trial class." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeTrialPage,
});

function FreeTrialPage() {
  const { language } = useLanguage();
  const ur = language === "ur";

  return (
    <>
      <PageHero
        title="Book your free trial class"
        urdu="مفت آزمائشی کلاس بک کریں"
        description="Three free trial classes, no payment required. Contact us on WhatsApp to get started."
      />
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Left: Steps */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-primary">
                {ur ? "داخلے کا طریقہ" : "How to get started"}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: MessageCircle,
                    en: "Send us a WhatsApp message",
                    ur: "واٹس ایپ پر میسج بھیجیں",
                    desc_en: "Tell us your name, the course you are interested in, and your preferred timing.",
                    desc_ur: "اپنا نام، کورس اور پسندیدہ وقت بتائیں۔",
                  },
                  {
                    icon: GraduationCap,
                    en: "We arrange your teacher",
                    ur: "ہم آپ کا استاد مقرر کریں گے",
                    desc_en: "We will match you with a qualified male or female teacher.",
                    desc_ur: "ہم آپ کے لیے مناسب استاد ترتیب دیں گے۔",
                  },
                  {
                    icon: Clock,
                    en: "Start your 3 free trial classes",
                    ur: "تین مفت آزمائشی کلاسز شروع کریں",
                    desc_en: "No payment required. Experience the teaching before you commit.",
                    desc_ur: "کوئی فیس نہیں۔ باقاعدہ داخلے سے پہلے تعلیم کا تجربہ لیں۔",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="rounded-2xl bg-gold/10 p-3 text-gold-dark ring-1 ring-gold/20 shrink-0">
                      <step.icon className="size-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{ur ? step.ur : step.en}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ur ? step.desc_ur : step.desc_en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact CTA */}
            <div className="sticky top-24 space-y-4 rounded-xl border border-gold/30 bg-card p-8 shadow-lg">
              <h3 className="font-display text-2xl text-primary">
                {ur ? "ابھی رابطہ کریں" : "Contact us now"}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ur
                  ? "واٹس ایپ پر پیغام بھیجیں اور اپنی مفت کلاس بک کروائیں۔ ہم 24 گھنٹوں میں جواب دیں گے۔"
                  : "Send us a WhatsApp message to book your free trial class. We respond within 24 hours."}
              </p>

              <Button asChild variant="gold" size="lg" className="w-full">
                <a href="https://wa.me/923298503412?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20book%20a%20free%20trial%20class." target="_blank" rel="noreferrer">
                  <MessageCircle className="size-5" />
                  {ur ? "واٹس ایپ پر بک کریں" : "Book via WhatsApp"}
                </a>
              </Button>

              <div className="border-t border-border pt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2" dir="ltr">
                  <Phone className="size-4 text-gold-dark" />
                  0329 8503412
                </p>
                <p className="flex items-center gap-2" dir="ltr">
                  <Phone className="size-4 text-gold-dark" />
                  0335 0909536
                </p>
              </div>

              <div className="rounded-lg bg-gold/10 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-primary mb-1">{ur ? "شامل ہے" : "What's included"}</p>
                <ul className="space-y-1">
                  <li>✓ {ur ? "تین مفت آزمائشی کلاسز" : "3 free trial classes"}</li>
                  <li>✓ {ur ? "کوئی ادائیگی نہیں" : "No payment required"}</li>
                  <li>✓ {ur ? "مرد یا خاتون استاد" : "Male or female teacher"}</li>
                  <li>✓ {ur ? "لچکدار اوقات" : "Flexible timing"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
