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
      { title: "Unbuilt — Buildathon by DevX" },
      {
        name: "description",
        content:
          "Unbuilt is a 6-hour buildathon by DevX where student teams of 1–2 ship a working product and demo to judges. 4 November 2026.",
      },
      { property: "og:title", content: "Unbuilt — Brewing Vibes Into Products" },
      {
        property: "og:description",
        content:
          "DevX presents Unbuilt: a 6-hour buildathon where student teams ship, demo, and get mentored. 4 November 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: horizonLogo.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Unbuilt — Brewing Vibes Into Products" },
      { name: "twitter:image", content: horizonLogo.url },
    ],
  }),
  component: UnbuiltPage,
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
  { name: "Member 2", role: "Founder & CTO", org: "CloudSync", bio: "Serial founder. Built and sold two infra companies. Reviews architecture on the floor all day." },
  { name: "Member 3", role: "Director", org: "IIC GTBIT", bio: "Academic and mentor guiding student builders from campus prototypes to shipped products." },
  { name: "Member 4", role: "Partner", org: "Nexus VC", bio: "Leads consumer and marketplace bets. Portfolio spans D2C, edtech, and creator economy." },
  { name: "Member 5", role: "MD", org: "North Peak Capital", bio: "15 years across SaaS, deep-tech, and cross-border scale-ups. Board seats in three unicorns." },
  { name: "Member 6", role: "Head of Startups", org: "AWS India", bio: "Runs cloud credits and go-to-market programs for early-stage Indian founders." },
];

const TIMELINE = [
  { phase: "01", title: "Check-in", detail: "Doors open at 9:30 AM at GTBIT campus. Shortlisted teams collect badges and set up." },
  { phase: "02", title: "Kickoff Keynote", detail: "DevX opens the floor at 10:00 AM — rules, judging criteria, and the mentors for the day." },
  { phase: "03", title: "Build Sprint", detail: "Six hours on the clock. Teams ship while mentors make floor rounds." },
  { phase: "04", title: "Demo Day", detail: "Code freezes at 4:00 PM. Each team demos a working prototype to the jury." },
  { phase: "05", title: "Winner Announcement", detail: "Winners announced at 5:30 PM with prizes, credits, funding conversations, and incubation offers." },
];

const FAQ = [
  { q: "What is Unbuilt?", a: "Unbuilt is the flagship 6-hour buildathon by DevX, in collaboration with IIC GTBIT, where student teams build a working product from scratch and demo it to a panel of engineers, founders, and investors." },
  { q: "Who can attend?", a: "Students from any college can build, and anyone is welcome to attend — mentors, founders, and sponsors included. If you want to ship your first product, this is the room for you." },
  { q: "How do I register?", a: "Click any Register Now button to jump to the registration section on this page. Build slots are reviewed by our committee; attending is free and open to all." },
  { q: "Is participation free?", a: "Yes. Attending Unbuilt is free and open to everyone, and build slots are free for selected teams. Bring your laptop, we'll bring the power, the wifi, and the mentors." },
  { q: "Where is the venue?", a: "The event is hosted at the GTBIT campus in New Delhi. Detailed venue instructions are shared post registration." },
  { q: "What should I bring?", a: "A laptop, your dev environment, and a teammate — or come solo. Ideas, chargers, and caffeine help too." },
  { q: "How big can teams be?", a: "Teams are 1–2 people. Solo builders are welcome — come alone and pair up on the day if you like." },
  { q: "How are winners selected?", a: "A jury of engineers and founders scores builds on functionality, technical execution, originality, and real-world impact." },
];

const SPONSORS = {
  title: ["OpenAI"],
};

function UnbuiltPage() {
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
            U
          </div>
          <span className="font-display text-xl tracking-wider transition-colors duration-300 group-hover:text-white/80">UNBUILT</span>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-t from-white/15 via-white/5 to-transparent rounded-full blur-[90px] animate-unbuilt-pulse" />
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
          DevX Presents · 4 November 2026
        </div>

        <h1
          className="grain-text font-display leading-[0.82] tracking-tight animate-blur-in [animation-delay:120ms] select-none"
          style={{ fontSize: "clamp(3.5rem, 15vw, 12rem)" }}
        >
          UN
          <br />
          BUILT
        </h1>

        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up [animation-delay:400ms]">
          Brewing vibes into products. A six-hour buildathon where students from any college
          ship a real product, mentors meet the next wave, and ideas find their runway.
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
            ["Date", "4 Nov 2026"],
            ["Venue", "GTBIT, Delhi"],
            ["Duration", "6 Hours"],
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
  const items = ["Innovation", "Building", "Prototypes", "Mentorship", "Demo", "Prizes", "Scale", "Community"];
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
              get
              <br />
              <span className="grain-text">built.</span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <Reveal delay={150}>
            <p className="transition-all duration-300 hover:text-foreground">
              Unbuilt is a buildathon organised by <span className="text-foreground font-semibold">DevX</span>, in
              collaboration with the Institution's Innovation Council at Guru Tegh Bahadur Institute of Technology.
              Student teams of one or two turn an idea into a working prototype in six hours —
              open to builders from any college.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="transition-all duration-300 hover:text-foreground">
              The best builds walk away with more than applause: prizes, credits, mentorship,
              press, and a shot at real momentum. The rest walk away with something shipped, and a room full of new believers.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyParticipate() {
  const groups = [
    {
      title: "For Builders",
      items: ["Ship a real product", "Mentor office hours", "Prizes & cloud credits", "Learn new stacks", "Find a co-founder"],
    },
    {
      title: "For Mentors",
      items: ["Guide raw talent", "Spot early builders", "Office hours format", "Ecosystem visibility"],
    },
    {
      title: "For Students",
      items: ["Learn by building", "Meet engineers & founders", "Build a network", "See a real sprint", "Showcase your work"],
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
            <h2 className="mt-4 font-display text-5xl md:text-6xl">The road to demo day.</h2>
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
              Engineers, founders, and mentors joining Unbuilt 2026.
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
  const tiers: [string, string[]][] = [["Title Sponsor", SPONSORS.title]];
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
                    className={`bg-background aspect-[3/1] grid place-items-center px-4 hover:bg-white/[0.06] transition-all duration-300 group cursor-pointer hover:-translate-y-1 ${list.length === 1 ? "col-span-2 md:col-span-4" : ""}`}
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
            4 November 2026 · GTBIT, Delhi
          </div>
          <h2
            className="grain-text font-display leading-[0.85] tracking-tight select-none hover:scale-[1.02] transition-transform duration-500"
            style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
          >
            READY TO
            <br />
            BUILD?
          </h2>
          <p className="mt-10 max-w-2xl mx-auto text-lg text-muted-foreground">
            Six hours. One working product. Teams of 1–2 — grab your slot and ship on the Unbuilt stage.
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
              <div className="w-10 h-10 grid place-items-center bg-foreground text-background font-display text-xl pt-1 leading-none transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">U</div>
              <span className="font-display text-2xl tracking-wide group-hover:text-white/90 transition-colors">UNBUILT</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Organised by DevX in collaboration with the Institution's Innovation Council, GTBIT. Brewing vibes into products.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</div>
            <a href="mailto:devxgtbit@gmail.com" className="block text-sm hover:text-foreground text-muted-foreground transition-all duration-300 hover:translate-x-1">
              devxgtbit@gmail.com
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
          <div>© 2026 DevX · Unbuilt</div>
          <div>Brewing vibes into products.</div>
        </div>
      </div>
    </footer>
  );
}
