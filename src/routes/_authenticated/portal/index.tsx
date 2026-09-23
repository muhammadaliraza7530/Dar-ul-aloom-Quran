import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { BookOpen, CalendarCheck, TrendingUp, CreditCard } from "lucide-react";
import { Route as AuthenticatedRoute } from "../route";

export const Route = createFileRoute("/_authenticated/portal/")({
  component: PortalDashboard,
});

function PortalDashboard() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { profile } = AuthenticatedRoute.useRouteContext();

  const { data: stats } = useQuery({
    queryKey: ["portal-stats"],
    queryFn: async () => {
      const { user } = (await supabase.auth.getUser()).data;
      if (!user) return null;

      const [enrollments, attendance, fees] = await Promise.all([
        supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("student_id", user.id).eq("status", "active"),
        supabase.from("attendance_records").select("id", { count: "exact", head: true }).eq("student_id", user.id).eq("status", "present"),
        supabase.from("fee_records").select("id", { count: "exact", head: true }).eq("student_id", user.id).eq("status", "unpaid"),
      ]);

      return {
        activeCourses: enrollments.count || 0,
        presentDays: attendance.count || 0,
        unpaidFees: fees.count || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">
          {ur ? `خوش آمدید، ${profile?.full_name}` : `Welcome, ${profile?.full_name}`}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {ur ? "آپ کا طالب علم ڈیش بورڈ" : "Student Dashboard Overview"}
          {profile?.student_id && <span className="ml-2 rounded bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold-dark">ID: {profile.student_id}</span>}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={BookOpen} 
          title={ur ? "فعال کورسز" : "Active Courses"} 
          value={stats?.activeCourses.toString() ?? "-"} 
        />
        <StatCard 
          icon={CalendarCheck} 
          title={ur ? "حاضری کے دن" : "Days Present"} 
          value={stats?.presentDays.toString() ?? "-"} 
        />
        <StatCard 
          icon={CreditCard} 
          title={ur ? "باقیہ فیس" : "Unpaid Fees"} 
          value={stats?.unpaidFees.toString() ?? "-"} 
          alert={stats?.unpaidFees ? stats.unpaidFees > 0 : false}
        />
        <StatCard 
          icon={TrendingUp} 
          title={ur ? "حالیہ پیش رفت" : "Recent Progress"} 
          value="View" 
        />
      </div>

      {/* Placeholders for recent activity or announcements could go here */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="font-display text-xl text-primary mb-4">{ur ? "تازہ ترین اعلانات" : "Recent Announcements"}</h2>
        <p className="text-sm text-muted-foreground">Check the announcements tab for the latest updates.</p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, alert }: { icon: any, title: string, value: string, alert?: boolean }) {
  return (
    <div className={`rounded-lg border ${alert ? "border-destructive/50 bg-destructive/5" : "border-border bg-card"} p-6 shadow-sm`}>
      <div className="flex items-center gap-4">
        <div className={`rounded-full p-3 ${alert ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold-dark"}`}>
          <Icon className="size-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
