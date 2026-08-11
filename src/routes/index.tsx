import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  Moon, Sun, Github, Linkedin, Mail, Phone, MapPin, Download, ArrowUp,
  Code2, Database, Brain, Link2, BarChart3, Wrench, Globe, Monitor, Server,
  GraduationCap, Briefcase, FileText, Award, ExternalLink, Send,
  Sparkles, ChevronRight, Menu, X, Cpu, Shield, FileBadge2, Trophy, ShieldCheck,
} from "lucide-react";
import profilePhoto from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devaraju K G — Python Developer · AI · Blockchain · Analytics" },
      { name: "description", content: "MCA graduate specializing in Python development, Artificial Intelligence, Blockchain, biometric systems, and Data Analytics." },
      { property: "og:title", content: "Devaraju K G — Python Developer & AI/Blockchain Enthusiast" },
      { property: "og:description", content: "Python · AI/ML · Blockchain · Biometric Systems · Data Analytics" },
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
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-primary-foreground shadow-gold">
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
const ROLES = ["Python Developer", "AI & Machine Learning Enthusiast", "Blockchain Developer", "Data Analytics Enthusiast", "Backend Developer", "Open to Software Engineer Roles"];

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
              Available for Full-Time Software Engineer Roles
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
              MCA graduate from RNS Institute of Technology, Bengaluru, focused on building practical software solutions using
              <span className="text-foreground"> Python</span>,
              <span className="text-foreground"> Artificial Intelligence</span>,
              <span className="text-foreground"> Blockchain</span>, and
              <span className="text-foreground"> Data Analytics</span>. Experienced in developing secure applications, AI-assisted systems, blockchain-based solutions, and interactive business intelligence dashboards.
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
              <a href="https://github.com/Devaraju-kg" aria-label="GitHub" className="hover:text-foreground transition"><Github className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/devaraju-k-g/" aria-label="LinkedIn" className="hover:text-foreground transition"><Linkedin className="h-5 w-5" /></a>
              <a href="mailto:devarajukg.dev@gmail.com" aria-label="Email" className="hover:text-foreground transition"><Mail className="h-5 w-5" /></a>
              <div className="h-px flex-1 max-w-[120px] bg-border" />
              <span className="text-xs">Bengaluru, Karnataka, India</span>
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
              <span className="text-gold">●</span> Python • AI • Backend
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
  { year: "2021–2024", title: "BCA", place: "Bachelor of Computer Applications, Bangalore University", icon: GraduationCap },
  { year: "2024", title: "Internship", place: "AI – Data Quality Analyst Intern, Disciples Corporate School", icon: Briefcase },
  { year: "2024–2026", title: "MCA", place: "Master of Computer Applications, RNS Institute of Technology", icon: GraduationCap },
  { year: "2026", title: "Internship", place: "Data Analytics Intern, Anudip Foundation", icon: Briefcase },
  { year: "2026", title: "Research Paper", place: "AI-Assisted Biometric Blockchain-Based Secure Digital Voting System with Anomaly Detection · Accepted", icon: FileText },
  { year: "Now", title: "Career", place: "Open for Software Development Roles", icon: Briefcase },
];

const STATS = [
  { label: "CGPA", value: "8.7", suffix: "/10" },
  { label: "Research Papers", value: "1" },
  { label: "Internships", value: "2" },
  { label: "Major Projects", value: "4", suffix: "+" },
  { label: "Technologies", value: "20", suffix: "+" },
  { label: "Programming Languages", value: "5", suffix: "+" },
];

