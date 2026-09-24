import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/students")({
  component: AdminStudentsPage,
});

function AdminStudentsPage() {
  const { data: students, isLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("admission_status", "approved")
        .order("full_name");
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-primary">Students List</h1>
          <p className="mt-1 text-muted-foreground">Manage all approved students.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                City/Country
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : students?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  No students found.
                </td>
              </tr>
            ) : (
              students?.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 text-sm font-semibold text-gold-dark">
                    {student.student_id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {student.full_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{student.phone}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {[student.city, student.country].filter(Boolean).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
