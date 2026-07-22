import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import horizonLogo from "@/assets/horizon-logo.jpeg.asset.json";
import { Menu, X } from "lucide-react";

const REGISTER_URL = "#register";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizon — Startup Pitch Event by IIC GTBIT" },
      {
        name: "description",
        content:
          "Horizon is a startup pitching event by IIC GTBIT where founders pitch to investors, secure funding, and meet mentors. Mid-August.",
      },
      { property: "og:title", content: "Horizon — Brewing Vibes Into Products" },
      {
        property: "og:description",
        content:
          "IIC GTBIT presents Horizon: a startup pitch event connecting founders, investors, and mentors. Mid-August.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: horizonLogo.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Horizon — Brewing Vibes Into Products" },
      { name: "twitter:image", content: horizonLogo.url },
    ],
  }),
  component: HorizonPage,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#speakers", label: "Speakers" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

const SPEAKERS = [
  { name: "Member 1", role: "Principal", org: "Horizon Ventures", bio: "Early-stage investor across FinTech and SaaS with a decade of seed calls under her belt." },
  { name: "Member 2", role: "Founder & CTO", org: "CloudSync", bio: "Serial founder. Built and sold two infra companies. Now angel investing in Indian deep tech." },
  { name: "Member 3", role: "Director", org: "IIC GTBIT", bio: "Academic and mentor guiding student ventures from campus prototypes to funded startups." },
  { name: "Member 4", role: "Partner", org: "Nexus VC", bio: "Leads consumer and marketplace bets. Portfolio spans D2C, edtech, and creator economy." },
  { name: "Member 5", role: "MD", org: "North Peak Capital", bio: "15 years across SaaS, deep-tech, and cross-border scale-ups. Board seats in three unicorns." },
  { name: "Member 6", role: "Head of Startups", org: "AWS India", bio: "Runs cloud credits and go-to-market programs for early-stage Indian founders." },
];

const TIMELINE = [
  { phase: "01", title: "Registrations Open", detail: "Founders submit their decks, one-pager, and short intro through the central portal." },
  { phase: "02", title: "Startup Selection", detail: "Our review committee shortlists ventures on scalability, novelty, and market fit." },
  { phase: "03", title: "Event Day", detail: "Doors open at GTBIT campus. Keynote from IIC and networking with the ecosystem." },
  { phase: "04", title: "Pitch Sessions", detail: "Shortlisted founders pitch live to investors, mentors, and the expert jury." },
  { phase: "05", title: "Winner Announcement", detail: "Awards, funding commitments, and incubation offers announced on the same stage." },
];

const FAQ = [
  { q: "What is Horizon?", a: "Horizon is the flagship startup pitching event by IIC GTBIT, where founders pitch to a panel of investors and mentors for funding, recognition, and support." },
  { q: "Who can attend?", a: "Founders, investors, students, mentors, and sponsors are all welcome. Anyone building or backing the next generation of startups belongs here." },
  { q: "How do I register?", a: "Hit any Register Now button on this page. You'll be redirected to our external registration portal to submit your details." },
  { q: "Is participation free?", a: "Yes. Attending and pitching at Horizon is free for shortlisted teams. Bring your ideas, we'll bring the room." },
  { q: "Where is the venue?", a: "The event is hosted at the GTBIT campus in New Delhi. Detailed venue instructions are shared post registration." },
  { q: "What should startups prepare?", a: "A 5-minute pitch deck covering problem, solution, traction, market, and ask. Q&A follows with the jury." },
  { q: "Can students attend?", a: "Absolutely. Horizon is designed to expose students to real pitching, investors, and the mechanics of building a company." },
  { q: "How are winners selected?", a: "A jury of investors and industry veterans scores pitches on innovation, scalability, execution, and clarity of vision." },
];

const SPONSORS = {
  title: ["Sponsor 1"],
  gold: ["Sponsor 2", "Sponsor 3"],
  silver: ["Sponsor 4", "Sponsor 5", "Sponsor 6"],
  community: ["Sponsor 7", "Sponsor 8", "Sponsor 9", "Sponsor 10"],
};

