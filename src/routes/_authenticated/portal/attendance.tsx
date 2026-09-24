import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";

export const Route = createFileRoute("/_authenticated/portal/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user } = AuthenticatedRoute.useRouteContext();

  const { data: attendance, isLoading } = useQuery({
    queryKey: ["my-attendance"],
    queryFn: async () => {
      const { data } = await supabase
        .from("attendance_records")
        .select("*, enrollments(course_name)")
        .eq("student_id", user.id)
        .order("class_date", { ascending: false })
        .limit(30);
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "حاضری" : "Attendance"}</h1>
        <p className="mt-1 text-muted-foreground">
          {ur ? "حالیہ کلاسز کی حاضری کا ریکارڈ" : "Record of your recent classes"}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : attendance?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendance?.map((record) => (
                <tr key={record.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                    {new Date(record.class_date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                    {(record.enrollments as { course_name?: string } | null)?.course_name || "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${record.status === "present" ? "bg-green-100 text-green-800" : record.status === "absent" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{record.notes || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
