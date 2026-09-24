import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminAdmissionsPage,
});

function AdminAdmissionsPage() {
  const queryClient = useQueryClient();

  const { data: admissions, isLoading } = useQuery({
    queryKey: ["admin-admissions"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_admissions")
        .select("*")
        .order("submitted_at", { ascending: false });
      return data || [];
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.rpc("approve_student", {
        p_user_id: userId,
        p_admin_notes: "Approved by Admin",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (newStudentId) => {
      toast.success(`Student approved! ID: ${newStudentId}`);
      queryClient.invalidateQueries({ queryKey: ["admin-admissions"] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to approve"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.rpc("reject_student", {
        p_user_id: userId,
        p_reason: "Rejected by Admin",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Application rejected.");
      queryClient.invalidateQueries({ queryKey: ["admin-admissions"] });
    },
    onError: (e: Error) => toast.error(e.message || "Failed to reject"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Admissions Management</h1>
        <p className="mt-1 text-muted-foreground">Review and approve new student applications.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                Status
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
            ) : admissions?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  No applications found.
                </td>
              </tr>
            ) : (
              admissions?.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{app.full_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {app.gender} • {app.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{app.course_interest}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{app.email}</div>
                    <div className="text-sm text-muted-foreground">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${app.status === "approved" ? "bg-green-100 text-green-800" : app.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    {app.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => approveMutation.mutate(app.user_id)}
                          disabled={approveMutation.isPending}
                        >
                          <CheckCircle className="mr-1 size-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => rejectMutation.mutate(app.user_id)}
                          disabled={rejectMutation.isPending}
                        >
                          <XCircle className="mr-1 size-4" /> Reject
                        </Button>
                      </div>
                    )}
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
