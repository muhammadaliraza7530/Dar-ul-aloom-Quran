import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/attendance")({
  component: AdminAttendancePage,
});

function AdminAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Record Attendance</h1>
        <p className="mt-1 text-muted-foreground">Manage daily attendance for students.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">Attendance recording interface goes here.</p>
        <p className="text-sm mt-2">For now, records can be directly added via the Supabase dashboard in the `attendance_records` table.</p>
      </div>
    </div>
  );
}
