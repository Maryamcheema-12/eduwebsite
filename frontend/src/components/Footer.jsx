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

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* --- ARCHITECTURAL BACKGROUND --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-600/5 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-12 pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 relative z-10">                   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          
          {/* --- BRAND AUTHORITY --- */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
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

            <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col gap-2 sm:gap-2.5 md:gap-3">
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
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-4 sm:mb-5 md:mb-6 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Curriculums
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {[
                "UPDA Civil",
                "UPDA Mechanical ",
                "UPDA Electrical ",
                "PMP Certification",
                "QCDD Mechanical"
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
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-4 sm:mb-5 md:mb-6 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Platform
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Course Catalog", path: "/courses" },
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
            <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-amber-500 mb-4 sm:mb-5 md:mb-6 flex items-center gap-3 sm:gap-4">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/20"></span> Headquarters
            </h3>
            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
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
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-10">
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
        <div className="border-t border-white/10 mt-8 sm:mt-10 md:mt-14 pt-6 sm:pt-8 md:pt-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Globe className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-slate-700" />
            <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-600">
              &copy; {currentYear} UPDA.QATAR
            </p>
          </div>        
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10">
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