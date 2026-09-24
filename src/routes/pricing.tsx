import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { plans } from "@/lib/academy-content";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      {
        title:
          "Quran Class Pricing & Payments | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        name: "description",
        content:
          "Flexible online Quran class plans and verified payment details for Meezan Bank, Easypaisa, JazzCash and NayaPay.",
      },
      {
        property: "og:title",
        content: "Pricing & Payments | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      { property: "og:description", content: "Flexible plans and academy payment options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});
function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Copy ${value}`}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      <Copy />
      {done && <span className="sr-only">Copied</span>}
    </Button>
  );
}
function PricingPage() {
  const accounts = [
    { name: "Meezan Bank", number: "98220111343889", holder: "Muhammad Yasir" },
    { name: "Easypaisa / JazzCash", number: "03298503412", holder: "Muhammad Yasir" },
    { name: "NayaPay", number: "4782780064060653", holder: "Matiullah" },
  ];
  return (
    <>
      <PageHero
        title="Plans & payment details"
        urdu="فیس اور ادائیگی کی تفصیلات"
        description="Choose a learning schedule that works for you. Contact us for current monthly pricing."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Monthly plans" title="Flexible learning options" />
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, i) => (
              <article
                key={plan.name}
                className={`border bg-card p-8 shadow-sm ${i === 1 ? "border-gold" : "border-border"}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
                  {plan.name}
                </p>
                <h2 className="mt-4 font-display text-3xl">Contact us for pricing</h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle2 className="size-4 text-gold-dark" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={i === 1 ? "gold" : "outline"} className="mt-8 w-full">
                  <Link to="/contact">Ask about this plan</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow="Payments" title="Academy payment accounts" />
          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((a) => (
              <article key={a.name} className="border border-border bg-card p-6">
                <h2 className="font-display text-2xl text-primary">{a.name}</h2>
                <div className="mt-5 flex items-center justify-between border-y border-border py-3">
                  <code dir="ltr" className="text-sm font-semibold">
                    {a.number}
                  </code>
                  <CopyButton value={a.number} />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Account title</p>
                <p className="font-semibold">{a.holder}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Please confirm your payment with the academy on WhatsApp after transfer.
          </p>
        </div>
      </section>
    </>
  );
}