function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="About" title="Building Intelligent Software for Real-World Problems" sub="I am an MCA graduate from RNS Institute of Technology, Bengaluru, with a strong interest in Python development, Artificial Intelligence, Blockchain, Backend Development, and Data Analytics. I enjoy building practical software solutions that combine modern technologies with real-world problem solving." />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>My projects include <span className="text-foreground">secure biometric authentication, blockchain-based voting systems, AI-assisted applications, business intelligence dashboards,</span> and<span className="text-foreground">desktop software solutions.</span> I focus on writing reliable, maintainable software and continuously expanding my skills across software development and emerging technologies.</p>
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
  {
    icon: Code2,
    title: "Programming",
    items: ["Python", "C", "SQL", "Java", "JavaScript"],
  },
  {
    icon: Globe,
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    icon: Monitor,
    title: "Application Development",
    items: ["Python", "Tkinter", "CustomTkinter", "OOP"],
  },
  {
    icon: Database,
    title: "Database",
    items: ["MySQL", "SQLite", "DBMS"],
  },
  {
    icon: Brain,
    title: "AI / ML",
    items: ["Artificial Intelligence", "Machine Learning", "Pandas", "NumPy", "Scikit-Learn", "OpenCV"],
  },
  {
    icon: Link2,
    title: "Blockchain",
    items: ["Solidity", "Web3.py", "Ganache", "Smart Contracts", "Blockchain"],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: ["Power BI", "Excel", "DAX", "Power Query", "Data Analysis", "Data Visualization"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Skills" title="Technical Skills & Technologies" sub="Hands-on experience in software development, AI, blockchain, backend systems, databases, and business intelligence using modern tools and technologies." />
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
  title: string; subtitle?: string; tag: string; desc: string; features: string[]; stack: string[];
  links: { label: string; href: string; icon?: typeof Github }[];
  featured?: boolean; icon: typeof Shield;
};
const PROJECTS: Project[] = [
  {
    title: "MATA RAKSHA",
    tag: "Flagship Project • AI + Blockchain + Biometric",
    subtitle: "AI-Enhanced Biometric Blockchain Voting System",
    desc: "Developed a secure desktop-based electronic voting system integrating biometric fingerprint authentication, blockchain-based vote recording, smart contracts, and AI-assisted analysis. The system supports voter registration, fingerprint enrollment and verification, election creation, candidate management, secure vote casting, result generation, audit logs, vote history, and district-wise elections.",
    features: [
      "Fingerprint Authentication",
      "Fingerprint Enrollment",
      "Blockchain Vote Storage",
      "Smart Contract Integration",
      "Role-Based Access Control",
      "Election Management",
      "Candidate Management",
      "Secure Vote Casting",
      "Result Generation",
      "Audit Logs",
      "Vote History",
      "District-wise Elections"
],
    stack: [
      "Python",
      "CustomTkinter",
      "SQLite",
      "SecuGen",
      "Web3.py",
      "Ganache",
      "Solidity",
      "Scikit-learn"
],
    links: [
      { label: "GitHub", href: "https://github.com/Devaraju-kg/MATA-RAKSHA", icon: Github },
      { label: "Architecture", href: "/architecture.png" },
      { label: "Docs", href: "/mata_raksha_report.pdf" },
    ],
    featured: true,
    icon: Shield,
  },
  {
    title: "Credit Risk Analytics Dashboard",
    tag: "Data Analytics • Business Intelligence",
    desc: "Developed an interactive credit risk analytics dashboard to analyze customer profiles, loan characteristics, repayment behavior, and credit risk patterns using data analysis and business intelligence techniques.",
    features: ["Customer segmentation", "Credit Risk Analysis", "KPI Development", "Interactive Dashboards", "DAX Measures", "Power Query", "Data Cleaning"],
    stack: ["Power BI", "Python", "MySQL", "DAX", "Excel", "Power Query"],
    links: [{ label: "GitHub", href: "https://github.com/Devaraju-kg/Credit-Risk-Analytics-Dashboard", icon: Github }],
    icon: BarChart3,
  },
    {
    title: "Netflix Power BI Dashboard",
    tag: "Data Analytics • Power BI",
    desc: "Developed an interactive Netflix content analytics dashboard to explore movies and TV shows using content type, genre, country, rating, release year, and other attributes.",
    features: [
      "Content Analysis",
      "Genre Analysis",
      "Country Analysis",
      "Release Year Trends",
      "Interactive Visualizations",
      "KPI Analysis"
    ],
    stack: [
      "Power BI",
      "Excel",
      "Power Query",
      "DAX",
      "Data Visualization"
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Devaraju-kg/Netflix_Powerbi_Dashboard",
        icon: Github
      }
    ],
    icon: BarChart3,
  },
  {
    title: "Smart Hotel Management System",
    tag: "Desktop Application",
    desc: "Developed a desktop-based hotel management application for room booking, guest management, billing, staff administration, and reporting with an intuitive user interface.",
    features: ["Room Booking", "Billing", "Guest Management", "Reports", "Authentication", "Database Management"],
    stack: ["Python", "Tkinter", "SQLite", "OOP"],
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
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Featured Projects</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">A collection of software engineering, AI, blockchain, and data analytics projects demonstrating practical problem-solving and real-world application development.</p>
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
                  <h3 className="mt-3 text-3xl sm:text-4xl font-bold">
                  {p.title}
                  {p.subtitle && (
                    <span className="block mt-1 text-base sm:text-lg font-normal text-muted-foreground">
                    {p.subtitle}
                    </span>
                  )}
                  </h3>
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
                    <div className="text-sm text-muted-foreground mt-2">AI • Biometric • Blockchain</div>
                    <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                      {["Fingerprint", "Smart Contract", "Blockchain", "AI Detection"].map(x => (
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

        <SectionTitle
          eyebrow="Research"
          title="Research Contribution"
          sub="Exploring the integration of Artificial Intelligence, Biometrics and Blockchain for secure digital voting."
        />

        <Reveal>
          <div className="rounded-3xl hairline bg-card p-6 sm:p-10 relative overflow-hidden">

            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/10 blur-3xl rounded-full" />

            <div className="flex flex-wrap items-center gap-2 mb-5">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Research Paper
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold leading-tight max-w-4xl">
              AI-Assisted Biometric Blockchain-Based Secure Digital Voting System with Anomaly Detection
            </h3>

            <p className="mt-5 text-muted-foreground leading-relaxed max-w-4xl">
              <span className="font-semibold text-foreground">
                Research Summary —
              </span>{" "}
              This research extends the MATA RAKSHA project by integrating
              fingerprint biometric authentication, blockchain-based secure vote
              recording and AI-driven anomaly detection into a unified digital
              voting framework. The proposed architecture aims to improve
              election transparency, voter authentication and tamper resistance
              while providing a scalable solution for secure electronic voting.
              The paper has received conference acceptance, while the
              registration and publication decision is currently on hold.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Artificial Intelligence",
                "Blockchain",
                "Biometrics",
                "Machine Learning",
                "Cyber Security",
                "E-Voting",
              ].map((k) => (
                <span
                  key={k}
                  className="text-xs px-2.5 py-1 rounded-md bg-muted font-mono"
                >
                  {k}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="/Research_Paper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <FileText className="h-4 w-4" />
                Research Paper
              </a>

              <a
                href="/Conference_Acceptance_Email.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"
              >
                <Award className="h-4 w-4" />
                Conference Acceptance
              </a>

              <a
                href="https://github.com/Devaraju-kg/MATA-RAKSHA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                View Project
              </a>

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

        <SectionTitle
          eyebrow="Experience"
          title="Internships"
          sub="Practical experience gained through academic and industry-oriented internship programs."
        />
        {/* Internship 1 — Anudip Foundation */}
        <Reveal>
          <div className="rounded-3xl hairline bg-card p-6 sm:p-10 grid lg:grid-cols-[1fr_2fr] gap-8">

            {/* Left Side */}

            <div>

              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-primary-foreground shadow-gold mb-4">
                <Briefcase className="h-6 w-6" />
              </div>

              <div className="text-xs text-muted-foreground font-mono">
                Jan 2026 – Apr 2026
              </div>

              <h3 className="mt-2 text-xl font-bold">
                Data Visualization Intern
              </h3>

              <div className="text-sm text-muted-foreground">
                Anudip Foundation • DeepTech Program
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Power BI",
                  "Python",
                  "MySQL",
                  "Excel",
                  "DAX",
                  "Data Visualization",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded-md bg-muted font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Side */}

            <div>

              <h4 className="font-semibold text-lg">
                Project • Credit Risk Analytics Dashboard
              </h4>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                Successfully completed a 90-day internship focused on
                business intelligence, data visualization and analytics.
                Developed an interactive Credit Risk Analytics Dashboard
                using Power BI, Python and MySQL to analyze customer
                creditworthiness, automate reporting and generate
                business insights.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">

                {[
                  "Developed an interactive Credit Risk Analytics Dashboard using Power BI.",
                  "Performed data cleaning and preprocessing using Python.",
                  "Created DAX measures, KPIs and business reports.",
                  "Connected MySQL database for data extraction and transformation.",
                  "Designed interactive dashboards with drill-down analysis.",
                  "Improved reporting efficiency through automated analytics."
                ].map((item) => (

                  <li key={item} className="flex gap-2">

                    <ChevronRight className="h-4 w-4 text-gold mt-1 flex-shrink-0" />

                    {item}

                  </li>

                ))}

              </ul>

              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="https://github.com/Devaraju-kg/Credit-Risk-Analytics-Dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="/Internship_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg hairline px-4 py-2 text-sm hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  Internship Report
                </a>

                <a
                  href="/Internship_Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  <Award className="h-4 w-4" />
                  Completion Certificate
                </a>

              </div>

            </div>

          </div>
        </Reveal>
          {/* Internship 2 — Disciples Corporate School */}
          <Reveal>
            <div className="rounded-3xl hairline bg-card p-6 sm:p-10 grid lg:grid-cols-[1fr_2fr] gap-8">

              {/* Left Side */}
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-primary-foreground shadow-gold mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>

                <div className="text-xs text-muted-foreground font-mono">
                  Feb 2024 – Apr 2024
                </div>

                <h3 className="mt-2 text-xl font-bold">
                  AI – Data Quality Analyst Intern
                </h3>

                <div className="text-sm text-muted-foreground">
                  Disciples Corporate School
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Artificial Intelligence",
                    "Data Quality",
                    "Data Analysis",
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded-md bg-muted font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div>
                <h4 className="font-semibold text-lg">
                  AI – Data Quality Analysis
                </h4>

                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Completed an internship as an AI – Data Quality Analyst
                  during my BCA studies, gaining practical exposure to data
                  quality analysis and AI-related data workflows.
                </p>

                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Worked on data quality analysis.",
                    "Gained practical exposure to AI-related data workflows.",
                    "Developed understanding of data quality and analysis processes.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <ChevronRight className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/Internship_Certificate2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  <Award className="h-4 w-4" />
                  Completion Certificate
                </a>

              </div>
            </div>

          </div>
          </Reveal>

      </div>
    </section>
  );
}

/* ---------- Achievements ---------- */

function Counter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
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

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------------- Achievement Data ---------------- */

const ACHIEVEMENTS = [
  {
    icon: Award,
    title: "Outstanding Project Award",
    desc: "Awarded by the Department of MCA, RNS Institute of Technology for the Credit Risk Analytics Dashboard project.",
  },

  {
    icon: FileBadge2,
    title: "Research Paper Accepted",
    desc: "Research paper on AI-assisted biometric blockchain voting accepted for presentation at an international conference.",
  },

  {
    icon: ShieldCheck,
    title: "AI Data Quality Analyst",
    desc: "Successfully completed the Skill India & NASSCOM AI Data Quality Analyst certification.",
  },

  {
    icon: Globe,
    title: "Front-End Web Developer",
    desc: "Completed Front-End Web Developer certification covering HTML, CSS, JavaScript and responsive web development.",
  },

  {
    icon: Server,
    title: "Cloud Computing",
    desc: "Completed Cloud Computing certification covering cloud fundamentals and deployment concepts.",
  },

  {
    icon: Briefcase,
    title: "Data Analytics Internship",
    desc: "Completed Data Analytics internship involving Power BI, Python, SQL and business intelligence reporting.",
  },

  {
    icon: BarChart3,
    title: "Credit Risk Analytics Dashboard",
    desc: "Built an interactive Power BI dashboard for financial credit risk analysis using Python, SQL and DAX.",
  },

  {
    icon: Shield,
    title: "MATA RAKSHA",
    desc: "Developed an AI-enhanced biometric blockchain voting system integrating fingerprint authentication and smart contracts.",
  },

  {
    icon: Trophy,
    title: "Open Source Portfolio",
    desc: "Designed and deployed a modern responsive portfolio showcasing projects, research and certifications using React and TypeScript.",
  },
];

/* ---------------- Component ---------------- */

function Achievements() {
  const counters = [
    {
      label: "Projects",
      to: 8,
      suffix: "+",
    },

    {
      label: "Research Papers",
      to: 1,
    },

    {
      label: "Internships",
      to: 2,
    },

    {
      label: "Certifications",
      to: 15,
      suffix: "+",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 bg-surface/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionTitle
          eyebrow="Achievements"
          title="Awards & Professional Milestones"
          sub="Recognition earned through academic excellence, research, internships, certifications and real-world software projects."
        />

        {/* Counter Cards */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">

          {counters.map((c) => (

            <Reveal key={c.label}>

              <div
                className="
                rounded-2xl
                hairline
                bg-card
                p-6
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-primary/30
                "
              >

                <div className="text-4xl font-display font-bold text-gradient-gold">

                  <Counter
                    to={c.to}
                    suffix={c.suffix}
                  />

                </div>

                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">

                  {c.label}

                </div>

              </div>

            </Reveal>

          ))}

        </div>

        {/* Achievement Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {ACHIEVEMENTS.map((a, i) => (

            <Reveal
              key={a.title}
              delay={i * 0.05}
            >

              <div
                className="
                group
                rounded-2xl
                hairline
                bg-card
                p-6
                h-full
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-primary/30
                "
              >

                <div
                  className="
                  grid
                  h-12
                  w-12
                  place-items-center
                  rounded-xl
                  bg-gradient-to-br
                  from-gold
                  to-yellow-300
                  text-black
                  shadow-lg
                  mb-5
                  group-hover:scale-110
                  transition
                  "
                >

                  <a.icon className="h-6 w-6" />

                </div>

                <h3 className="text-lg font-bold">

                  {a.title}

                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">

                  {a.desc}

                </p>

                <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-yellow-400" />

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
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "devarajukg.dev@gmail.com",
      href: "mailto:devarajukg.dev@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8861266729",
      href: "tel:+918861266729",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/devaraju-k-g",
      href: "https://www.linkedin.com/in/devaraju-k-g",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Devaraju-kg",
      href: "https://github.com/Devaraju-kg",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bengaluru, Karnataka, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionTitle
          eyebrow="Contact"
          title="Let's Build Something Great Together"
          sub="Currently seeking Software Engineer, Python Developer, AI/ML, Blockchain and Data Analytics opportunities."
        />

        <div className="grid lg:grid-cols-2 gap-10">

          <Reveal>

            <div className="space-y-4">

              {contacts.map((c) => (

                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl hairline bg-card p-5 hover:gold-glow transition"
                >

                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-primary-foreground">

                    <c.icon className="h-5 w-5" />

                  </div>

                  <div>

                    <div className="text-xs uppercase tracking-wider text-muted-foreground">

                      {c.label}

                    </div>

                    <div className="font-medium">

                      {c.value}

                    </div>

                  </div>

                </a>

              ))}

            </div>

          </Reveal>

          <Reveal delay={0.1}>

            <div className="rounded-3xl hairline bg-card p-8">

              <h3 className="text-3xl font-bold">

                Ready to Connect?

              </h3>

              <p className="mt-4 text-muted-foreground leading-relaxed">

                Thank you for visiting my portfolio.
                I am passionate about Software Development,
                Artificial Intelligence, Blockchain and Data Analytics.

                I am always open to discussing full-time opportunities,
                innovative projects and research collaborations.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  View Resume
                </a>

                <a
                  href="https://github.com/Devaraju-kg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl hairline px-5 py-3 text-sm hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/devaraju-k-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl hairline px-5 py-3 text-sm hover:bg-muted"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>

              </div>

            </div>

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">

            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-primary-foreground font-bold">

              D

            </span>

            <div>

              <div className="font-display font-semibold">

                Devaraju K G

              </div>

              <div className="text-xs text-muted-foreground">

                Python Developer • AI • Blockchain • Data Analytics

              </div>

            </div>

          </div>

          <div className="flex gap-6 text-sm">

            <a href="/resume.pdf" target="_blank">Resume</a>

            <a
              href="https://github.com/Devaraju-kg"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/devaraju-k-g"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

          </div>

        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">

          © {new Date().getFullYear()} Devaraju K G • Designed & Developed using React, TypeScript & Tailwind CSS

        </div>

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
