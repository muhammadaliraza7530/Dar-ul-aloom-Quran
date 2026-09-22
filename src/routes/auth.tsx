import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useLanguage } from "@/components/academy-layout";
import { useSession } from "@/lib/use-session";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Student Login & Registration | Dar-ul-Uloom Online Quran Academy" },
      { name: "description", content: "Sign in to the Dar-ul-Uloom student portal to see your courses, class schedule, teacher notes and fee status, or create a new student account." },
      { property: "og:title", content: "Student Login & Registration | Dar-ul-Uloom" },
      { property: "og:description", content: "Access your Quran classes, schedule, progress notes and fee status in the student portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(60).optional(),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(1, "Enter your password").max(72),
});

function AuthPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [busy, setBusy] = useState<null | "in" | "up" | "google" | "reset">(null);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/portal", replace: true });
  }, [loading, session, navigate]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = signInSchema.safeParse({ email: form.get("email"), password: form.get("password") });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy("in");
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(null);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "Email or password is incorrect." : error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/portal", replace: true });
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = signUpSchema.safeParse({
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone") ?? "",
      country: form.get("country") ?? "",
      password: form.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy("up");
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone ?? "",
          country: parsed.data.country ?? "",
        },
      },
    });
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      setCheckEmail(true);
      toast.success("Account created. Please confirm your email address.");
      return;
    }
    toast.success("Account created. Welcome!");
    navigate({ to: "/portal", replace: true });
  }

  async function handleGoogle() {
    setBusy("google");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(null);
      toast.error("Google sign-in could not be completed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/portal", replace: true });
  }

  async function handleReset(email: string) {
    if (!email) {
      toast.error("Enter your email address first, then tap forgot password.");
      return;
    }
    setBusy("reset");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password reset link sent. Please check your inbox.");
  }

  return (
    <div className="pattern-band bg-secondary py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">Student Portal</p>
          <h1 className="font-display text-4xl text-primary sm:text-5xl">
            {language === "ur" ? "طلبہ پورٹل میں داخل ہوں" : "Sign in to your student portal"}
          </h1>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            {language === "ur"
              ? "اپنے کورسز، کلاس شیڈول، استاد کے ریمارکس، فیس کی تفصیل اور اعلانات دیکھیں۔"
              : "See your enrolled courses, class schedule, teacher notes, fee status, announcements and lesson materials in one place."}
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>• My courses and weekly class schedule</li>
            <li>• Progress notes from your teacher</li>
            <li>• Monthly fee and payment status</li>
            <li>• Announcements and downloadable materials</li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            {language === "ur" ? "ابھی طالب علم نہیں؟" : "Not a student yet?"}{" "}
            <Link to="/free-trial" className="font-bold text-gold-dark">
              {language === "ur" ? "مفت کلاس بک کریں" : "Book a free trial class"}
            </Link>
          </p>
        </div>

        <div className="border border-border bg-card p-6 shadow-sm sm:p-8">
          {checkEmail ? (
            <div className="text-center">
              <h2 className="font-display text-2xl text-primary">Confirm your email</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We sent a confirmation link to your inbox. Open it to activate your account, then come back and sign in.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setCheckEmail(false)}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{language === "ur" ? "لاگ ان" : "Sign in"}</TabsTrigger>
                <TabsTrigger value="signup">{language === "ur" ? "نیا اکاؤنٹ" : "Register"}</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" name="password" type="password" autoComplete="current-password" required maxLength={72} />
                  </div>
                  <Button type="submit" variant="gold" className="w-full" disabled={busy !== null}>
                    {busy === "in" ? <Loader2 className="animate-spin" /> : <LogIn />}
                    {language === "ur" ? "لاگ ان کریں" : "Sign in"}
                  </Button>
                  <button
                    type="button"
                    className="w-full text-center text-xs font-semibold text-muted-foreground underline"
                    onClick={(event) => {
                      const input = event.currentTarget.form?.elements.namedItem("email") as HTMLInputElement | null;
                      void handleReset(input?.value.trim() ?? "");
                    }}
                  >
                    Forgot your password?
                  </button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
                  <div>
                    <Label htmlFor="signup-name">Full name</Label>
                    <Input id="signup-name" name="fullName" required maxLength={100} placeholder="Muhammad Yasir" />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="signup-phone">WhatsApp number</Label>
                      <Input id="signup-phone" name="phone" maxLength={30} placeholder="+92 300 0000000" />
                    </div>
                    <div>
                      <Label htmlFor="signup-country">Country</Label>
                      <Input id="signup-country" name="country" maxLength={60} placeholder="Pakistan" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
                    <p className="mt-1 text-xs text-muted-foreground">At least 8 characters.</p>
                  </div>
                  <Button type="submit" variant="gold" className="w-full" disabled={busy !== null}>
                    {busy === "up" ? <Loader2 className="animate-spin" /> : <UserPlus />}
                    {language === "ur" ? "اکاؤنٹ بنائیں" : "Create account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          {!checkEmail && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={busy !== null}>
                {busy === "google" ? <Loader2 className="animate-spin" /> : null}
                Continue with Google
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
