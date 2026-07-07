import React from "react";
import suryaHeritageVilla from "../assets/Surya Heritage Villa.jpeg";
import viraajCorporatePlaza from "../assets/Viraaj Corporate Plaza.jpeg";
import saarthExpresswayCorridor from "../assets/Saarth Expressway Corridor.jpeg";
import { Navbar } from "./components/Navbar";
import { ServicesGrid } from "./components/ServicesGrid";
import { BOQEstimator } from "./components/BOQEstimator";
import { GanttSimulator } from "./components/GanttSimulator";
import { MeetingScheduler } from "./components/MeetingScheduler";
import { ProjectsPortfolio } from "./components/ProjectsPortfolio";
import { Timeline } from "./components/Timeline";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { StatsSection } from "./components/StatsSection";
import { ContactForm } from "./components/ContactForm";
import { AnkletLogo } from "./components/AnkletLogo";
import { WHY_CHOOSE_US } from "./data";
import { 
  Shield, 
  Flame, 
  Award, 
  Compass, 
  UserCheck, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Sparkles,
  Maximize,
  Users,
  ShieldCheck,
  CalendarDays,
  Eye,
  FileSpreadsheet,
  BadgeIndianRupee,
  PhoneCall,
  MessageSquare,
  Workflow,
  Handshake,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Helper for why choose us icon resolving
const WhyUsIcon = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "Maximize":
      return <Maximize className={className} />;
    case "Users":
      return <Users className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "CalendarDays":
      return <CalendarDays className={className} />;
    case "Eye":
      return <Eye className={className} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet className={className} />;
    case "BadgeIndianRupee":
      return <BadgeIndianRupee className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
};

