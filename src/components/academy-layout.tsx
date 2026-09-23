import { Link, useRouterState } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const logoUrl = "/media/logo.jpeg";

type Language = "en" | "ur";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };

const LanguageContext = createContext<LanguageContextValue>({ language: "en", setLanguage: () => undefined });

export function useLanguage() {
  return useContext(LanguageContext);
}

const nav = [
  ["Home", "ہوم", "/"],
  ["About", "ہمارے بارے میں", "/about"],
  ["Courses", "کورسز", "/courses"],
  ["Teachers", "اساتذہ", "/teachers"],
  ["Pricing", "فیس", "/pricing"],
  ["Gallery", "گیلری", "/gallery"],
  ["Blog", "مضامین", "/blog"],
  ["Admission", "داخلہ فارم", "/admission"],
  ["Contact", "رابطہ", "/contact"],
] as const;


export function AcademyLayout({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={language === "ur" ? "font-urdu" : "font-sans"}>
        <div className="bg-noir text-ivory">
          <div className="mx-auto grid min-h-10 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 text-xs sm:flex sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-center gap-4">
              <a className="flex min-w-0 items-center gap-2 truncate hover:text-gold" href="tel:+923298503412">
                <Phone className="size-3.5 shrink-0" />
                <span dir="ltr">+92 329 8503412</span>
              </a>
              <span className="hidden text-ivory/60 sm:inline">{language === "ur" ? "دنیا بھر میں آن لائن کلاسز" : "Online classes worldwide"}</span>
            </div>
            <div className="flex shrink-0 items-center border border-gold/40 p-0.5">
              <button onClick={() => setLanguage("en")} className={`min-w-10 px-2 py-1 ${language === "en" ? "bg-gold text-noir" : "text-ivory"}`} aria-pressed={language === "en"}>EN</button>
              <button onClick={() => setLanguage("ur")} className={`min-w-10 px-2 py-1 font-urdu ${language === "ur" ? "bg-gold text-noir" : "text-ivory"}`} aria-pressed={language === "ur"}>اردو</button>
            </div>
          </div>
        </div>

        <header className="sticky top-0 z-50 border-b border-gold/25 bg-background/95 shadow-sm backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img src={logoUrl} alt="Dar ul Uloom Online Quran Academy & Islamic Center logo" className="size-16 shrink-0 rounded-full border-2 border-gold object-cover sm:size-20" width={80} height={80} />
              <div className="min-w-0">
                <p className="truncate font-display text-lg leading-tight text-primary sm:text-xl">Dar ul Uloom Online Quran Academy & Islamic Center</p>
                <p className="font-urdu text-lg text-gold-dark sm:text-2xl leading-normal mt-1">دارالعلوم آن لائن قرآن اکیڈمی اینڈ اسلامک سینٹر</p>
              </div>
            </Link>
            <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
              {nav.map(([en, ur, to]) => (
                <Link key={to} to={to} activeOptions={{ exact: to === "/" }} activeProps={{ className: "text-gold-dark border-b-2 border-gold" }} className="px-2.5 py-3 text-sm font-semibold text-foreground transition-colors hover:text-gold-dark">
                  {language === "ur" ? ur : en}
                </Link>
              ))}
            </nav>
            <Button asChild variant="gold" className="hidden lg:inline-flex"><a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">{language === "ur" ? "مفت کلاس بک کریں" : "Book Free Trial"}</a></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</Button>
          </div>
          {open && <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">{nav.map(([en, ur, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold">{language === "ur" ? ur : en}</Link>)}<Button asChild variant="gold" className="mt-4 w-full"><a href="https://wa.me/923298503412" target="_blank" rel="noreferrer">{language === "ur" ? "مفت کلاس بک کریں" : "Book Free Trial"}</a></Button></nav>}
        </header>

        <main>{children}</main>

        <footer className="border-t-4 border-gold bg-noir text-ivory">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
            <div><img src={logoUrl} alt="Academy emblem" className="mb-4 size-24 rounded-full border-2 border-gold" width={96} height={96} loading="lazy" /><h2 className="font-display text-2xl text-gold">Dar ul Uloom Online Quran Academy & Islamic Center</h2><p className="mt-2 max-w-sm text-sm leading-7 text-ivory/70">{language === "ur" ? "بچوں اور بڑوں کے لیے قرآن، عربی اور اسلامی تعلیم۔" : "Quran, Arabic and Islamic education for children and adults worldwide."}</p></div>
            <div><h2 className="font-display text-xl text-gold">{language === "ur" ? "فوری روابط" : "Quick links"}</h2><div className="mt-4 grid grid-cols-2 gap-3 text-sm">{nav.slice(1).map(([en, ur, to]) => <Link key={to} to={to} className="text-ivory/70 hover:text-gold">{language === "ur" ? ur : en}</Link>)}</div></div>
            <div><h2 className="font-display text-xl text-gold">{language === "ur" ? "رابطہ کریں" : "Get in touch"}</h2><div className="mt-4 space-y-3 text-sm text-ivory/70"><p dir="ltr">WhatsApp: 0329 8503412</p><p dir="ltr">WhatsApp: 0335 0909536</p><Button asChild variant="gold"><a href="https://wa.me/923298503412" target="_blank" rel="noreferrer"><MessageCircle />{language === "ur" ? "واٹس ایپ کریں" : "WhatsApp us"}</a></Button></div></div>
          </div>
          <div className="border-t border-ivory/10 px-4 py-5 text-center text-xs text-ivory/50">© 2026 Dar ul Uloom Online Quran Academy & Islamic Center</div>
        </footer>
        <a href="https://wa.me/923298503412" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="fixed bottom-5 end-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-xl transition-transform hover:scale-105"><MessageCircle className="size-6" /></a>
      </div>
    </LanguageContext.Provider>
  );
}
