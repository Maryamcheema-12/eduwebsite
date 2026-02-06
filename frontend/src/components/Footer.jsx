import { Link } from "react-router-dom";
import { 
  GraduationCap, Phone, Mail, MapPin, 
  Facebook, Instagram, Linkedin, Twitter, 
  ArrowUpRight, ShieldCheck, Globe, Zap, Clock
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- DYNAMIC TIMELINE DATA ---
  const legacyTimeline = [
    { year: "2012", event: "Academy Foundation" },
    { year: "2018", event: "MME Partnership" },
    { year: "2026", event: "Digital Expansion" }
  ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-600/5 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-12 pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 relative z-10">
        
        {/* --- DYNAMIC LEGACY STRIP (New 3D Timeline Section) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-20 md:mb-28 lg:mb-32 pb-16 sm:pb-20 md:pb-24 border-b border-white/10">
          {legacyTimeline.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8 }}
              className="flex items-start sm:items-center gap-5 sm:gap-6 md:gap-8 group cursor-default"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-white text-white/8 group-hover:text-amber-500/15 transition-colors duration-500 flex-shrink-0">
                {item.year}
              </span>
              <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 leading-tight">{item.event}</h4>
                <div className="h-0.5 sm:h-1 w-10 sm:w-12 md:w-16 bg-white/10 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20">
          
          {/* --- BRAND AUTHORITY --- */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
              <div className="bg-slate-900 p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 shadow-2xl flex-shrink-0">
                <GraduationCap className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-amber-500" />
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight leading-none">
                  UPDA
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-xs text-amber-500 font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] mt-1.5">
                  Qatar Engineering Hub
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose md:leading-relaxed max-w-xs font-medium">
              "Architecting professional success through specialized technical mastery and excellence."
            </p>

            <div className="pt-4 sm:pt-6 md:pt-8 flex flex-col gap-3 sm:gap-4 md:gap-5">
              <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
                 <ShieldCheck className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-amber-500 flex-shrink-0" />
                 <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">MME Compliant</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
                 <Zap className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-amber-500 flex-shrink-0" />
                 <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">QCDD Licensed Center</span>
              </div>
            </div>
          </div>

          {/* --- CURRICULUM ARCHIVE --- */}
          <div>
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-8 sm:mb-10 md:mb-12 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Curriculums
            </h3>
            <ul className="space-y-4 sm:space-y-5 md:space-y-6">
              {[
                "UPDA Civil Mastery",
                "UPDA Mechanical Pro",
                "UPDA Electrical Core",
                "PMP Certification",
                "QCDD Fire Safety"
              ].map((course) => (
                <li key={course}>
                  <Link to="/courses" className="text-slate-400 hover:text-white text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all flex items-center gap-2.5 group">
                    {course}
                    <ArrowUpRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- SITE ARCHITECTURE --- */}
          <div>
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-8 sm:mb-10 md:mb-12 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Platform
            </h3>
            <ul className="space-y-4 sm:space-y-5 md:space-y-6">
              {[
                { name: "Home", path: "/" },
                { name: "Course Catalog", path: "/courses" },
                { name: "Gallery", path: "/gallery" },
                { name: "Enrollment Portal", path: "/register" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- GLOBAL CONTACT --- */}
          <div>
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-8 sm:mb-10 md:mb-12 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Headquarters
            </h3>
            <ul className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10">
              <li className="flex items-start gap-3 sm:gap-4 md:gap-5">
                <Phone className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-1" />
                <div className="text-xs sm:text-sm md:text-base font-black text-slate-200 uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                  <div>+974 3383 0276</div>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 md:gap-5">
                <Mail className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                <div className="text-xs sm:text-sm md:text-base font-black text-slate-200 lowercase underline decoration-white/10 underline-offset-4 sm:underline-offset-5 md:underline-offset-6 hover:decoration-amber-600 transition-all cursor-pointer break-all tracking-wide">
                  info@UPDAadmission.com
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 md:gap-5">
                <MapPin className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-1" />
                <div className="text-xs sm:text-sm md:text-base font-black text-slate-200 uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-relaxed">
                  Doha, Qatar,<br />UPDA Hub
                </div>
              </li>
            </ul>

            {/* --- SOCIAL MATRIX --- */}
            <div className="flex gap-3 sm:gap-4 md:gap-5 mt-10 sm:mt-12 md:mt-16">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/" },
                { icon: Twitter, label: "Twitter", href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.12 }}
                  className="bg-slate-900 border border-white/10 hover:border-amber-500/50 p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl transition-all hover:bg-amber-600 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-slate-500 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* --- LEGAL ARCHITECTURE --- */}
        <div className="border-t border-white/10 mt-16 sm:mt-20 md:mt-28 lg:mt-32 pt-10 sm:pt-12 md:pt-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-10 md:gap-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <Globe className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-slate-700" />
            <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-600">
              &copy; {currentYear} UPDA.QATAR
            </p>
          </div>
        
          <div className="flex flex-wrap gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {["Privacy Protocol", "Terms of Admission"].map((item) => (
              <button key={item} className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-600 hover:text-amber-500 transition-all">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;