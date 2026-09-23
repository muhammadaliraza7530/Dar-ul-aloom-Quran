import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/page-parts";
import { toast } from "sonner";
import { Send, GraduationCap } from "lucide-react";
import { courses } from "@/lib/academy-content";
import { sendEmailNotification } from "@/lib/email";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Admission Form | Dar ul Uloom Online Quran Academy & Islamic Center" },
      { name: "description", content: "Enroll in Dar ul Uloom Online Quran Academy & Islamic Center. Submit your admission details." },
      { property: "og:title", content: "Admission Form | Dar ul Uloom Online Quran Academy & Islamic Center" },
    ],
  }),
  component: AdmissionPage,
});

function AdmissionPage() {
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      studentName: String(formData.get("studentName") || ""),
      parentName: String(formData.get("parentName") || ""),
      age: String(formData.get("age") || ""),
      gender: String(formData.get("gender") || ""),
      location: String(formData.get("location") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      email: String(formData.get("email") || ""),
      course: String(formData.get("course") || ""),
      timing: String(formData.get("timing") || ""),
      previousEducation: String(formData.get("previousEducation") || ""),
      message: String(formData.get("message") || ""),
    };

    // 1. WhatsApp Delivery
    const waText = `*New Admission Application* 🎓\n\n` +
      `*Student Name:* ${data.studentName}\n` +
      `*Parent/Guardian:* ${data.parentName}\n` +
      `*Age:* ${data.age}\n` +
      `*Gender:* ${data.gender}\n` +
      `*Country/City:* ${data.location}\n` +
      `*WhatsApp:* ${data.whatsapp}\n` +
      `*Email:* ${data.email}\n` +
      `*Selected Course:* ${data.course}\n` +
      `*Preferred Timing:* ${data.timing}\n` +
      `*Previous Education:* ${data.previousEducation}\n\n` +
      `*Additional Message:* ${data.message}`;

    // 2. Email Delivery (Backend)
    try {
      await sendEmailNotification({
        type: "Admission",
        details: data
      });
    } catch (e) {
      console.error("Email notification failed:", e);
    }

    // 3. WhatsApp Delivery (Frontend redirect)
    window.open(waUrl, '_blank');

    toast.success("Application details generated! Opening WhatsApp...");
    setBusy(false);
    form.reset();
  }

  return (
    <>
      <PageHero
        title="Student Admission"
        urdu="طالب علم کا داخلہ"
        description="Fill out the form below to enroll. We will contact you to finalize the schedule."
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="mb-8 flex items-center gap-4 border-b border-border pb-6">
              <div className="rounded-full bg-gold/10 p-4 text-gold-dark">
                <GraduationCap className="size-8" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-primary">Application Form</h2>
                <p className="text-sm text-muted-foreground">Submit your details to our administration securely.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input id="studentName" name="studentName" required placeholder="Full name of student" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent / Guardian Name *</Label>
                  <Input id="parentName" name="parentName" required placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" name="age" required placeholder="e.g., 10" type="number" min="4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Country / City *</Label>
                  <Input id="location" name="location" required placeholder="e.g., London, UK" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input id="whatsapp" name="whatsapp" required placeholder="With country code (+44...)" type="tel" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" required placeholder="your.email@example.com" type="email" />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course">Selected Course *</Label>
                  <select
                    id="course"
                    name="course"
                    required
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select a course...</option>
                    {courses.map(c => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="timing">Preferred Class Timing</Label>
                  <Input id="timing" name="timing" placeholder="e.g., Weekends morning, Weekdays 5 PM" />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="previousEducation">Previous Quran / Islamic Education</Label>
                  <Textarea id="previousEducation" name="previousEducation" placeholder="Briefly describe if the student has learned Qaida or Quran before..." />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Additional Message / Requirements</Label>
                  <Textarea id="message" name="message" placeholder="Any special requests or details we should know?" className="min-h-[100px]" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto" disabled={busy}>
                  <Send className="mr-2 size-4" />
                  Submit Application
                </Button>
                <p className="mt-4 text-xs text-muted-foreground text-center sm:text-left">
                  By submitting, your details will be sent directly to our administration via WhatsApp and Email for immediate processing.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
