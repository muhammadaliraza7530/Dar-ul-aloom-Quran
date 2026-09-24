import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { courses } from "@/lib/academy-content";

export const Route = createFileRoute("/_authenticated/admission-form")({
  ssr: false,
  head: () => ({
    meta: [
      {
        title:
          "Student Admission Form | Dar ul Uloom Online Quran Academy & Islamic Center Quran Academy & Islamic Center",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdmissionFormPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter student's full name").max(120),
  father_name: z.string().trim().min(2, "Please enter father/guardian name").max(120),
  mother_name: z.string().trim().max(120).optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().min(1, "Please select gender"),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter phone number").max(40),
  whatsapp: z.string().trim().max(40).optional(),
  country: z.string().trim().max(80).optional(),
  city: z.string().trim().max(80).optional(),
  address: z.string().trim().max(300).optional(),
  course_interest: z.string().min(1, "Please select a course"),
  preferred_time: z.string().trim().max(120).optional(),
  previous_education: z.string().trim().max(300).optional(),
  guardian_name: z.string().trim().max(120).optional(),
  guardian_relation: z.string().trim().max(80).optional(),
  guardian_phone: z.string().trim().max(40).optional(),
});

function AdmissionFormPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("Please log in first");
      setBusy(false);
      return;
    }

    const { error } = await supabase.from("student_admissions").upsert({
      user_id: userData.user.id,
      ...parsed.data,
      status: "pending",
    });

    if (error) {
      toast.error("Could not submit form. Please try again.");
      setBusy(false);
      return;
    }

    // Update profile admission_status to pending
    await supabase
      .from("profiles")
      .update({
        admission_status: "pending",
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        country: parsed.data.country ?? "",
        city: parsed.data.city ?? "",
        father_name: parsed.data.father_name,
        gender: parsed.data.gender,
        date_of_birth: parsed.data.date_of_birth ?? null,
        address: parsed.data.address ?? "",
      })
      .eq("id", userData.user.id);

    setBusy(false);
    setDone(true);
    toast.success("Admission form submitted successfully!");
    setTimeout(() => navigate({ to: "/pending" }), 2000);
  }

  if (done) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-secondary">
        <div className="text-center p-8">
          <CheckCircle2 className="mx-auto size-16 text-gold-dark" />
          <h2 className="mt-4 font-display text-3xl text-primary">Form Submitted!</h2>
          <p className="mt-2 text-muted-foreground">Redirecting to your status page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            <BookOpen className="size-3.5" />
            Student Admission
          </div>
          <h1 className="mt-3 font-display text-4xl text-primary">
            {ur ? "داخلہ فارم" : "Student Admission Form"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {ur
              ? "اپنی تمام معلومات درست طور پر بھریں۔ منظوری کے بعد آپ کا LMS پورٹل فعال ہو جائے گا۔"
              : "Fill in all details accurately. Your LMS portal will be activated after admin approval."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 border border-border bg-card p-8 shadow-sm"
        >
          {/* Personal Information */}
          <fieldset>
            <legend className="mb-4 border-b border-gold/30 pb-2 font-display text-xl text-gold-dark">
              {ur ? "ذاتی معلومات" : "Personal Information"}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="full_name">
                  {ur ? "طالب علم کا پورا نام *" : "Student Full Name *"}
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  required
                  maxLength={120}
                  placeholder="Muhammad Ahmad"
                />
              </div>
              <div>
                <Label htmlFor="father_name">
                  {ur ? "والد / سرپرست کا نام *" : "Father / Guardian Name *"}
                </Label>
                <Input id="father_name" name="father_name" required maxLength={120} />
              </div>
              <div>
                <Label htmlFor="mother_name">{ur ? "والدہ کا نام" : "Mother's Name"}</Label>
                <Input id="mother_name" name="mother_name" maxLength={120} />
              </div>
              <div>
                <Label htmlFor="date_of_birth">{ur ? "تاریخ پیدائش" : "Date of Birth"}</Label>
                <Input id="date_of_birth" name="date_of_birth" type="date" />
              </div>
              <div>
                <Label htmlFor="gender">{ur ? "جنس *" : "Gender *"}</Label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Contact Information */}
          <fieldset>
            <legend className="mb-4 border-b border-gold/30 pb-2 font-display text-xl text-gold-dark">
              {ur ? "رابطہ کی معلومات" : "Contact Information"}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">{ur ? "ای میل *" : "Email Address *"}</Label>
                <Input id="email" name="email" type="email" required maxLength={160} />
              </div>
              <div>
                <Label htmlFor="phone">{ur ? "فون نمبر *" : "Phone Number *"}</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  maxLength={40}
                  placeholder="+92 300 0000000"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">{ur ? "واٹس ایپ نمبر" : "WhatsApp Number"}</Label>
                <Input id="whatsapp" name="whatsapp" maxLength={40} placeholder="+92 300 0000000" />
              </div>
              <div>
                <Label htmlFor="country">{ur ? "ملک" : "Country"}</Label>
                <Input id="country" name="country" maxLength={80} placeholder="Pakistan" />
              </div>
              <div>
                <Label htmlFor="city">{ur ? "شہر" : "City"}</Label>
                <Input id="city" name="city" maxLength={80} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">{ur ? "پتہ" : "Full Address"}</Label>
                <Textarea id="address" name="address" rows={2} maxLength={300} />
              </div>
            </div>
          </fieldset>

          {/* Academic Information */}
          <fieldset>
            <legend className="mb-4 border-b border-gold/30 pb-2 font-display text-xl text-gold-dark">
              {ur ? "تعلیمی معلومات" : "Academic Information"}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="course_interest">
                  {ur ? "مطلوبہ کورس *" : "Course of Interest *"}
                </Label>
                <select
                  id="course_interest"
                  name="course_interest"
                  required
                  className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="preferred_time">
                  {ur ? "پسندیدہ کلاس وقت" : "Preferred Class Time"}
                </Label>
                <Input
                  id="preferred_time"
                  name="preferred_time"
                  maxLength={120}
                  placeholder="e.g. 7pm UK time / After Asr"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="previous_education">
                  {ur ? "پچھلی قرآنی تعلیم" : "Previous Quran Education"}
                </Label>
                <Textarea
                  id="previous_education"
                  name="previous_education"
                  rows={2}
                  maxLength={300}
                  placeholder="e.g. Noorani Qaida completed, Surah Baqarah memorized..."
                />
              </div>
            </div>
          </fieldset>

          {/* Guardian / Parent Info */}
          <fieldset>
            <legend className="mb-4 border-b border-gold/30 pb-2 font-display text-xl text-gold-dark">
              {ur ? "سرپرست / والدین کی معلومات" : "Guardian / Parent Information"}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="guardian_name">{ur ? "سرپرست کا نام" : "Guardian Name"}</Label>
                <Input id="guardian_name" name="guardian_name" maxLength={120} />
              </div>
              <div>
                <Label htmlFor="guardian_relation">{ur ? "رشتہ" : "Relation to Student"}</Label>
                <select
                  id="guardian_relation"
                  name="guardian_relation"
                  className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                </select>
              </div>
              <div>
                <Label htmlFor="guardian_phone">
                  {ur ? "سرپرست فون / واٹس ایپ" : "Guardian Phone / WhatsApp"}
                </Label>
                <Input id="guardian_phone" name="guardian_phone" maxLength={40} />
              </div>
            </div>
          </fieldset>

          <Button type="submit" variant="gold" className="w-full" size="lg" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : null}
            {ur ? "داخلہ فارم جمع کریں" : "Submit Admission Form"}
          </Button>
        </form>
      </div>
    </div>
  );
}
