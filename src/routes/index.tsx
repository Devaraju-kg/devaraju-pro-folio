import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Moon, Sun, Github, Linkedin, Mail, Phone, MapPin, Download, ArrowUp,
  Code2, Database, Brain, Link2, BarChart3, Wrench, Globe, Server,
  GraduationCap, Briefcase, FileText, Award, ExternalLink, Send,
  Sparkles, ChevronRight, Menu, X, Cpu, Shield, FileBadge2, Trophy,
} from "lucide-react";
import profilePhoto from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devaraju K G — Python Developer · AI · Blockchain · Analytics" },
      { name: "description", content: "Final-year MCA student building secure, intelligent, data-driven software with Python, AI, Blockchain and modern web technologies." },
      { property: "og:title", content: "Devaraju K G — Portfolio" },
      { property: "og:description", content: "Python · AI · Blockchain · Data Analytics" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------- Theme Toggle ---------- */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };
  return { dark, toggle };
}

/* ---------- Nav ---------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all ${scrolled ? "glass shadow-elegant" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-primary-foreground shadow-gold">
              D
            </span>
            <span className="hidden sm:inline">Devaraju<span className="text-gradient-gold">.</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/resume.pdf" className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90 transition">
              <Download className="h-4 w-4" /> Resume
            </a>
            <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-lg hairline hover:bg-muted transition">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden grid h-9 w-9 place-items-center rounded-lg hairline">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3"
            >
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm rounded-lg hover:bg-muted">
                  {n.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3 text-gold" /> {eyebrow}
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">
          {title}
        </h2>
        {sub && <p className="mt-3 text-muted-foreground text-base sm:text-lg">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ---------- Hero ---------- */
const ROLES = ["Python Developer", "AI Enthusiast", "Blockchain Developer", "Data Analytics Enthusiast"];

