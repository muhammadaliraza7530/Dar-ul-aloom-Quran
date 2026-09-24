import { createFileRoute, Outlet, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  Users,
  FileCheck2,
  CalendarCheck,
  BookMarked,
  TrendingUp,
  CreditCard,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Route as AuthenticatedRoute } from "./route";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: ({ context }) => {
    // We already get isAdmin from the parent route context
    if (!context.isAdmin) {
      throw redirect({ to: "/portal" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate({ to: "/auth" });
  };

  const navItems = [
    { to: "/admin", icon: FileCheck2, label: "Admissions", exact: true },
    { to: "/admin/students", icon: Users, label: "Students" },
    { to: "/admin/attendance", icon: CalendarCheck, label: "Record Attendance" },
    { to: "/admin/lessons", icon: BookMarked, label: "Record Lessons" },
    { to: "/admin/remarks", icon: TrendingUp, label: "Add Remarks" },
    { to: "/admin/fees", icon: CreditCard, label: "Manage Fees" },
  ];

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          <div className="p-6 border-b border-border flex items-center gap-3">
            <ShieldAlert className="size-6 text-destructive" />
            <h2 className="font-display text-xl text-primary">Admin Panel</h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.exact ? { exact: true } : {}}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
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
              Sign Out
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
