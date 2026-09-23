import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, XCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";

export const Route = createFileRoute("/_authenticated/pending")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Application Pending | Dar ul Uloom Online Quran Academy & Islamic Center Quran Academy & Islamic Center" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PendingPage,
});

function PendingPage() {
  const { language } = useLanguage();
  const ur = language === "ur";

  const { data: admission } = useQuery({
    queryKey: ["my-admission"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_admissions")
        .select("*")
        .maybeSingle();
      return data;
    },
  });

  const status = admission?.status ?? "pending";

  return (
    <div className="grid min-h-[70vh] place-items-center bg-secondary px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        {status === "rejected" ? (
          <>
            <XCircle className="mx-auto size-16 text-destructive" />
            <h1 className="mt-4 font-display text-3xl text-primary">
              {ur ? "درخواست مسترد" : "Application Not Approved"}
            </h1>
            <div className="mt-4 border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground">
              {admission?.rejection_reason
                ? <p><strong>Reason:</strong> {admission.rejection_reason}</p>
                : <p>Your application was not approved at this time.</p>}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Please contact us on WhatsApp for more information.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gold">
                <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                  <MessageCircle /> WhatsApp us
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admission-form">Re-apply</Link>
              </Button>
            </div>
          </>
        ) : status === "approved" ? (
          <>
            <CheckCircle2 className="mx-auto size-16 text-gold-dark" />
            <h1 className="mt-4 font-display text-3xl text-primary">
              {ur ? "مبارک ہو! منظور ہو گئے" : "Congratulations! Approved"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your application has been approved. Access your student portal below.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-6">
              <Link to="/portal">Go to My Portal</Link>
            </Button>
          </>
        ) : (
          <>
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold/10">
              <Clock className="size-10 text-gold-dark" />
            </div>
            <h1 className="mt-6 font-display text-3xl text-primary">
              {ur ? "درخواست زیر غور ہے" : "Application Under Review"}
            </h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              {ur
                ? "آپ کی داخلہ درخواست موصول ہو گئی ہے۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔"
                : "Your admission application has been received. Our team will review it and contact you soon, InshaAllah."}
            </p>
            <div className="mt-6 border border-gold/30 bg-gold/5 p-5 text-left text-sm text-muted-foreground">
              <p className="mb-2 font-semibold text-primary">What happens next?</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Admin reviews your application (usually within 24 hours)</li>
                <li>You receive confirmation via WhatsApp</li>
                <li>Your student ID and portal access are activated</li>
                <li>You are assigned to a course and teacher</li>
                <li>Classes begin at your preferred time</li>
              </ol>
            </div>
            {admission && (
              <div className="mt-4 rounded border border-border bg-card p-4 text-sm text-left">
                <p className="text-muted-foreground">
                  <strong className="text-primary">Name:</strong> {admission.full_name}
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-primary">Course:</strong> {admission.course_interest}
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-primary">Submitted:</strong> {new Date(admission.submitted_at).toLocaleDateString()}
                </p>
              </div>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gold">
                <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">
                  <MessageCircle /> {ur ? "واٹس ایپ کریں" : "WhatsApp us"}
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