export default function App() {
  const [activeView, setActiveView] = React.useState<string>("home");
  const [contactTab, setContactTab] = React.useState<"quote" | "consult">("quote");
  const primaryPhoneNumber = "+917414938354";
  const primaryWhatsappNumber = "917414938354";
  const secondaryPhoneNumber = "+917219855366";

  // Reusable Page Header for subpages with clean, elegant layout
  const SubpageHeader = ({ 
    title, 
    badge, 
    subtitle, 
    bgImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200" 
  }: { 
    title: string; 
    badge: string; 
    subtitle?: string;
    bgImage?: string;
  }) => {
    return (
      <div className="relative text-white overflow-hidden py-14 pt-28 sm:py-18 sm:pt-36 border-b border-white/10">
        
        {/* Background Construction Image - fully stretched */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={bgImage}
            alt="Anklet Engineering Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Glassmorphic Beautiful Dark Black Translucent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-zinc-950/80 to-neutral-950/85 backdrop-blur-[3px]" />
        </div>

        {/* Content Centered Container with pure layout */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-md"
          >
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-zinc-200 font-mono">
              {badge}
            </span>
          </motion.div>
          
          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] pb-1"
            >
              {title}
            </motion.h1>
 
            {/* A simple elegant divider */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto mt-3"
            />
          </div>

          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-slate-100 text-xs sm:text-sm max-w-3xl mx-auto font-normal leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center px-4"
            >
              {subtitle}
            </motion.p>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-brand-orange selection:text-white flex flex-col justify-between">
      <div>
        {/* 1. STICKY GLASSMORPHIC NAVBAR */}
        <Navbar activeView={activeView} setActiveView={setActiveView} setContactTab={setContactTab} />

        {/* PAGE CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 2. HERO SECTION */}
              <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920"
                    alt="Anklet Corporate Construction Tower Crane"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.55]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-zinc-950/60 to-transparent mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-zinc-950/20" />
                </div>

                {/* Ambient floating glowing orbs */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
                  <motion.div
                    animate={{
                      x: [0, 60, -30, 0],
                      y: [0, -40, 30, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-brand-orange/15 blur-[90px]"
                  />
                  <motion.div
                    animate={{
                      x: [0, -40, 50, 0],
                      y: [0, 50, -40, 0],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[30%] right-[10%] w-[450px] h-[450px] rounded-full bg-zinc-800/20 blur-[110px]"
                  />
                </div>

                {/* Hero content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-36 text-white flex flex-col justify-center h-full w-full">
                  <div className="max-w-4xl space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 backdrop-blur-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-orange">
                        Premier Infrastructure & Structural Pioneers
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.05] drop-shadow-xl"
                    >
                      Building <br className="hidden sm:inline" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-white">
                        Tomorrow's Landmarks
                      </span>{" "}
                      Today
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed font-light drop-shadow-md"
                    >
                      Delivering premium residential, commercial, infrastructure, architectural, and civil engineering solutions with innovation, quality, and trust.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-3 pt-2"
                    >
                      <button
                        onClick={() => setActiveView("services")}
                        className="group flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all duration-200 cursor-pointer"
                      >
                        Explore Services
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setContactTab("consult");
                          setActiveView("contact");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer"
                      >
                        Get Free Consultation
                      </button>
                    </motion.div>
                  </div>

                  {/* Floating stats metrics inside Hero */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16 pt-6 border-t border-white/10"
                  >
                    {[
                      { title: "50+ Projects", desc: "Crafting iconic skylines" },
                      { title: "15+ Years Experience", desc: "Rigorous industry legacy" },
                      { title: "100% Client Satisfaction", desc: "Vetted grade-A execution" },
                      { title: "Expert Engineering Team", desc: "25+ certified specialists" },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white/5 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl flex flex-col hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="text-base font-black text-brand-orange leading-none">{stat.title}</span>
                        <span className="text-[9px] text-gray-300 mt-1 uppercase font-bold tracking-wider">{stat.desc}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom transition curve */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none translate-y-[1px]">
                  <svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="relative block w-full h-[25px] sm:h-[40px] md:h-[55px] text-white dark:text-slate-950 fill-current"
                  >
                    <path d="M0,0 Q600,40 1200,0 L1200,120 L0,120 Z" />
                  </svg>
                </div>
              </section>

              {/* HOME INTRO - MINI ABOUT TEASER */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange block mb-1">
                          Welcome to ANKLET
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black font-display text-brand-navy dark:text-white tracking-tight leading-tight">
                          Forging Landmark Horizons with Engineering Honor
                        </h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                        At ANKLET Construction & Infrastructure, we turn blueprints into generational landmarks. Established with a core mandate of absolute structural safety, rigorous quality assurance, and luxurious corporate design, we have evolved into a leading multi-disciplinary constructor.
                      </p>
                      
                      <div className="flex gap-4 pt-2">
                        <button
                          onClick={() => setActiveView("about")}
                          className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-orange hover:text-orange-600 transition-colors"
                        >
                          Learn More About Us
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange to-brand-navy rounded-2xl blur opacity-10" />
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video border border-gray-100 dark:border-slate-800">
                        <img
                          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600"
                          alt="ANKLET Civil Engineers"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-[0.95]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* HOME CORE EXPERTISE - MINI SERVICES TEASER */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-gray-100 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Primary Competencies
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Our Professional Services
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      We provide turnkey heavy engineering solutions across residential complexes, glass corporate towers, and national express highway bridges.
                    </p>
                  </div>

                  {/* 3 Core services highlighted */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Residential Construction",
                        desc: "Creating bespoke personal sanctuaries. From ultra-luxury architectural villas to modern sustainable residential estates.",
                        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
                      },
                      {
                        title: "Commercial Construction",
                        desc: "Designing and building commercial infrastructure that drives business growth. We deliver grade-A office spaces and premium retail hubs.",
                        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400"
                      },
                      {
                        title: "Infrastructure Development",
                        desc: "Shaping national progress through robust heavy civil engineering. Our specialized infrastructure division constructs safe highways and bridges.",
                        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=400"
                      }
                    ].map((srv, i) => (
                      <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col h-full hover:shadow-md transition-all duration-300">
                        <div className="h-40 overflow-hidden relative">
                          <img src={srv.image} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-black text-brand-navy dark:text-white tracking-wide mb-1.5">{srv.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{srv.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setActiveView("services")}
                      className="inline-flex items-center gap-1.5 bg-brand-orange text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 shadow-md transition-all duration-200"
                    >
                      Explore All Services
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* HOME PROJECTS TEASER */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Structural Showcase
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Featured Landmarks
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Explore some of our structural creations, built to highest architectural and load-bearing specifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Surya Heritage Villa",
                        cat: "Residential",
                        desc: "An award-winning architectural masterpiece utilizing cantilevered raw concrete and double-glazed smart glass panels.",
                        image: suryaHeritageVilla,
                        loc: "Alibaug, Maharashtra"
                      },
                      {
                        title: "Viraaj Corporate Plaza",
                        cat: "Commercial",
                        desc: "A premium 12-story high-end corporate headquarters featuring a distinctive smart ventilated glass facade.",
                        image: viraajCorporatePlaza,
                        loc: "BKC, Mumbai"
                      },
                      {
                        title: "Saarth Expressway Corridor",
                        cat: "Infrastructure",
                        desc: "A critical 14km high-speed arterial concrete highway development featuring two multi-span highway bridges.",
                        image: saarthExpresswayCorridor,
                        loc: "Pune-Bengaluru Corridor"
                      }
                    ].map((proj, i) => (
                      <div key={i} className="group relative bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-md cursor-pointer" onClick={() => setActiveView("projects")}>
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[9px] font-black uppercase text-brand-orange tracking-widest">{proj.cat}</span>
                          <h4 className="text-xs sm:text-sm font-bold tracking-tight mt-0.5">{proj.title}</h4>
                          <p className="text-[10px] text-gray-300 mt-1 line-clamp-2">{proj.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setActiveView("projects")}
                      className="inline-flex items-center gap-1.5 bg-brand-orange text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 shadow-md transition-all duration-200"
                    >
                      View Full Portfolio
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="py-12 bg-slate-50 dark:bg-slate-900/40 border-t border-b border-gray-100 dark:border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <StatsSection />
                </div>
              </section>

              {/* HOME WORKFLOW BANNER */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Rigorous Scheduling Framework
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Our 4-Phase Construction Process
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xl mx-auto leading-relaxed">
                    We coordinate our project life cycles via standard Gantt networks, BIM clearances, and independent non-destructive structural audits.
                  </p>
                  <button
                    onClick={() => setActiveView("process")}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase text-brand-orange hover:text-orange-600 transition-colors pt-2"
                  >
                    View Our Construction Process
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* CALL TO ACTION */}
              <section id="cta" className="relative py-16 bg-brand-navy text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
                    alt="Anklet Modern Luxury Villa Background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-25 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-slate-950/60" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange block">
                    Start Your Engineering Project
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black font-display tracking-tight leading-tight max-w-2xl mx-auto">
                    Let's Build Your Vision Together
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                    Contact our senior consultants to compile a detailed Bill of Quantities (BOQ) or book a direct, technical scheduling audit.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveView("contact")}
                      className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      Request a Quote
                    </button>
                    
                    <button
                      onClick={() => setActiveView("contact")}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20 hover:border-white/40 active:scale-95 transition-all cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Corporate Profile"
                title="About ANKLET"
                subtitle="Leading multi-disciplinary constructor with absolute structural safety, rigorous non-destructive testing, and certified engineering standards."
                bgImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200"
              />

              {/* Core About Info */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange block mb-1">
                          Corporate Architecture & Philosophy
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black font-display text-brand-navy dark:text-white tracking-tight leading-tight">
                          Forging Landmark Horizons With Engineering Honor
                        </h2>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                        At ANKLET Construction & Infrastructure, we turn complex blueprints into generations of highly secure structural landmarks. Established with a core mandate of absolute structural safety, rigorous quality control, and luxury corporate design, we have evolved into a premier multi-disciplinary civil constructor.
                      </p>

                      {/* Values list with reduced vertical layout spacer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: "Quality Craftsmanship", desc: "Rigorous grade-A materials, concrete core compressions, and independent laboratory certifications." },
                          { title: "Safety Infrastructure", desc: "Zero-compromise on site protective structures, structural hazard mitigation, and ISO safety standards." },
                          { title: "Innovative Engineering", desc: "Utilizing advanced Building Information Modeling (BIM) to forecast bottlenecks and design with precision." },
                          { title: "Transparency & Honesty", desc: "No hidden bills of quantity. Real-time portal check-ins on timeline projections and direct cashflows." },
                          { title: "Professionalism Above All", desc: "Our 25+ staff engineers hold elite credentials, coordinating directly with civil authorities." }
                        ].map((val, idx) => (
                          <div key={idx} className="flex gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-black text-brand-navy dark:text-white tracking-wide">{val.title}</h4>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{val.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange to-brand-navy rounded-[2rem] blur opacity-10" />
                      <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5 border border-gray-100 dark:border-slate-800">
                        <img
                          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200"
                          alt="ANKLET Blueprints"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-[0.9]"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
                          <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">
                            Infrastructure Standard
                          </p>
                          <p className="text-xs font-semibold mt-0.5 text-gray-100 leading-relaxed">
                            "We execute projects under strict national building code guidelines to safeguard lives and commercial capital."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADDITIONAL INFORMATION SECTION */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Company Insight
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      What Makes ANKLET Different
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Beyond construction, we bring disciplined project intelligence, client clarity, and dependable execution to every engagement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "End-to-End Delivery",
                        desc: "From design coordination and quantity estimation to site execution and final handover, every milestone is managed with precise accountability, transparent documentation, and milestone-based client reporting.",
                        icon: Workflow,
                        detail: "Single-point accountability from concept to handover"
                      },
                      {
                        title: "Client-Centric Planning",
                        desc: "We provide transparent timelines, cost visibility, and direct communication so clients always know where the project stands and what decisions are needed next.",
                        icon: Handshake,
                        detail: "Clear communication and proactive project governance"
                      },
                      {
                        title: "Future-Ready Infrastructure",
                        desc: "Our projects are designed with resilience, energy efficiency, and long-term performance in mind, blending durable materials with smart construction practices.",
                        icon: Building2,
                        detail: "Built for durability, efficiency, and lasting value"
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700/50 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-500/10 text-brand-orange mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-sm font-black text-brand-navy dark:text-white tracking-wide mb-2">{item.title}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                          <div className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">
                            {item.detail}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* CORE LEADERSHIP SECTION */}
              <section className="py-16 bg-white dark:bg-slate-950 border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Core Board & Management
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Senior Executive Leadership
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Our directors and chief engineering leads hold decades of collective industry credentials in heavy infrastructure and high-rise developments.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Er. Rajan Malhotra",
                        role: "Chairman & Managing Director",
                        desc: "With 30+ years of pioneering experience in heavy earthworks, mass-concrete masonry, and national transport layouts. Vets all core structural frameworks.",
                        exp: "30+ Yrs Exp",
                        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
                      },
                      {
                        name: "Ar. Shreya Joshi",
                        role: "Executive Director of Architectural Systems",
                        desc: "Directs ANKLET's luxurious architectural drafting, double-glazed facade design, and sustainable carbon-neutral spatial zoning standards.",
                        exp: "B.Arch Principal",
                        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
                      },
                      {
                        name: "Er. Amit Deshmukh",
                        role: "Chief Structural Consultant",
                        desc: "Certified Grade-I structural auditor. Oversees Building Information Modeling (BIM) collision logs, load-bearing stress evaluations, and seismic zoning checks.",
                        exp: "M.Tech IIT Bombay",
                        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400"
                      }
                    ].map((leader, i) => (
                      <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col hover:shadow-md transition-all duration-300">
                        <div className="h-56 overflow-hidden relative">
                          <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                          <span className="absolute bottom-3 right-3 bg-brand-orange text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                            {leader.exp}
                          </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="text-sm font-black text-brand-navy dark:text-white tracking-wide">{leader.name}</h3>
                            <p className="text-[11px] font-bold text-brand-orange uppercase tracking-wider mt-0.5">{leader.role}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed font-light">{leader.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* STATUTORY LICENSING & REGULATORY COMPLIANCE */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Statutory Compliance
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Corporate Licenses & Standards
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      ANKLET functions under strict national legislative compliance, guaranteeing all capital ventures are legally bulletproof.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "PWD Registration Class-I",
                        authority: "Ministry of Public Works",
                        status: "Active / Registered",
                        desc: "Authorized to bid on, execute, and inspect major government and civil heavy highway and infrastructure works without scale caps."
                      },
                      {
                        title: "ISO 9001:2015",
                        authority: "QMS Certifications",
                        status: "Certified & Audited",
                        desc: "International Quality Management Standard reflecting absolute precision in project planning, drawing delivery, and material inflow logs."
                      },
                      {
                        title: "ISO 45001:2018",
                        authority: "Safety Inspections Authority",
                        status: "Certified & Audited",
                        desc: "Occupational Health and Safety management system guaranteeing zero-accident site layouts, strict helmet/harness rules, and safety netting."
                      },
                      {
                        title: "Zoning & Environmental Clearances",
                        authority: "Pollution Control Board",
                        status: "Compliant Framework",
                        desc: "Every residential and commercial project receives exhaustive ground water runoff audits and acoustic shielding checks to meet environmental standards."
                      }
                    ].map((lic, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Shield className="w-5 h-5 text-brand-orange" />
                            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              {lic.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-brand-navy dark:text-white tracking-wider pt-1">{lic.title}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lic.authority}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed pt-1">{lic.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* BRAND MATERIAL PARTNERS SECTION */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-t border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Quality Sourcing Partners
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Material Partners & Brands
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      We secure raw building materials exclusively from grade-A manufacturers, ensuring structural longevity of up to 100+ years.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    {[
                      { name: "TATA Tiscon", type: "FE 550D super ductile steel reinforcement" },
                      { name: "UltraTech Cement", type: "Premium grade cement for structural durability" },
                      { name: "Asian Paints", type: "Protective coatings and architectural finishes" },
                      { name: "Saint-Gobain", type: "High-performance glass and facade systems" },
                      { name: "JKLaxmi", type: "Ready-mix concrete and concrete admixtures" },
                      { name: "HILTI", type: "Anchoring systems and precision fastening tools" },
                      { name: "Schindler", type: "Vertical transportation systems for commercial towers" },
                      { name: "Bosch", type: "Site power tools and construction equipment support" }
                    ].map((brand, i) => (
                      <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700/50 flex flex-col justify-center">
                        <span className="text-xs font-black text-brand-navy dark:text-white block">{brand.name}</span>
                        <span className="text-[10px] text-gray-400 mt-1 leading-normal font-light">{brand.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Stats Block */}
              <section className="py-12 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <StatsSection />
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Turnkey Engineering"
                title="Our Professional Services"
                subtitle="Turnkey heavy engineering solutions across residential complexes, glass corporate towers, and transport infrastructure developments."
                bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
              />

              {/* Main Services Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Full Project Lifecycle Capabilites
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Civil Competencies & Execution Areas
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    We cover civil works from excavation and core substructures to high-end architectural finishes, vetted by certified engineers.
                  </p>
                </div>

                <ServicesGrid />
              </section>

              {/* INTERACTIVE ESTIMATOR WIDGET */}
              <section className="py-12 bg-slate-50 dark:bg-slate-900/40 border-t border-b border-gray-150/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Budget & Sourcing Planner
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Simulate Your Structural Material Load
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Select your desired project class, ground area, and grade specs to view civil quantity approximations in real time.
                    </p>
                  </div>

                  <BOQEstimator />
                </div>
              </section>

              {/* SERVICE ASSURANCES & ENGINEERING SLAs */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Risk Management & Security
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Structural Guarantees & Service SLA Standards
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Our contracts feature legally binding guarantees so your capital investment is completely protected for generations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "50-Year Structural Integrity Warranty",
                        desc: "Our high-ductile TATA steel layouts, combined with pre-stressed vibration-damping slabs, carry an absolute 50-year certified warranty against foundation deflection, pillar shifting, or beam failures.",
                        icon: ShieldCheck
                      },
                      {
                        title: "10-Year Water-Seepage Protection SLA",
                        desc: "Utilizing crystalline multi-layered waterproofing compounds from Berger and specialized polymer barriers. We provide absolute protection against underground basement leaks and joint wetness.",
                        icon: Shield
                      },
                      {
                        title: "Weekly UAV-Drone Spatial Reports",
                        desc: "Through our client-access portal, receive weekly drone imagery logs and Gantt tracking progress charts. If we breach milestones due to non-force-majeure issues, penalty compensations are auto-credited.",
                        icon: Sparkles
                      }
                    ].map((sla, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col space-y-3">
                        <div className="bg-orange-500/10 text-brand-orange w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                          <sla.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-brand-navy dark:text-white tracking-tight">{sla.title}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">{sla.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Completed Landmarks"
                title="Featured Landmarks"
                subtitle="Explore our structural creations, built to highest architectural and load-bearing specifications."
                bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
              />

              {/* Portfolio Grid wrapper */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Structural Gallery
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Masonry & Concrete Portfolio
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    Filter and view some of our premium residential, corporate offices, and transport highway achievements.
                  </p>
                </div>

                <ProjectsPortfolio
                  onConsultNow={() => {
                    setContactTab("quote");
                    setActiveView("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </section>

              {/* TECHNOLOGY INTEGRATION ON SITE */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-navy rounded-[1.5rem] blur opacity-10" />
                      <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg border border-gray-100 dark:border-slate-800">
                        <img
                          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800"
                          alt="ANKLET High-tech CAD engineering office"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange block mb-1">
                          Digitized Site Execution
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                          Technological Frameworks: BIM, LiDAR & Stress Simulations
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        We minimize waste and structural collisions before a single brick is laid. By simulating physical force calculations on complex CAD software, our field engineers execute projects with supreme surgical accuracy.
                      </p>

                      <div className="space-y-4">
                        {[
                          {
                            title: "Autodesk Revit & Tekla BIM Modeling",
                            desc: "3D structural modeling allows us to map pipelines, reinforcement rebar clashes, and electrical conduits concurrently. This cuts onsite modification expenses by up to 22%."
                          },
                          {
                            title: "LiDAR Drone-Aided Earthwork Analysis",
                            desc: "We scan terrain slopes using aerial drone LiDAR scanners, ensuring that slope excavations and grading contours are perfectly balanced for heavy rainfall drain-off."
                          },
                          {
                            title: "Non-Destructive Concrete Scanning",
                            desc: "To guarantee slab density, we use ultrasonic pulse scanners and hammer testing to check cured concrete strength without compromising or cracking the load-bearing frames."
                          }
                        ].map((tech, idx) => (
                          <div key={idx} className="flex gap-3">
                            <span className="text-xs font-black text-brand-orange mt-0.5">0{idx + 1}.</span>
                            <div>
                              <h4 className="text-xs font-black text-brand-navy dark:text-white tracking-wide">{tech.title}</h4>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed font-light">{tech.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATUTORY STRUCTURAL AUDITS SECTION */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Safety Audits Checklist
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Structural Testing & Site Vetting Controls
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Every project undergoes a sequence of statutory engineering safety clearances verified by third-party testing labs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Soil Plate Load Test",
                        factor: "Bearing Capacity Vetting",
                        desc: "We check the bearing capacity of the soil before laying foundations, verifying that footing size perfectly matches structural tonnage load ratios."
                      },
                      {
                        title: "Compressive Cube Testing",
                        factor: "Concrete Strength Clearance",
                        desc: "Concrete samples are tested in compression machines at 7, 14, and 28 days of curing to verify they achieve their specified M25/M30 characteristic strength."
                      },
                      {
                        title: "Seismic R-Factor Compliance",
                        factor: "Zone-III Earthquake Damping",
                        desc: "High-grade ductile shear walls and heavy-duty structural columns are placed based on IS-1893 seismic zoning guidelines to withstand minor ground shifts."
                      }
                    ].map((audit, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                        <span className="text-[9px] font-black uppercase text-brand-orange tracking-wider bg-orange-500/10 px-2 py-0.5 rounded inline-block mb-3">
                          {audit.factor}
                        </span>
                        <h4 className="text-xs font-black text-brand-navy dark:text-white tracking-wide">{audit.title}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 leading-relaxed font-light">{audit.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "why-choose-anklet" && (
            <motion.div
              key="why-choose-anklet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Corporate Assurance"
                title="Why Choose ANKLET"
                subtitle="We have constructed a bulletproof reputation by focusing on engineering integrity, supreme raw material vetting, and direct communication channels."
                bgImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200"
              />

              {/* Core features Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Operational Core Values
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Engineered for Integrity
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    Explore the systems and values that set ANKLET apart in high-end structural execution and compliance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {WHY_CHOOSE_US.map((item, idx) => (
                    <div
                      key={item.id}
                      className="group p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-150 dark:border-slate-700/50 shadow-sm"
                    >
                      <div className="bg-orange-500/10 text-brand-orange w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <WhyUsIcon name={item.iconName} className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-brand-navy dark:text-white mb-1.5 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* TECHNICAL COMPARISON TABLE */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Comparative Audit
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Material & Execution Benchmarks
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      How ANKLET's certified engineering guidelines stack up against standard unregulated local contractors.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-150 dark:border-slate-700/60 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-brand-navy text-white text-[10px] font-black uppercase tracking-wider">
                            <th className="p-4 sm:p-5">Engineering Factor</th>
                            <th className="p-4 sm:p-5">Standard Builders Limit</th>
                            <th className="p-4 sm:p-5 text-brand-orange">ANKLET Premium Standard</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-gray-150 dark:divide-slate-700">
                          {[
                            {
                              factor: "Reinforcement Steel Grades",
                              standard: "FE 500 or scrap rebar (prone to brittleness and underground rust)",
                              anklet: "TATA Tiscon FE 550D Super Ductile (high fatigue limit, premium seismic protection)"
                            },
                            {
                              factor: "Concrete Batching Vetting",
                              standard: "Manual spade mixing on site with fluctuating water ratios",
                              anklet: "Automated Ready-Mix Concrete (RMC) with measured slump checks before casting"
                            },
                            {
                              factor: "Bill of Quantities (BOQ) Safety",
                              standard: "Vague verbal lumpsum estimates leading to random mid-project cost spikes",
                              anklet: "Legally signed, fully itemized BOQ referencing standard civil rate cards"
                            },
                            {
                              factor: "Non-Destructive Strength Scanning",
                              standard: "Rarely done; defaults to waiting for visual hairline crack leaks to inspect",
                              anklet: "Ultrasonic pulse scan, rebound hammer, and direct core cylinder tests for dense slabs"
                            },
                            {
                              factor: "Safety Gear & Netting Layouts",
                              standard: "Minimalist layout; laborers work without harness lines or safety mesh",
                              anklet: "ISO 45001 compliant: heavy catch-netting, double-point harness lines, and site barricades"
                            }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                              <td className="p-4 sm:p-5 font-black text-brand-navy dark:text-white leading-relaxed">{row.factor}</td>
                              <td className="p-4 sm:p-5 text-gray-500 dark:text-gray-400 leading-relaxed font-light">{row.standard}</td>
                              <td className="p-4 sm:p-5 text-brand-navy dark:text-white font-bold bg-orange-500/5 leading-relaxed">{row.anklet}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEVEN PHYSICAL TESTING ROUTINES */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Quality Control Checks
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Material Testing Routines Before Casting
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Every batch of sand, steel, and concrete must clear these field laboratory validations to be approved for build placement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        num: "01",
                        title: "Concrete Slump Test",
                        desc: "Performed on every single delivery transit mixer to check concrete workability and water-cement compliance before pumping into column structures."
                      },
                      {
                        num: "02",
                        title: "Sieve Analysis of Sand",
                        desc: "Ensures the fine aggregate holds optimal grading zones without excess silt or clay, preserving a powerful structural bond during cement mixing."
                      },
                      {
                        num: "03",
                        title: "Silt Content Testing",
                        desc: "Fine aggregates are verified in graduated cylinders to contain under 8% silt, keeping the mortar mix strong and resistant to future peeling."
                      },
                      {
                        num: "04",
                        title: "Compression Cube Testing",
                        desc: "Standard 150mm cubes are cast on-site and crushed in laboratory hydraulic machines at 7, 14, and 28 days to verify exact strength limits."
                      },
                      {
                        num: "05",
                        title: "Rebar Yield Stress Vetting",
                        desc: "Steel samples are tested for tensile strain ratios, guaranteeing high elasticity so beams can sway slightly without snapping under load."
                      },
                      {
                        num: "06",
                        title: "Ultrasonic Pulse Velocity",
                        desc: "Non-destructive high-frequency sound waves are sent through columns to map interior air pockets, honeycombing, or density discrepancies."
                      }
                    ].map((test, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-start gap-4">
                        <span className="text-xl font-black font-display text-brand-orange leading-none">{test.num}</span>
                        <div>
                          <h4 className="text-xs font-black text-brand-navy dark:text-white tracking-wide">{test.title}</h4>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-light">{test.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Strategic Scheduling"
                title="Our Construction Process"
                subtitle="We coordinate our project lifecycles via standard Gantt networks, BIM clearances, and independent non-destructive structural audits."
                bgImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200"
              />

              {/* Dynamic Phase Simulator */}
              <section className="py-12 bg-white dark:bg-slate-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Milestone Simulation
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Interactive Project Stage Tracker
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Click the construction phases below to view the technical audits, certifications, and materials cleared at each stage of a typical ANKLET project.
                    </p>
                  </div>

                  {/* Interactive Gantt Simulator component */}
                  <GanttSimulator />
                </div>
              </section>

              {/* Linear timeline */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-150/10 bg-slate-50 dark:bg-slate-900/40">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Linear Path
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Chronological Execution Steps
                  </h2>
                </div>
                <Timeline />
              </section>
            </motion.div>
          )}

          {activeView === "testimonials" && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Verified Endorsements"
                title="What Our Clients Say"
                subtitle="Read how our focus on speed, safety standards, and BIM accuracy de-risked major commercial and high-end residential builds."
                bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200"
              />

              {/* Reviews Slider */}
              <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Corporate Reviews
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Client Satisfaction Testimonials
                  </h2>
                </div>
                <TestimonialsCarousel />
              </section>

              {/* DETAILED INDUSTRIAL CASE STUDIES */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-150/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Case Studies
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Corporate Project Logs & Case Deep-Dives
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Review how ANKLET tackled structural friction on corrosive maritime sites and dense urban environments.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Surya Heritage Cantilever Villa",
                        loc: "Coastal Alibaug, Maharashtra",
                        challenge: "Highly corrosive maritime sea breeze, loose silty mud soil requiring extensive piling.",
                        solution: "Implemented 12-meter deep underground friction concrete piles. Sourced specialized moisture-resistant concrete with corrosion-inhibiting steel coatings.",
                        metric: "Completed 22 Days Ahead of Schedule",
                        bg: suryaHeritageVilla
                      },
                      {
                        title: "Viraaj Corporate HQ High-Rise",
                        loc: "BKC Commercial Area, Mumbai",
                        challenge: "Severe logistical constraints on concrete mixers, highly crowded transit zones.",
                        solution: "Managed just-in-time delivery scheduling using our automated Gantt models. Conducted pre-stressed column slab casting at night to bypass transit congestion.",
                        metric: "Zero Safety Incidents Over 240,000 Hours",
                        bg: viraajCorporatePlaza
                      }
                    ].map((caseStudy, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-150 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="h-48 relative overflow-hidden">
                            <img src={caseStudy.bg} alt={caseStudy.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                            <div className="absolute bottom-4 left-5 right-5">
                              <span className="text-[9px] font-black uppercase text-brand-orange bg-orange-500/10 px-2 py-0.5 rounded tracking-wide">
                                {caseStudy.loc}
                              </span>
                              <h3 className="text-sm sm:text-base font-black text-white mt-1 leading-tight">{caseStudy.title}</h3>
                            </div>
                          </div>
                          
                          <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">The Engineering Challenge:</h4>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">{caseStudy.challenge}</p>
                            </div>

                            <div className="space-y-1.5">
                              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">ANKLET Implementation:</h4>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">{caseStudy.solution}</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-4 bg-orange-500/5 border-t border-gray-100 dark:border-slate-700/50 flex justify-between items-center">
                          <span className="text-[9px] font-black text-gray-400 uppercase">Key Outcome Achievement:</span>
                          <span className="text-[10px] font-black text-brand-orange">{caseStudy.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeView === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pb-16"
            >
              <SubpageHeader
                badge="Corporate Channels"
                title="Contact Our Offices"
                subtitle="Book a direct online consultation window or submit a detailed project requisition query to our central registry."
                bgImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1200"
              />

              {/* Message routing form */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                    Inbound Registry
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                    Submit Formal Requisition Query
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    Submit coordinates and specifications of your land development, and we will route it to our engineering board.
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <ContactForm activeTab={contactTab} setActiveTab={setContactTab} />
                </div>
              </section>

              {/* SCHEDULING INTERACTIVE CALENDAR SECTION */}
              <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-b border-gray-150/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Direct Expert Access
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Schedule a Live Board Call-Back
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      Skip email delays. Lock a slot with our lead structures or compliance consultants to review project feasibilities directly.
                    </p>
                  </div>

                  <MeetingScheduler />
                </div>
              </section>

              {/* DIRECT LEGAL & REGISTRATION COORDINATES PANEL */}
              <section className="py-16 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                      Legal Registry
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-brand-navy dark:text-white tracking-tight">
                      Statutory Coordinates & Corporate Data
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">Registered Address</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                        ANKLET Construction & Infrastructure Pvt. Ltd.<br />
                        Near Gajanan Maharaj Temple, At/Post Bharsingi, Taluka Narkhed, District Nagpur, Maharashtra – 441301, India
                      </p>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">Electronic Dispatch</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                        For primary tenders and PWD submission logs:<br />
                        <span className="font-bold text-brand-navy dark:text-white">ankletconstruction@gmail.com</span>
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-light">
                        Direct Lines: +91 74149 38354 / +91 72198 55366
                      </p>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-brand-orange">Incorporation Identity</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                        Registered with the Ministry of Corporate Affairs, India under license number:
                      </p>
                      <span className="text-[10px] font-black font-mono text-brand-navy dark:text-white bg-orange-500/10 px-2 py-1 rounded inline-block">
                        CIN: U43900MH2025PTC444223
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LUXURY DARK CORPORATE FOOTER */}
      <footer className="bg-black text-white pt-12 pb-10 border-t border-zinc-900" id="corporate-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-zinc-900">
          
          <div className="lg:col-span-4 space-y-4">
            <AnkletLogo 
              height={48} 
              showText={true} 
              lightText={true} 
              className="transform -translate-x-3" 
            />
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs">
              ANKLET Construction & Infrastructure is a premier heavy civil engineering and luxury design studio, forging commercial, residential, and transport landmarks across national spaces.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <Shield className="w-4 h-4 text-brand-orange" />
              <span>ISO 9001:2015 & ISO 45001:2018 Certified</span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
              Core Services
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Residential Construction</button></li>
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Commercial Development</button></li>
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Infrastructure & Earthworks</button></li>
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Architectural Drafting</button></li>
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Civil Engineering Consultancy</button></li>
              <li><button onClick={() => { setActiveView("services"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Renovation & Retrofitting</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
              Corporate
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><button onClick={() => { setActiveView("home"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Home Portal</button></li>
              <li><button onClick={() => { setActiveView("about"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">About ANKLET</button></li>
              <li><button onClick={() => { setActiveView("projects"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Masonry Projects</button></li>
              <li><button onClick={() => { setActiveView("why-choose-anklet"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Why Choose Us</button></li>
              <li><button onClick={() => { setActiveView("process"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Our Process</button></li>
              <li><button onClick={() => { setActiveView("testimonials"); window.scrollTo({ top: 0 }); }} className="hover:text-brand-orange transition-colors cursor-pointer text-left">Client Reviews</button></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
              Coordinates
            </h4>
            <div className="text-[11px] text-gray-400 space-y-2">
              <p className="leading-relaxed">
                <strong>Registered Office:</strong><br />
                Near Gajanan Maharaj Temple, At/Post Bharsingi, Taluka Narkhed, District Nagpur, Maharashtra – 441301, India
              </p>
              <p>Contact: +91 74149 38354 / +91 72198 55366</p>
              <p>Email: ankletconstruction@gmail.com</p>
              <p className="text-[9px] text-brand-orange font-black uppercase tracking-wider">
                CIN: U43900MH2025PTC444223
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-gray-500">
          <p>© {new Date().getFullYear()} ANKLET Construction & Infrastructure Private Limited. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Compliance</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Zoning Declarations</a>
          </div>
        </div>
      </footer>

      {/* LUXURY FLOATING ACTIONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end" id="luxury-floating-actions">
        {/* WhatsApp Chat Button */}
        <motion.a
          href={`https://wa.me/${primaryWhatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center bg-zinc-900/95 hover:bg-black border border-amber-500/30 hover:border-amber-500 text-white h-12 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer p-3.5"
          id="floating-whatsapp-btn"
        >
          <span className="max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out text-xs font-sans font-bold uppercase tracking-wider text-amber-500 whitespace-nowrap overflow-hidden">
            WhatsApp Chat
          </span>
          <MessageSquare className="w-5 h-5 text-amber-500 group-hover:text-amber-400 flex-shrink-0" />
        </motion.a>

        {/* Call Us Button */}
        <motion.a
          href={`tel:${primaryPhoneNumber}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center bg-zinc-900/95 hover:bg-black border border-amber-500/30 hover:border-amber-500 text-white h-12 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer p-3.5"
          id="floating-call-btn"
        >
          <span className="max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out text-xs font-sans font-bold uppercase tracking-wider text-amber-500 whitespace-nowrap overflow-hidden">
            Call Direct
          </span>
          <PhoneCall className="w-5 h-5 text-amber-500 group-hover:text-amber-400 flex-shrink-0" />
        </motion.a>
      </div>
    </div>
  );
}
