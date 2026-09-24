import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-parts";
import { contact } from "@/lib/academy-content";
import { sendEmailNotification } from "@/lib/email";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Dar ul Uloom Online Quran Academy & Islamic Center" },
      {
        name: "description",
        content:
          "Contact Dar ul Uloom Online Quran Academy & Islamic Center by email or WhatsApp to ask about courses, timings and fees.",
      },
      {
        property: "og:title",
        content: "Contact Us | Dar ul Uloom Online Quran Academy & Islamic Center",
      },
      {
        property: "og:description",
        content: "Reach our team by email or WhatsApp for course details and timings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setBusy(true);

    const fullName = String(data.get("full_name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");

    // Build WhatsApp message
    const waText =
      `*New Contact Message* ✉️\n\n` +
      `*Name:* ${fullName}\n` +
      `*Email:* ${email}\n` +
      `*Phone/WhatsApp:* ${phone}\n\n` +
      `*Message:* ${message}`;

    const waUrl = `https://wa.me/923298503412?text=${encodeURIComponent(waText)}`;

    // Email Delivery (Backend)
    try {
      await sendEmailNotification({
        type: "Contact",
        details: { Name: fullName, Email: email, Phone: phone, Message: message },
      });
    } catch (e) {
      console.error("Email notification failed:", e);
    }

    // Open WhatsApp link
    window.open(waUrl, "_blank");

    toast.success("Message prepared! Opening WhatsApp...");
    setBusy(false);
    form.reset();
  }

  return (
    <>
      <PageHero
        title="Contact us"
        urdu="ہم سے رابطہ کریں"
        description="Ask about courses, timings or fees — we usually reply the same day."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4 border border-border bg-card p-6 shadow-sm">
              <Mail className="size-6 shrink-0 text-gold-dark" />
              <div>
                <h2 className="font-display text-xl text-primary">Email</h2>
                <a
                  className="text-sm text-muted-foreground hover:text-gold-dark"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4 border border-border bg-card p-6 shadow-sm">
              <Phone className="size-6 shrink-0 text-gold-dark" />
              <div>
                <h2 className="font-display text-xl text-primary">Phone / WhatsApp</h2>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  {contact.phonePrimary}
                </p>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  {contact.phoneSecondary}
                </p>
              </div>
            </div>
            <div className="flex gap-4 border border-border bg-card p-6 shadow-sm">
              <MapPin className="size-6 shrink-0 text-gold-dark" />
              <div>
                <h2 className="font-display text-xl text-primary">Location</h2>
                <p className="text-sm text-muted-foreground">{contact.address}</p>
              </div>
            </div>
            <Button asChild variant="gold">
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <form
            className="space-y-4 border border-border bg-card p-8 shadow-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="font-display text-2xl text-primary">Send a message</h2>
            <div>
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" name="full_name" required maxLength={120} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required maxLength={160} />
            </div>
            <div>
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" name="phone" maxLength={40} />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} required maxLength={1500} />
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : null}
              Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