function Typer() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = ROLES[i];
    const speed = del ? 40 : 75;
    const t = setTimeout(() => {
      if (!del && text === current) { setTimeout(() => setDel(true), 1400); return; }
      if (del && text === "") { setDel(false); setI((i + 1) % ROLES.length); return; }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <span className="text-gradient-gold caret">{text}</span>;
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold-soft/15 blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_70%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to opportunities · MCA · Final Year
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Hi, I'm <br className="hidden sm:block" />
              <span className="text-gradient-gold">Devaraju K G</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 text-xl sm:text-2xl font-display font-medium min-h-[2em]">
              <Typer />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed">
              Building secure, intelligent and data-driven software solutions using
              <span className="text-foreground"> AI</span>,
              <span className="text-foreground"> Blockchain</span> and modern technologies.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-gold hover:translate-y-[-1px] transition">
                View Projects <ChevronRight className="h-4 w-4" />
              </a>
              <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-xl hairline px-5 py-3 text-sm font-medium hover:bg-muted transition">
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Contact Me <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex items-center gap-5 text-muted-foreground">
              <a href="https://github.com" aria-label="GitHub" className="hover:text-foreground transition"><Github className="h-5 w-5" /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-foreground transition"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:devaraju@example.com" aria-label="Email" className="hover:text-foreground transition"><Mail className="h-5 w-5" /></a>
              <div className="h-px flex-1 max-w-[120px] bg-border" />
              <span className="text-xs">Karnataka, India</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} y={0}>
          <div className="relative mx-auto w-[280px] sm:w-[340px] lg:w-[400px] aspect-square">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-gold via-gold-soft to-transparent opacity-60 blur-2xl animate-float" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold to-gold-soft p-[3px] gold-glow">
              <div className="h-full w-full rounded-full overflow-hidden bg-surface">
                <img
                  src={profilePhoto}
                  alt="Devaraju K G"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-2 -left-4 glass rounded-xl px-3 py-2 text-xs font-medium shadow-elegant"
            >
              <span className="text-gold">●</span> Python · AI
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -right-4 glass rounded-xl px-3 py-2 text-xs font-medium shadow-elegant"
            >
              <Shield className="inline h-3 w-3 text-gold" /> Blockchain
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
const TIMELINE = [
  { year: "2020–2023", title: "BCA", place: "Bachelor of Computer Applications", icon: GraduationCap },
  { year: "2023–2025", title: "MCA", place: "Master of Computer Applications · Final Year", icon: GraduationCap },
  { year: "2024", title: "Internship", place: "Data Analytics Intern", icon: Briefcase },
  { year: "2025", title: "Research Paper", place: "AI · Blockchain Voting · Accepted", icon: FileText },
  { year: "2025", title: "MATA RAKSHA", place: "AI-Enhanced Biometric Voting System", icon: Shield },
  { year: "Now", title: "Career", place: "Seeking SDE / Python roles", icon: Briefcase },
];

const STATS = [
  { label: "CGPA", value: "8.7", suffix: "/10" },
  { label: "Research Papers", value: "1" },
  { label: "Internships", value: "1" },
  { label: "Projects", value: "8", suffix: "+" },
  { label: "Languages", value: "5", suffix: "+" },
];

function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="About" title="Engineer at heart, researcher by curiosity" sub="Final-year MCA student combining software engineering, AI and blockchain to build solutions that are secure, scalable and meaningful." />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>I'm <span className="text-foreground font-medium">Devaraju K G</span>, a Python developer with a strong interest in applied AI, blockchain systems and data analytics. My academic and project work focuses on building <span className="text-foreground">secure, intelligent</span> systems — from biometric blockchain voting to credit risk analytics dashboards.</p>
              <p>I value clean engineering, careful research and software that actually solves problems. Currently exploring opportunities in software development, data and ML engineering roles.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl hairline p-4 bg-card/50">
                    <div className="text-2xl font-display font-bold text-gradient-gold">{s.value}{s.suffix}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="relative border-l-2 border-border ml-3 space-y-6">
              {TIMELINE.map((t, i) => {
                const Icon = t.icon;
                return (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute -left-[13px] grid h-6 w-6 place-items-center rounded-full bg-background border-2 border-gold">
                      <Icon className="h-3 w-3 text-gold" />
                    </span>
                    <div className="text-xs text-muted-foreground font-mono">{t.year}</div>
                    <div className="font-semibold mt-0.5">{t.title}</div>
                    <div className="text-sm text-muted-foreground">{t.place}</div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILLS = [
  { icon: Code2, title: "Programming", items: ["Python", "SQL", "Java"] },
  { icon: Globe, title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind"] },
  { icon: Server, title: "Backend", items: ["Flask", "FastAPI"] },
  { icon: Database, title: "Database", items: ["MySQL", "SQLite"] },
  { icon: Brain, title: "AI / ML", items: ["Pandas", "NumPy", "Scikit-Learn"] },
  { icon: Link2, title: "Blockchain", items: ["Solidity", "Web3.py", "Ganache"] },
  { icon: BarChart3, title: "Analytics", items: ["Power BI", "Excel", "DAX"] },
  { icon: Wrench, title: "Tools", items: ["Git", "GitHub", "VS Code"] },
];

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Skills" title="A focused, modern toolbox" sub="Hands-on across the stack — from data and ML to backend services, smart contracts and analytics dashboards." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="group h-full rounded-2xl hairline bg-card p-5 hover:gold-glow hover:-translate-y-1 transition-all duration-300">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-transparent text-gold mb-4 group-hover:scale-110 transition">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-3">{s.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
type Project = {
  title: string; tag: string; desc: string; features: string[]; stack: string[];
  links: { label: string; href: string; icon?: typeof Github }[];
  featured?: boolean; icon: typeof Shield;
};
const PROJECTS: Project[] = [
  {
    title: "MATA RAKSHA",
    tag: "Featured · AI + Blockchain",
    desc: "AI-Enhanced Biometric Blockchain Voting System combining fingerprint authentication, smart-contract-based vote storage and ML anomaly detection for transparent, tamper-proof elections.",
    features: ["Fingerprint Authentication", "Blockchain Voting", "AI Anomaly Detection", "Election Management", "Role-Based Login"],
    stack: ["Python", "Solidity", "Web3.py", "Ganache", "SQLite", "CustomTkinter"],
    links: [
      { label: "GitHub", href: "https://github.com", icon: Github },
      { label: "Architecture", href: "#" },
      { label: "Docs", href: "#" },
    ],
    featured: true,
    icon: Shield,
  },
  {
    title: "Credit Risk Analytics Dashboard",
    tag: "Data Analytics · Internship",
    desc: "Interactive Power BI dashboard for customer credit risk analysis with DAX measures, drilldowns and Python-powered preprocessing pipelines.",
    features: ["Customer segmentation", "Risk scoring", "DAX KPIs", "Drilldown filters"],
    stack: ["Power BI", "Python", "MySQL", "DAX", "Excel"],
    links: [{ label: "GitHub", href: "https://github.com", icon: Github }],
    icon: BarChart3,
  },
  {
    title: "Hotel Management System",
    tag: "Desktop App",
    desc: "Python desktop application for end-to-end hotel operations — reservations, billing, guest management and operational reports.",
    features: ["Reservations", "Billing", "Guest Management", "Reports"],
    stack: ["Python", "Tkinter", "SQLite"],
    links: [{ label: "GitHub", href: "https://github.com", icon: Github }],
    icon: Cpu,
  },
];

function Projects() {
  const [query, setQuery] = useState("");
  const filtered = PROJECTS.filter((p) =>
    (p.title + p.desc + p.stack.join(" ")).toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-xs">
              <Sparkles className="h-3 w-3 text-gold" /> Projects
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Selected work</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">Engineering, research and analytics projects shipped across academia and internship.</p>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="rounded-xl hairline bg-card px-4 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>

        {/* Hero project */}
        {filtered.filter(p => p.featured).map((p) => (
          <Reveal key={p.title}>
            <div className="relative overflow-hidden rounded-3xl hairline bg-gradient-to-br from-card via-card to-surface p-6 sm:p-10 mb-8 hover:gold-glow transition-all">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
              <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center relative">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-gold uppercase tracking-wider">
                    <p.icon className="h-4 w-4" /> {p.tag}
                  </div>
                  <h3 className="mt-3 text-3xl sm:text-4xl font-bold">{p.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-muted font-mono">{s}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} className="inline-flex items-center gap-1.5 rounded-lg hairline px-3.5 py-2 text-sm hover:bg-muted">
                        {l.icon ? <l.icon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden hairline bg-gradient-to-br from-surface to-background grid place-items-center">
                  <div className="text-center p-6">
                    <Shield className="h-16 w-16 text-gold mx-auto mb-4" />
                    <div className="font-display font-bold text-2xl text-gradient-gold">MATA RAKSHA</div>
                    <div className="text-sm text-muted-foreground mt-2">Biometric · Blockchain · AI</div>
                    <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                      {["Fingerprint", "Smart Contract", "Anomaly ML"].map(x => (
                        <div key={x} className="rounded-lg hairline py-2">{x}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.filter(p => !p.featured).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group h-full rounded-2xl hairline bg-card p-6 hover:-translate-y-1 hover:gold-glow transition-all">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-transparent text-gold">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs text-muted-foreground">{p.tag}</div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-muted font-mono">{s}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                      {l.icon ? <l.icon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.label}
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Research ---------- */
function Research() {
  return (
    <section id="research" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Research" title="Published research" sub="Bridging AI, biometrics and blockchain for trustworthy digital systems." />
        <Reveal>
          <div className="rounded-3xl hairline bg-card p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/10 blur-3xl rounded-full" />
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Conference Accepted
              </span>
              <span className="rounded-full hairline px-3 py-1 text-xs text-muted-foreground">Publication in Progress</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight max-w-3xl">
              AI-Assisted Biometric Blockchain-Based Secure Digital Voting System with Anomaly Detection
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-3xl">
              <span className="font-semibold text-foreground">Abstract — </span>
              We propose a hybrid voting framework that combines fingerprint biometric authentication, Ethereum-compatible smart contracts for immutable vote recording, and machine-learning-based anomaly detection to identify suspicious voting patterns in real time. The system aims to improve transparency, voter verifiability and resilience against tampering compared to traditional EVM-based deployments.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Biometrics", "Blockchain", "Smart Contracts", "Anomaly Detection", "E-Voting", "Security"].map(k => (
                <span key={k} className="text-xs px-2.5 py-1 rounded-md bg-muted font-mono">{k}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href="#" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><FileText className="h-4 w-4"/> Read Abstract</a>
              <a href="#" className="inline-flex items-center gap-1.5 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"><FileBadge2 className="h-4 w-4"/> Paper</a>
              <a href="#" className="inline-flex items-center gap-1.5 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"><Award className="h-4 w-4"/> Acceptance Certificate</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Experience" title="Internship" />
        <Reveal>
          <div className="rounded-3xl hairline bg-card p-6 sm:p-10 grid lg:grid-cols-[1fr_2fr] gap-8">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-primary-foreground shadow-gold mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="text-xs text-muted-foreground font-mono">2024</div>
              <h3 className="mt-1 text-xl font-bold">Data Analytics Intern</h3>
              <div className="text-sm text-muted-foreground">Tech Solutions · Remote</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Power BI", "Python", "MySQL", "DAX"].map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-muted font-mono">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Project · Credit Risk Analytics Dashboard</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Designed and delivered an interactive Power BI dashboard for retail credit-risk analysis. Built data ingestion pipelines in Python, modeled risk-scoring KPIs in DAX and created drilldown views for portfolio managers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Reduced manual reporting effort by automating ETL pipelines",
                  "Implemented customer segmentation and risk-tier KPIs",
                  "Delivered interactive drilldowns for portfolio analysts",
                ].map(a => (
                  <li key={a} className="flex gap-2"><ChevronRight className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" /> {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Achievements ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const ACHIEVEMENTS = [
  { icon: FileText, title: "Research Paper Accepted", desc: "AI + Blockchain voting framework accepted at international conference." },
  { icon: Trophy, title: "TCS NQT Qualified", desc: "Cleared the TCS National Qualifier Test." },
  { icon: Briefcase, title: "Internship Completed", desc: "Data analytics internship with shipped Power BI dashboard." },
  { icon: BarChart3, title: "Power BI Dashboard", desc: "Built and deployed a real-world risk-scoring dashboard." },
  { icon: Shield, title: "Blockchain Project", desc: "Designed end-to-end biometric blockchain voting prototype." },
];

function Achievements() {
  const counters = [
    { label: "Projects", to: 8, suffix: "+" },
    { label: "Research", to: 1 },
    { label: "Internships", to: 1 },
    { label: "Technologies", to: 20, suffix: "+" },
  ];
  return (
    <section id="achievements" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Achievements" title="Milestones so far" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {counters.map(c => (
            <Reveal key={c.label}>
              <div className="rounded-2xl hairline bg-card p-6 text-center">
                <div className="text-4xl font-display font-bold text-gradient-gold">
                  <Counter to={c.to} suffix={c.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="rounded-2xl hairline bg-card p-6 h-full hover:-translate-y-1 transition">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-transparent text-gold mb-3">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{a.title}</div>
                <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Contact" title="Let's build something" sub="Open to software engineering, Python, AI and data roles. Always happy to discuss research collaborations." />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <Reveal>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: "devaraju@example.com", href: "mailto:devaraju@example.com" },
                { icon: Phone, label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
                { icon: Linkedin, label: "LinkedIn", value: "/in/devarajukg", href: "https://linkedin.com" },
                { icon: Github, label: "GitHub", value: "@devarajukg", href: "https://github.com" },
                { icon: MapPin, label: "Location", value: "Karnataka, India", href: "#" },
              ].map(c => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-2xl hairline bg-card p-4 hover:gold-glow transition">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-transparent text-gold">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="rounded-3xl hairline bg-card p-6 sm:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs text-muted-foreground">Name</span>
                  <input required className="mt-1 w-full rounded-xl hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">Email</span>
                  <input type="email" required className="mt-1 w-full rounded-xl hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-muted-foreground">Subject</span>
                <input className="mt-1 w-full rounded-xl hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Message</span>
                <textarea required rows={5} className="mt-1 w-full rounded-xl hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90">
                {sent ? "Sent ✓" : <>Send Message <Send className="h-4 w-4" /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-gold to-gold-soft text-primary-foreground font-bold">D</span>
          <span className="font-display font-semibold">Devaraju K G</span>
        </div>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <a href="/resume.pdf" className="hover:text-foreground">Resume</a>
          <a href="https://github.com" className="hover:text-foreground">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-foreground">LinkedIn</a>
          <a href="mailto:devaraju@example.com" className="hover:text-foreground">Email</a>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Devaraju K G. All rights reserved.</div>
      </div>
    </footer>
  );
}

/* ---------- Scroll Progress + Back To Top ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div style={{ scaleX: w }} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-soft origin-left z-[60]" />;
}
function BackTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-gold hover:scale-110 transition"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

/* ---------- Main ---------- */
function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackTop />
    </div>
  );
}
