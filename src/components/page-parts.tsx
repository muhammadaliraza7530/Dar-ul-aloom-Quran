import { Link } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/academy-layout";

export function PageHero({
  title,
  urdu,
  description,
}: {
  title: string;
  urdu: string;
  description: string;
}) {
  const { language } = useLanguage();
  return (
    <section className="pattern-band border-b border-gold/25 bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Dar ul Uloom Online Quran Academy & Islamic Center
        </p>
        <h1 className="max-w-4xl font-display text-4xl leading-tight sm:text-5xl">
          {language === "ur" ? urdu : title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/75">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  urdu,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  urdu?: string;
  centered?: boolean;
}) {
  const { language } = useLanguage();
  return (
    <div className={centered ? "mx-auto mb-10 max-w-3xl text-center" : "mb-8 max-w-2xl"}>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{eyebrow}</p>
      <h2 className="font-display text-3xl text-primary sm:text-4xl">
        {language === "ur" && urdu ? urdu : title}
      </h2>
      <div className={`mt-4 h-0.5 w-16 bg-gold ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}

export function ConversionBand() {
  const { language } = useLanguage();
  return (
    <section className="pattern-band bg-primary py-12 text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-start">
        <div>
          <h2 className="font-display text-3xl">
            {language === "ur"
              ? "آج ہی قرآن سیکھنے کا سفر شروع کریں"
              : "Start your Quran learning journey today"}
          </h2>
          <p className="mt-2 text-primary-foreground/70">
            {language === "ur"
              ? "ہمیں واٹس ایپ پر پیغام بھیجیں۔"
              : "Contact us on WhatsApp to book your classes."}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
              <MessageCircle />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-dark">
            <Check className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
