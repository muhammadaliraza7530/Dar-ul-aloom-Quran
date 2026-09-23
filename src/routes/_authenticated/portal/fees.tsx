import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { Route as AuthenticatedRoute } from "../route";

export const Route = createFileRoute("/_authenticated/portal/fees")({
  component: FeesPage,
});

function FeesPage() {
  const { language } = useLanguage();
  const ur = language === "ur";
  const { user } = AuthenticatedRoute.useRouteContext();

  const { data: fees, isLoading } = useQuery({
    queryKey: ["my-fees"],
    queryFn: async () => {
      const { data } = await supabase
        .from("fee_records")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "فیس کا ریکارڈ" : "Fee Records"}</h1>
        <p className="mt-1 text-muted-foreground">{ur ? "آپ کی ادا شدہ اور بقایا فیس کی تفصیل" : "Details of your paid and unpaid fees"}</p>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Period / Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Paid On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">Loading...</td></tr>
            ) : fees?.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">No fee records found.</td></tr>
            ) : (
              fees?.map((record) => (
                <tr key={record.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">{record.period}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">{record.currency} {record.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${record.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {record.paid_on ? new Date(record.paid_on).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
