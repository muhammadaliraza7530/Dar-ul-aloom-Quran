import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/remarks")({
  component: AdminRemarksPage,
});

function AdminRemarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Teacher Remarks</h1>
        <p className="mt-1 text-muted-foreground">Add progress reports and remarks.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">Remarks entry interface goes here.</p>
        <p className="text-sm mt-2">
          For now, records can be directly added via the Supabase dashboard in the `teacher_remarks`
          table.
        </p>
      </div>
    </div>
  );
}
