import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock, Globe2, GraduationCap, MessageCircle, ShieldCheck, Star, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ConversionBand, FeatureList, SectionHeading } from "@/components/page-parts";
import { useLanguage } from "@/components/academy-layout";
import { benefits, courses, faqs, plans } from "@/lib/academy-content";
import heroImage from "@/assets/quran-learning-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Learn Quran Online | Dar-ul-Uloom Academy" },
    { name: "description", content: "Online Quran, Tajweed, Arabic and Islamic studies for kids and adults with qualified teachers and flexible one-to-one classes." },
    { property: "og:title", content: "Learn Quran Online | Dar-ul-Uloom Academy" },
    { property: "og:description", content: "Qualified online Quran teachers for children and adults worldwide." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }
  ], links: [{ rel: "canonical", href: "/" }] }), component: HomePage
});

function HomePage() {
  const { language } = useLanguage();
  return <>
    <section className="relative isolate min-h-[720px] overflow-hidden bg-primary text-primary-foreground lg:min-h-[760px]">
      <img src={heroImage} alt="Quran teacher guiding a young student in an online lesson" className="absolute inset-0 size-full object-cover object-[64%_center]" width={1600} height={1100} fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/90 to-noir/15" />
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:min-h-[760px]">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex border-s-2 border-gold ps-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{language === "ur" ? "قرآن سے جڑی زندگی" : "A life connected to the Quran"}</p>
          <h1 className="font-display text-5xl leading-[1.08] sm:text-6xl lg:text-7xl">{language === "ur" ? "مستند اساتذہ سے آن لائن قرآن سیکھیں" : "Learn Quran online from qualified teachers"}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">{language === "ur" ? "بچوں اور بڑوں کے لیے قرآن، عربی اور اسلامی تعلیم — دنیا میں کہیں سے بھی۔" : "Quran, Arabic and Islamic education for kids and adults — learn from anywhere in the world."}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="gold" size="lg"><Link to="/free-trial">{language === "ur" ? "مفت کلاس بک کریں" : "Book free trial"}</Link></Button><Button asChild variant="heroOutline" size="lg"><a href="https://wa.me/923298503412" target="_blank" rel="noreferrer"><MessageCircle />{language === "ur" ? "واٹس ایپ کریں" : "WhatsApp us"}</a></Button></div>
          <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-gold/30 py-5 text-center"><div><strong className="block text-2xl text-gold">1:1</strong><span className="text-xs text-primary-foreground/60">Personal classes</span></div><div className="border-x border-gold/30"><strong className="block text-2xl text-gold">14</strong><span className="text-xs text-primary-foreground/60">Courses</span></div><div><strong className="block text-2xl text-gold">Global</strong><span className="text-xs text-primary-foreground/60">Flexible times</span></div></div>
        </div>
      </div>
    </section>

    <section className="bg-noir py-6 text-ivory"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 text-center text-xs font-semibold uppercase tracking-wider sm:px-6 md:grid-cols-4"><span>UK · USA · Canada</span><span>Saudi Arabia · UAE</span><span>Qatar · Oman</span><span>Australia · Europe</span></div></section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Our Programs" title="Courses for every stage of learning" urdu="ہر سطح کے لیے قرآن کورسز" /><div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{courses.slice(0, 6).map((course, index) => <article key={course.slug} className="group bg-card p-7"><div className="mb-5 flex items-center justify-between"><BookOpen className="size-7 text-gold-dark" /><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="font-display text-2xl text-primary">{language === "ur" ? course.urdu : course.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{course.summary}</p><Link to="/course/$slug" params={{ slug: course.slug }} className="mt-5 inline-block text-sm font-bold text-gold-dark">{language === "ur" ? "مزید جانیں" : "Learn more"} →</Link></article>)}</div><div className="mt-8 text-center"><Button asChild variant="outline"><Link to="/courses">{language === "ur" ? "تمام 14 کورسز دیکھیں" : "Explore all 14 courses"}</Link></Button></div></div></section>

    <section className="bg-secondary py-20"><div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><SectionHeading eyebrow="Why Dar-ul-Uloom" title="Personal learning, rooted in care" urdu="ذاتی توجہ کے ساتھ معیاری تعلیم" centered={false} /><p className="mb-8 leading-7 text-muted-foreground">{language === "ur" ? "ہر طالب علم اپنی رفتار، وقت اور تعلیمی ضرورت کے مطابق سیکھتا ہے۔" : "Every student learns at their own pace, with focused guidance and a schedule built around their needs."}</p><FeatureList items={benefits} /></div><div className="grid grid-cols-2 gap-4">{[[GraduationCap,"Qualified teachers"],[UserRoundCheck,"Male & female"],[Clock,"Flexible timing"],[ShieldCheck,"Safe learning"]].map(([Icon,label]) => { const I = Icon as typeof GraduationCap; return <div key={label as string} className="border border-border bg-card p-7 text-center shadow-sm"><I className="mx-auto size-8 text-gold-dark"/><h3 className="mt-4 font-display text-xl">{label as string}</h3></div>})}</div></div></section>

    <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Simple process" title="How it works" urdu="تعلیم کا آسان طریقہ" /><div className="grid gap-8 md:grid-cols-4">{[["01","Book free trial","Fill out the registration form."],["02","Choose your course","Select the right learning path."],["03","Meet your teacher","Connect with your Quran instructor."],["04","Start learning","Join from anywhere at a suitable time."]].map(([num,title,desc]) => <div key={num} className="relative border-t-2 border-gold pt-6"><span className="font-display text-4xl text-gold/50">{num}</span><h3 className="mt-4 font-display text-xl text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p></div>)}</div></div></section>

    <section className="bg-primary py-20 text-primary-foreground"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading eyebrow="Flexible plans" title="Choose your learning plan" urdu="اپنا تعلیمی منصوبہ منتخب کریں" /><div className="grid gap-5 md:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`border p-8 ${index === 1 ? "border-gold bg-gold/10" : "border-primary-foreground/15"}`}><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{plan.name}</p><h3 className="mt-4 font-display text-3xl">Contact us for pricing</h3><ul className="mt-6 space-y-3 text-sm text-primary-foreground/75">{plan.features.map(f => <li key={f} className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-gold" />{f}</li>)}</ul><Button asChild variant={index === 1 ? "gold" : "heroOutline"} className="mt-8 w-full"><Link to="/pricing">View plan</Link></Button></article>)}</div></div></section>

    <section className="py-20"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2"><div><SectionHeading eyebrow="Student experience" title="Learning with purpose" urdu="مقصد کے ساتھ تعلیم" centered={false}/><div className="border-s-4 border-gold bg-card p-8 shadow-sm"><div className="mb-4 flex gap-1 text-gold">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current"/>)}</div><p className="font-display text-2xl leading-relaxed">“My children have been learning Quran online and we are very satisfied with the teacher and teaching method.”</p><p className="mt-5 text-sm text-muted-foreground">Example testimonial — replace with a verified parent review</p></div></div><div><SectionHeading eyebrow="Answers" title="Frequently asked questions" urdu="اکثر پوچھے گئے سوالات" centered={false}/><Accordion type="single" collapsible>{faqs.map(([q,a],i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="text-base">{q}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></div></section>
    <ConversionBand />
  </>;
}