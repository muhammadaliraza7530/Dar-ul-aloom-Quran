import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    // Check profile admission status
    const { data: profile } = await supabase
      .from("profiles")
      .select("admission_status, student_id")
      .eq("id", data.user.id)
      .maybeSingle();

    const admissionStatus = profile?.admission_status ?? "none";
    const isAdmin = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data: r }) => !!r);

    const isParent = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "parent")
      .maybeSingle()
      .then(({ data: r }) => !!r);

    // Admin always bypasses admission flow
    if (isAdmin) return { user: data.user, profile, isAdmin: true, isParent: false };
    // Parent bypasses student flow
    if (isParent) return { user: data.user, profile, isAdmin: false, isParent: true };

    const currentPath = location.pathname;
    const admissionPaths = ["/admission-form", "/pending"];

    // Redirect based on admission status
    if (admissionStatus === "none" && !admissionPaths.includes(currentPath)) {
      throw redirect({ to: "/admission-form" });
    }
    if (admissionStatus === "pending" && !admissionPaths.includes(currentPath)) {
      throw redirect({ to: "/pending" });
    }
    if (admissionStatus === "rejected" && !admissionPaths.includes(currentPath)) {
      throw redirect({ to: "/pending" });
    }
    // If approved but visiting admission/pending paths, redirect to portal
    if (admissionStatus === "approved" && admissionPaths.includes(currentPath)) {
      throw redirect({ to: "/portal" });
    }

    return { user: data.user, profile, isAdmin: false, isParent: false };
  },
  component: () => <Outlet />,
});
