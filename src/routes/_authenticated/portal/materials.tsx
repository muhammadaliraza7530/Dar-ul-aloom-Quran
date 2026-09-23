import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/academy-layout";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/materials")({
  component: MaterialsPage,
});

function MaterialsPage() {
  const { language } = useLanguage();
  const ur = language === "ur";

  const { data: materials, isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">{ur ? "مطالعاتی مواد" : "Learning Materials"}</h1>
        <p className="mt-1 text-muted-foreground">{ur ? "کتب، قاعدہ اور دیگر مفید مواد" : "Books, Qaida, and other useful resources"}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="text-muted-foreground col-span-full">Loading...</div>
        ) : materials?.length === 0 ? (
          <div className="col-span-full rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            No materials found.
          </div>
        ) : (
          materials?.map((item) => (
            <div key={item.id} className="rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-3">
                <FileText className="size-8 text-gold-dark" />
                <h3 className="font-display text-lg text-primary line-clamp-2">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground flex-1 line-clamp-3">{item.description}</p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-gold/20 hover:text-gold-dark transition-colors"
              >
                <Download className="size-4" />
                Download / View
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
