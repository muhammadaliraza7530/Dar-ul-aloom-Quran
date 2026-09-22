import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/portal")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Student Portal | Dar-ul-Uloom Online Quran Academy" },
      { name: "description", content: "View your enrolled courses, class schedule, teacher notes, fee records and announcements." },
      { property: "og:title", content: "Student Portal | Dar-ul-Uloom" },
      { property: "og:description", content: "Your courses, schedule, progress notes and fee records in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalPage,
});

function usePortalData() {
  return useQuery({
    queryKey: ["portal"],
    queryFn: async () => {
      const [profile, enrollments, notes, fees, announcements, materials] = await Promise.all([
        supabase.from("profiles").select("*").maybeSingle(),
        supabase.from("enrollments").select("*").order("started_on", { ascending: false }),
        supabase.from("progress_notes").select("*").order("lesson_date", { ascending: false }),
        supabase.from("fee_records").select("*").order("period", { ascending: false }),
        supabase.from("announcements").select("*").order("created_at", { ascending: false }),
        supabase.from("materials").select("*").order("created_at", { ascending: false }),
      ]);
      return {
        profile: profile.data,
        enrollments: enrollments.data ?? [],
        notes: notes.data ?? [],
        fees: fees.data ?? [],
        announcements: announcements.data ?? [],
        materials: materials.data ?? [],
      };
    },
  });
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-card p-7 shadow-sm">
      <h2 className="font-display text-2xl text-primary">{title}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

function PortalPage() {
  const navigate = useNavigate();
  const { data, isLoading } = usePortalData();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading || !data) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-gold-dark" />
      </div>
    );
  }

  return (
    <div className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-primary">Student portal</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome{data.profile?.full_name ? `, ${data.profile.full_name}` : ""}.
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Panel title="My courses">
            {data.enrollments.length === 0 ? <p>No courses yet. Your teacher will add them after your first class.</p> : data.enrollments.map((row) => (
              <div key={row.id} className="border-s-2 border-gold ps-4">
                <p className="font-semibold text-primary">{row.course_name}</p>
                <p>{row.schedule ?? "Schedule to be confirmed"} · {row.teacher_name ?? "Teacher to be assigned"} · {row.status}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Progress notes">
            {data.notes.length === 0 ? <p>No notes yet.</p> : data.notes.map((row) => (
              <div key={row.id} className="border-s-2 border-gold ps-4">
                <p className="font-semibold text-primary">{row.title}</p>
                <p>{row.note}</p>
                <p className="text-xs">{row.lesson_date}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Fee records">
            {data.fees.length === 0 ? <p>No fee records yet.</p> : data.fees.map((row) => (
              <div key={row.id} className="flex justify-between border-b border-border pb-2">
                <span>{row.period}</span>
                <span className="font-semibold text-primary">{row.amount} {row.currency} · {row.status}</span>
              </div>
            ))}
          </Panel>

          <Panel title="Announcements">
            {data.announcements.length === 0 ? <p>No announcements.</p> : data.announcements.map((row) => (
              <div key={row.id} className="border-s-2 border-gold ps-4">
                <p className="font-semibold text-primary">{row.title}</p>
                <p>{row.body}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Learning materials">
            {data.materials.length === 0 ? <p>No materials shared yet.</p> : data.materials.map((row) => (
              <p key={row.id}>
                <a className="font-semibold text-gold-dark hover:underline" href={row.url} target="_blank" rel="noreferrer">{row.title}</a>
                {row.description ? ` — ${row.description}` : ""}
              </p>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
