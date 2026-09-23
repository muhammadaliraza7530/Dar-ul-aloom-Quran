import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Button } from "@/components/ui/button";
import { LogOut, Users } from "lucide-react";
import { toast } from "sonner";
import { Route as AuthenticatedRoute } from "./route";

export const Route = createFileRoute("/_authenticated/parent")({
  component: ParentPortalPage,
});

function ParentPortalPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const navigate = useNavigate();
  const { user } = AuthenticatedRoute.useRouteContext();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(ur ? "آپ لاگ آؤٹ ہو گئے ہیں" : "Signed out successfully");
    navigate({ to: "/auth" });
  };

  const { data: children, isLoading } = useQuery({
    queryKey: ["parent-children"],
    queryFn: async () => {
      // Fetch linked children
      const { data: links } = await supabase
        .from("parent_student_links")
        .select("student_id")
        .eq("parent_id", user.id);
      
      if (!links || links.length === 0) return [];

      const studentIds = links.map(l => l.student_id);
      
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("id", studentIds);

      return profiles || [];
    },
  });

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="bg-card border-b border-border p-6 flex justify-between items-center">
        <h1 className="font-display text-2xl text-primary flex items-center gap-2">
          <Users className="size-6 text-gold-dark" />
          {ur ? "والدین پورٹل" : "Parent Portal"}
        </h1>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" /> {ur ? "لاگ آؤٹ" : "Sign Out"}
        </Button>
      </header>

      <main className="p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="font-display text-xl text-primary">{ur ? "آپ کے بچے" : "Your Children"}</h2>
          <p className="text-muted-foreground">
            {ur ? "بچوں کی تعلیمی رپورٹ اور حاضری دیکھیں۔" : "View progress and attendance for your linked children."}
          </p>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : children?.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
            No children linked to your account yet. Please contact administration.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {children?.map((child) => (
              <div key={child.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-xl text-primary">{child.full_name}</h3>
                <p className="text-sm text-gold-dark font-medium">{child.student_id || "ID Pending"}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button className="w-full" variant="outline">View Full Report</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
