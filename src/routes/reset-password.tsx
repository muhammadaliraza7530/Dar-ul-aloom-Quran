import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a new password | Dar ul Uloom Online Quran Academy & Islamic Center" },
      { name: "description", content: "Choose a new password for your Dar ul Uloom Online Quran Academy & Islamic Center student portal account." },
      { property: "og:title", content: "Set a new password | Dar ul Uloom Online Quran Academy & Islamic Center" },
      { property: "og:description", content: "Choose a new password for your student portal account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("The two passwords do not match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. You are signed in.");
    navigate({ to: "/portal", replace: true });
  }

  return (
    <div className="pattern-band bg-secondary py-20">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="border border-border bg-card p-8 shadow-sm">
          <h1 className="font-display text-3xl text-primary">Set a new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Open this page from the reset link in your email, then choose a new password.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="password">New password</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : null}
              Update password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
