import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";
import { Star } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user } = AuthenticatedRoute.useRouteContext();

  const { data: remarks, isLoading } = useQuery({
    queryKey: ["my-remarks"],
    queryFn: async () => {
      const { data } = await supabase
        .from("teacher_remarks")
        .select("*, enrollments(course_name)")
        .eq("student_id", user.id)
        .order("remark_date", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">
          {ur ? "رپورٹ اور تبصرے" : "Progress & Remarks"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {ur
            ? "اساتذہ کی طرف سے آپ کی ماہانہ یا ہفتہ وار کارکردگی کی رپورٹ"
            : "Teacher remarks and progress evaluations"}
        </p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : remarks?.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No remarks or progress reports found.
          </div>
        ) : (
          remarks?.map((remark) => (
            <div key={remark.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <h3 className="font-display text-lg text-primary capitalize">
                    {remark.category} Report
                  </h3>
                  <p className="text-sm text-gold-dark font-medium">
                    {(remark.enrollments as { course_name?: string } | null)?.course_name || "-"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded">
                    {new Date(remark.remark_date).toLocaleDateString()}
                  </div>
                  {remark.rating && (
                    <div className="flex text-gold-dark">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${i < remark.rating! ? "fill-current" : "text-muted opacity-30"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-foreground">{remark.remark}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