function HorizonPage() {
  return (
    <div id="home" className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-foreground selection:text-background">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <WhyParticipate />
      <Timeline />
      <Speakers />
      <Sponsors />
      <Faq />
      <RegisterCta />
      <Footer />
    </div>
  );
}

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group z-50">
          <div className="w-8 h-8 grid place-items-center bg-foreground text-background font-display text-lg leading-none pt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            H
          </div>
          <span className="font-display text-xl tracking-wider transition-colors duration-300 group-hover:text-white/80">HORIZON</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={REGISTER_URL}
            className="group hidden sm:inline-flex items-center gap-2.5 bg-foreground text-background px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          >
            Register
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href={REGISTER_URL}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all"
          >
            Register Now
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-24 pb-12 px-6 lg:px-10 grain-bg overflow-hidden">
      {/* Ambient background layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07] animate-grid-drift"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-t from-white/15 via-white/5 to-transparent rounded-full blur-[90px] animate-horizon-pulse" />
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-white/[0.06] blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-white/[0.04] blur-[140px] animate-float-alt" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9))]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto w-full my-auto flex flex-col items-center text-center">
        <div className="relative inline-flex items-center gap-3 px-4 py-1.5 border border-white/15 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6 sm:mb-8 animate-fade-up backdrop-blur-sm animate-float-subtle">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-white animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          IIC GTBIT Presents · Mid-August
        </div>

        <h1
          className="grain-text font-display leading-[0.82] tracking-tight animate-blur-in [animation-delay:120ms] select-none"
          style={{ fontSize: "clamp(3.5rem, 15vw, 12rem)" }}
        >
          HORI
          <br />
          ZON
        </h1>

        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up [animation-delay:400ms]">
          Brewing vibes into products. A startup pitch event where founders meet capital,
          mentors meet the next wave, and student ideas find their runway.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 animate-fade-up [animation-delay:550ms]">
          <a
            href={REGISTER_URL}
            className="group relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.4)] font-semibold"
          >
            <span className="relative z-10">Register Now</span>
            <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 border border-white/20 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 font-mono animate-fade-up [animation-delay:900ms] backdrop-blur-md">
          {[
            ["Date", "Mid-August"],
            ["Venue", "GTBIT, Delhi"],
            ["Format", "Live Pitch"],
            ["Entry", "Free"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background/90 p-4 sm:p-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 group">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground transition-colors">{k}</div>
              <div className="mt-1 font-display text-xl sm:text-2xl text-foreground group-hover:scale-105 transition-transform origin-left">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Innovation", "Funding", "Founders", "Investors", "Mentorship", "Pitch", "Scale", "Community"];
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden bg-background">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center font-display text-3xl md:text-5xl mx-8 tracking-wide group cursor-pointer">
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:text-white">{w}</span>
            <span className="mx-8 text-white/20 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(01) About</div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-none">
              Where ideas
              <br />
              find their
              <br />
              <span className="grain-text">horizon.</span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <Reveal delay={150}>
            <p className="transition-all duration-300 hover:text-foreground">
              Horizon is a startup pitching event organised by <span className="text-foreground font-semibold">IIC GTBIT</span> —
              the Institution's Innovation Council at Guru Tegh Bahadur Institute of Technology. Founders present
              their ideas to a curated panel of investors, operators, and mentors.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="transition-all duration-300 hover:text-foreground">
              The best startups walk away with more than applause: funding opportunities, mentorship,
              press, and a shot at real momentum. The rest walk away with a room full of new believers.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/10">
              {[
                ["30+", "Startups"],
                ["15+", "Investors"],
                ["1000+", "Attendees"],
              ].map(([n, l]) => (
                <div key={l} className="pt-4 group cursor-pointer">
                  <div className="font-display text-4xl md:text-5xl text-foreground transition-all duration-300 group-hover:scale-110 origin-left group-hover:text-white">{n}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2 group-hover:text-white/80 transition-colors">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyParticipate() {
  const groups = [
    {
      title: "For Founders",
      items: ["Pitch to real investors", "Funding opportunities", "Media exposure", "Mentor office hours", "Ecosystem networking"],
    },
    {
      title: "For Investors",
      items: ["Curated dealflow", "Meet founders early", "Vetted student ventures", "Ecosystem visibility"],
    },
    {
      title: "For Students",
      items: ["Learn startup pitching", "Meet entrepreneurs", "Build a network", "See fundraising up close", "Find co-founders"],
    },
  ];
  return (
    <section className="py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(02) Why Participate</div>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">Built for the ecosystem.</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {groups.map((g, idx) => (
            <Reveal key={g.title} delay={idx * 150} className="h-full">
              <div className="bg-background p-10 group animated-card h-full">
                <div className="font-display text-3xl mb-8 grain-text inline-block transition-transform duration-300 group-hover:scale-105 origin-left">{g.title}</div>
                <ul className="space-y-4">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1">
                      <span className="font-mono text-[10px] mt-1.5 text-white/40 group-hover:text-white transition-all group-hover:scale-125">◆</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(03) Timeline</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">The road to pitch day.</h2>
          </div>
        </Reveal>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" aria-hidden />
          <div className="space-y-16">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.phase} delay={i * 100}>
                <div
                  className={`relative grid md:grid-cols-2 gap-8 items-center group cursor-pointer ${i % 2 ? "md:[direction:rtl]" : ""}`}
                >
                  <div className="pl-12 md:pl-0 md:px-10 [direction:ltr] transition-transform duration-300 group-hover:translate-x-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                      Phase {t.phase}
                    </div>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl group-hover:text-white transition-colors">{t.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">{t.detail}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/40 bg-background flex items-center justify-center transition-all duration-300 group-hover:scale-150 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" aria-hidden>
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-white transition-colors" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(04) Speakers & Judges</div>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">The people in the room.</h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-xs uppercase tracking-widest">
              Investors, operators, and mentors joining Horizon 2026.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {SPEAKERS.map((s, idx) => (
            <Reveal key={s.name} delay={idx * 100} className="h-full">
              <article className="bg-background p-8 group animated-card h-full">
                <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden border border-white/10 bg-white/[0.02] grain-bg">
                  <div
                    className="absolute inset-0 grid place-items-center font-display text-[7rem] leading-none grain-text opacity-80 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500"
                    aria-hidden
                  >
                    {s.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-white/80 transition-colors">
                  {s.role} · {s.org}
                </div>
                <h3 className="mt-2 font-display text-3xl text-foreground group-hover:text-white transition-colors">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">{s.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  const tiers: [string, string[]][] = [
    ["Title Sponsor", SPONSORS.title],
    ["Gold Sponsors", SPONSORS.gold],
    ["Silver Sponsors", SPONSORS.silver],
    ["Community Partners", SPONSORS.community],
  ];
  return (
    <section id="sponsors" className="py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(05) Sponsors & Partners</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Powered by believers.</h2>
          </div>
        </Reveal>
        <div className="space-y-16">
          {tiers.map(([tier, list]) => (
            <div key={tier}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 text-center">
                {tier}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                {list.map((s) => (
                  <div
                    key={s}
                    className="bg-background aspect-[3/1] grid place-items-center px-4 hover:bg-white/[0.06] transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  >
                    <span className="font-display text-xl md:text-2xl tracking-wide text-center text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300">
                      {s.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="py-32 px-6 lg:px-10 border-b border-white/10">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">(06) FAQ</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Common questions.</h2>
          </div>
        </Reveal>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <details className="group py-6 cursor-pointer transition-all duration-300 hover:pl-2" open={i === 0}>
                <summary className="flex items-start justify-between gap-6 list-none select-none">
                  <span className="font-display text-xl md:text-2xl group-hover:text-white transition-colors">{f.q}</span>
                  <span className="font-mono text-xl text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-45 group-hover:scale-125">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl text-base">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterCta() {
  return (
    <section id="register" className="relative py-40 px-6 lg:px-10 border-b border-white/10 grain-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-8 animate-float-subtle">
            Mid-August · GTBIT, Delhi
          </div>
          <h2
            className="grain-text font-display leading-[0.85] tracking-tight select-none hover:scale-[1.02] transition-transform duration-500"
            style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
          >
            READY TO
            <br />
            PITCH?
          </h2>
          <p className="mt-10 max-w-2xl mx-auto text-lg text-muted-foreground">
            Applications close early August. Grab your slot, prep your deck, and step onto the Horizon stage.
          </p>
          <div className="mt-10">
            <a
              href={REGISTER_URL}
              className="group inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 font-mono text-sm uppercase tracking-[0.3em] hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] font-semibold"
            >
              <span>Register Now</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 grid place-items-center bg-foreground text-background font-display text-xl pt-1 leading-none transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">H</div>
              <span className="font-display text-2xl tracking-wide group-hover:text-white/90 transition-colors">HORIZON</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              An initiative by the Institution's Innovation Council, GTBIT. Brewing vibes into products.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</div>
            <a href="mailto:horizon@gtbit.ac.in" className="block text-sm hover:text-foreground text-muted-foreground transition-all duration-300 hover:translate-x-1">
              horizon@gtbit.ac.in
            </a>
            <p className="mt-2 text-sm text-muted-foreground">GTBIT Campus, New Delhi</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Follow</div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1">Twitter / X</a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div>© 2026 IIC GTBIT · Horizon</div>
          <div>Brewing vibes into products.</div>
        </div>
      </div>
    </footer>
  );
}
