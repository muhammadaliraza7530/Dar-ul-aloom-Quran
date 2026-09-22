import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { courses } from "@/lib/academy-content";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Online Admission Form | Dar-ul-Uloom Online Quran Academy" },
      {
        name: "description",
        content:
          "Fill the online admission form of Dar-ul-Uloom Online Quran Academy & Islamic Center: student details, course selection, class timing and guardian contact.",
      },
      { property: "og:title", content: "Online Admission Form | Dar-ul-Uloom" },
      {
        property: "og:description",
        content: "Apply for admission in Quran, Tajweed, Hifz and Islamic studies classes online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/admission" }],
  }),
  component: AdmissionPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter the student name").max(120),
  father_name: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone: z.string().trim().min(6, "Enter a phone / WhatsApp number").max(40),
  country: z.string().trim().max(80).optional(),
  city: z.string().trim().max(80).optional(),
  course: z.string().trim().min(1),
  preferred_time: z.string().trim().max(120).optional(),
});

const steps = [
  ["Fill the admission form", "داخلہ فارم پُر کریں"],
  ["Our team calls you on WhatsApp", "ہماری ٹیم واٹس ایپ پر رابطہ کرے گی"],
  ["Free trial classes with a teacher", "استاد کے ساتھ مفت آزمائشی کلاسز"],
  ["Confirm timing and start regular classes", "وقت طے کر کے باقاعدہ کلاسز شروع"],
] as const;

function AdmissionPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries()) as Record<string, string>;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    const details = [
      values['father_name'] ? `Father/Guardian: ${values['father_name']}` : "",
      values['gender'] ? `Gender: ${values['gender']}` : "",
      values['age'] ? `Age: ${values['age']}` : "",
      values['city'] ? `City: ${values['city']}` : "",
      values['teacher_preference'] ? `Teacher preference: ${values['teacher_preference']}` : "",
      values['previous_education'] ? `Previous Quran education: ${values['previous_education']}` : "",
      values['message'] ? `Notes: ${values['message']}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    setBusy(true);
    const { error } = await supabase.from("leads").insert({
      kind: "admission",
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country ?? "",
      course: parsed.data.course,
      preferred_time: parsed.data.preferred_time ?? "",
      message: details,
    });
    setBusy(false);

    if (error) {
      toast.error("We could not submit the form. Please contact us on WhatsApp.");
      return;
    }
    form.reset();
    setDone(true);
    toast.success("Admission form received — we will contact you soon, InshaAllah.");
  }

  return (
    <>
      <PageHero
        title="Online admission form"
        urdu="آن لائن داخلہ فارم"
        description="Complete the form below to enrol in Quran, Tajweed, Hifz or Islamic studies classes. Admission is open all year."
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div>
            {done ? (
              <div className="border border-border bg-card p-10 text-center shadow-sm">
                <CheckCircle2 className="mx-auto size-12 text-gold-dark" />
                <h2 className="mt-4 font-display text-2xl text-primary">
                  {ur ? "آپ کا داخلہ فارم موصول ہو گیا" : "Your admission form has been received"}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {ur
                    ? "ہماری ٹیم جلد واٹس ایپ پر رابطہ کرے گی۔"
                    : "Our team will contact you on WhatsApp shortly to confirm your class timing."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="gold">
                    <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                      WhatsApp us
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setDone(false)}>
                    {ur ? "نیا فارم بھریں" : "Submit another form"}
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-5 border border-border bg-card p-8 shadow-sm" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="full_name">Student name *</Label>
                    <Input id="full_name" name="full_name" required maxLength={120} />
                  </div>
                  <div>
                    <Label htmlFor="father_name">Father / guardian name</Label>
                    <Input id="father_name" name="father_name" maxLength={120} />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" min={3} max={99} />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required maxLength={160} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input id="phone" name="phone" required maxLength={40} />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" maxLength={80} />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" maxLength={80} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="course">Course *</Label>
                    <select
                      id="course"
                      name="course"
                      required
                      className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                    >
                      {courses.map((course) => (
                        <option key={course.slug} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="teacher_preference">Teacher preference</Label>
                    <select
                      id="teacher_preference"
                      name="teacher_preference"
                      className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                    >
                      <option value="">No preference</option>
                      <option>Male teacher</option>
                      <option>Female teacher</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferred_time">Preferred class timing (with time zone)</Label>
                  <Input id="preferred_time" name="preferred_time" maxLength={120} placeholder="e.g. 7pm UK time" />
                </div>
                <div>
                  <Label htmlFor="previous_education">Previous Quran education</Label>
                  <Input
                    id="previous_education"
                    name="previous_education"
                    maxLength={200}
                    placeholder="e.g. Noorani Qaida completed"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Any additional notes</Label>
                  <Textarea id="message" name="message" rows={4} maxLength={1000} />
                </div>

                <Button type="submit" variant="gold" className="w-full" disabled={busy}>
                  {busy ? <Loader2 className="animate-spin" /> : null}
                  {ur ? "داخلہ فارم جمع کریں" : "Submit admission form"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {ur ? "پہلے سے رجسٹرڈ ہیں؟ " : "Already registered? "}
                  <Link to="/auth" className="font-semibold text-gold-dark underline">
                    {ur ? "پورٹل میں لاگ ان کریں" : "Log in to the student portal"}
                  </Link>
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="border border-border bg-secondary p-6">
              <SectionHeading eyebrow="Admission process" title="How it works" urdu="داخلے کا طریقہ" centered={false} />
              <ol className="space-y-4 text-sm text-muted-foreground">
                {steps.map(([en, urText], index) => (
                  <li key={en} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center bg-gold text-xs font-bold text-noir">
                      {index + 1}
                    </span>
                    <span>{ur ? urText : en}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
              <p className="font-display text-lg text-primary">{ur ? "مدد چاہیے؟" : "Need help?"}</p>
              <p className="mt-2" dir="ltr">
                WhatsApp: 0329 8503412
              </p>
              <Button asChild variant="gold" className="mt-4 w-full">
                <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                  {ur ? "واٹس ایپ کریں" : "WhatsApp us"}
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
