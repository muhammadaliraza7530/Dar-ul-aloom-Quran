import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarCheck,
  BookMarked,
  TrendingUp,
  CreditCard,
  Bell,
  Files,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/portal")({
  component: PortalLayout,
});

function PortalLayout() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(ur ? "آپ لاگ آؤٹ ہو گئے ہیں" : "Signed out successfully");
    navigate({ to: "/auth" });
  };

  const navItems = [
    { to: "/portal", icon: LayoutDashboard, label: ur ? "ڈیش بورڈ" : "Dashboard", exact: true },
    { to: "/portal/profile", icon: User, label: ur ? "پروفائل" : "Profile" },
    { to: "/portal/courses", icon: BookOpen, label: ur ? "کورسز" : "Courses" },
    { to: "/portal/attendance", icon: CalendarCheck, label: ur ? "حاضری" : "Attendance" },
    { to: "/portal/lessons", icon: BookMarked, label: ur ? "اسباق" : "Lesson Records" },
    { to: "/portal/progress", icon: TrendingUp, label: ur ? "رپورٹ" : "Progress & Remarks" },
    { to: "/portal/fees", icon: CreditCard, label: ur ? "فیس" : "Fee Records" },
    { to: "/portal/announcements", icon: Bell, label: ur ? "اعلانات" : "Announcements" },
    { to: "/portal/materials", icon: Files, label: ur ? "مواد" : "Materials" },
  ];

  return (
    <div className="flex min-h-screen bg-secondary/50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-xl text-primary">
              {ur ? "طالب علم پورٹل" : "Student Portal"}
            </h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.exact ? { exact: true } : {}}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-gold/10 [&.active]:text-gold-dark"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 size-4" />
              {ur ? "لاگ آؤٹ" : "Sign Out"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
