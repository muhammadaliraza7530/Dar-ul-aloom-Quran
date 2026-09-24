import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";
import { User, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user, profile } = AuthenticatedRoute.useRouteContext();

  const { data: admission } = useQuery({
    queryKey: ["admission-details"],
    queryFn: async () => {
      const { data } = await supabase
        .from("student_admissions")
        .select("*")
        .eq("user_id", user.id)
        .single();
      return data;
    },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "میری پروفائل" : "My Profile"}</h1>
        <p className="mt-1 text-muted-foreground">
          {ur ? "آپ کی ذاتی اور داخلہ کی معلومات" : "Your personal and admission details"}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-muted/50 p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-gold/20 text-xl font-bold text-gold-dark">
              {profile?.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{profile?.full_name}</h2>
              <p className="text-sm font-medium text-gold-dark">
                {profile?.student_id || "ID Pending"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="size-4" /> Email
              </dt>
              <dd className="mt-1 text-sm text-foreground">{profile?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="size-4" /> Phone
              </dt>
              <dd className="mt-1 text-sm text-foreground">{profile?.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="size-4" /> Father / Guardian
              </dt>
              <dd className="mt-1 text-sm text-foreground">{profile?.father_name || "-"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="size-4" /> Location
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {[profile?.city, profile?.country].filter(Boolean).join(", ") || "-"}
              </dd>
            </div>
            {admission && (
              <>
                <div className="sm:col-span-2 mt-4 border-t border-border pt-4">
                  <h3 className="text-lg font-medium text-foreground mb-4">Admission Details</h3>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Course Interest</dt>
                  <dd className="mt-1 text-sm text-foreground">{admission.course_interest}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Preferred Time</dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {admission.preferred_time || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {admission.date_of_birth
                      ? new Date(admission.date_of_birth).toLocaleDateString()
                      : "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                  <dd className="mt-1 text-sm text-foreground">{admission.gender || "-"}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
