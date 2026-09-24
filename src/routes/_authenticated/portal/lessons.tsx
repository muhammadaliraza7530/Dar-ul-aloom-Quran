import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";

export const Route = createFileRoute("/_authenticated/portal/lessons")({
  component: LessonsPage,
});

function LessonsPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user } = AuthenticatedRoute.useRouteContext();

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["my-lessons"],
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_records")
        .select("*, enrollments(course_name)")
        .eq("student_id", user.id)
        .order("lesson_date", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">
          {ur ? "اسباق کا ریکارڈ" : "Lesson Records"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {ur ? "آپ کے پڑھے گئے اسباق کی تفصیل" : "Details of lessons covered in classes"}
        </p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : lessons?.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No lesson records found.
          </div>
        ) : (
          lessons?.map((lesson) => (
            <div key={lesson.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <h3 className="font-display text-lg text-primary">{lesson.topic || "Lesson"}</h3>
                  <p className="text-sm text-gold-dark font-medium">
                    {(lesson.enrollments as { course_name?: string } | null)?.course_name || "-"}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded">
                  {new Date(lesson.lesson_date).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <strong className="text-foreground">Surah/Chapter:</strong>{" "}
                  <span className="text-muted-foreground">{lesson.surah_or_chapter || "-"}</span>
                </div>
                <div>
                  <strong className="text-foreground">Page/Ayah:</strong>{" "}
                  <span className="text-muted-foreground">{lesson.page_or_ayah || "-"}</span>
                </div>
                {lesson.homework && (
                  <div className="sm:col-span-2">
                    <strong className="text-foreground">Homework:</strong>{" "}
                    <p className="mt-1 text-muted-foreground bg-secondary/50 p-2 rounded">
                      {lesson.homework}
                    </p>
                  </div>
                )}
                {lesson.teacher_note && (
                  <div className="sm:col-span-2">
                    <strong className="text-foreground">Teacher Note:</strong>{" "}
                    <p className="mt-1 text-muted-foreground bg-gold/5 border border-gold/20 p-2 rounded">
                      {lesson.teacher_note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
