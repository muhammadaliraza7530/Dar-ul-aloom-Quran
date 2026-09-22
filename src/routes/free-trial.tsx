import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-parts";
import { courses } from "@/lib/academy-content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/free-trial")({
  head: () => ({
    meta: [
      { title: "Book a Free Trial Class | Dar-ul-Uloom Online Quran Academy" },
      { name: "description", content: "Register for a free online Quran trial class with a qualified male or female teacher at a time that suits you." },
      { property: "og:title", content: "Book a Free Trial Class | Dar-ul-Uloom" },
      { property: "og:description", content: "Register for a free one-to-one online Quran trial class." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeTrialPage,
});

function FreeTrialPage() {
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    const { error } = await supabase.from("leads").insert({
      kind: "free_trial",
      full_name: String(data.get("full_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      course: String(data.get("course") ?? ""),
      preferred_time: String(data.get("preferred_time") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setBusy(false);
    if (error) {
      toast.error("We could not submit the form. Please try WhatsApp.");
      return;
    }
    toast.success("Registration received — we will contact you to confirm your trial class.");
    form.reset();
  }

  return (
    <>
      <PageHero title="Book your free trial class" urdu="مفت آزمائشی کلاس" description="Three free trial classes, no payment required. Tell us what suits you and we will arrange a teacher." />
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <form className="space-y-4 border border-border bg-card p-8 shadow-sm" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="full_name">Student name</Label>
                <Input id="full_name" name="full_name" required maxLength={120} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={160} />
              </div>
              <div>
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input id="phone" name="phone" required maxLength={40} />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" maxLength={80} />
              </div>
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <select
                id="course"
                name="course"
                required
                className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
              >
                {courses.map((course) => (
                  <option key={course.slug} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="preferred_time">Preferred time (with your time zone)</Label>
              <Input id="preferred_time" name="preferred_time" maxLength={120} placeholder="e.g. 6pm UK time" />
            </div>
            <div>
              <Label htmlFor="message">Anything else we should know?</Label>
              <Textarea id="message" name="message" rows={4} maxLength={1000} />
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : null}
              Request free trial
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
