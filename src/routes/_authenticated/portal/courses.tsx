import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user } = AuthenticatedRoute.useRouteContext();

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("*").eq("student_id", user.id);
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "میرے کورسز" : "My Courses"}</h1>
        <p className="mt-1 text-muted-foreground">
          {ur
            ? "آپ کے فعال کورسز اور اساتذہ کی تفصیل"
            : "Your enrolled courses and teacher details"}
        </p>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : enrollments?.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
          <BookOpen className="mx-auto mb-4 size-12 opacity-20" />
          <p>No active courses found.</p>
          <p className="text-sm">
            You will see your course details here once assigned by the administration.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {enrollments?.map((course) => (
            <div key={course.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl text-primary">{course.course_name}</h3>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${course.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {course.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Teacher</dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {course.teacher_name || "Pending"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Schedule</dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {course.schedule || "To be decided"}
                  </dd>
                </div>
                {course.started_on && (
                  <div className="col-span-2">
                    <dt className="font-medium text-muted-foreground">Started On</dt>
                    <dd className="mt-1 text-foreground">
                      {new Date(course.started_on).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
