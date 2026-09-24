import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/lessons")({
  component: AdminLessonsPage,
});

function AdminLessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Record Lessons</h1>
        <p className="mt-1 text-muted-foreground">Log daily lessons and homework for students.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">Lesson recording interface goes here.</p>
        <p className="text-sm mt-2">
          For now, records can be directly added via the Supabase dashboard in the `lesson_records`
          table.
        </p>
      </div>
    </div>
  );
}
