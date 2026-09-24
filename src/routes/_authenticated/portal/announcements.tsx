import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { language } = useLanguage();
  const ur = language === "ur";

  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "اعلانات" : "Announcements"}</h1>
        <p className="mt-1 text-muted-foreground">
          {ur
            ? "اکیڈمی کی طرف سے اہم پیغامات اور اعلانات"
            : "Important messages and updates from the academy"}
        </p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : announcements?.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No announcements at this time.
          </div>
        ) : (
          announcements?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-card p-6 shadow-sm flex gap-4"
            >
              <div className="mt-1 flex-shrink-0 text-gold-dark">
                <Bell className="size-6" />
              </div>
              <div>
                <h3 className="font-display text-lg text-primary">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <p className="mt-3 text-sm text-foreground whitespace-pre-wrap">{item.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
