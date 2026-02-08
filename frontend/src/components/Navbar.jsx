import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, PhoneCall, ChevronRight, ChevronDown } from "lucide-react";

// Course data for dropdowns
const COURSE_CATEGORIES = {
  UPDA: [
    { name: "UPDA Civil Exam", id: "upda-civil" },
    { name: "UPDA Mechanical", id: "upda-mechanical" },
    { name: "UPDA Electrical", id: "upda-electrical" }
  ],
  QCDD: [
    { name: "QCDD Mechanical Exam", id: "qcdd-mechanical" }
  ],
  PROJECT_MANAGEMENT: [
    { name: "PMP Certification", id: "pmp-certification" },
    { name: "Primavera P6", id: "primavera-p6" }
  ]
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Handle scroll effect for glass-morphism transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "UPDA", category: "UPDA" },
    { name: "QCDD", category: "QCDD" },
    { name: "Project Management", category: "PROJECT_MANAGEMENT" },
    { name: "Enrollment", path: "/register" },
  ];
  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    setOpenDropdown(null);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHomePage
          ? scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 py-2 sm:py-3 shadow-lg"
            : "bg-gradient-to-b from-black/40 to-transparent py-4 sm:py-6 backdrop-blur-sm"
          : "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-2 sm:py-3 shadow-lg"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between min-h-16 sm:h-16 md:h-[70px]">
          
          {/* --- LOGO ARCHITECTURE --- */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 group shrink-0" data-testid="nav-logo">
            <div className="relative">
              <div className={`${
                isHomePage
                  ? scrolled ? 'bg-slate-900' : 'bg-white/20 backdrop-blur-sm'
                  : 'bg-slate-100'
              } p-2 sm:p-2.5 rounded-lg sm:rounded-xl group-hover:bg-amber-600 transition-all duration-500 shadow-lg`}>
                <GraduationCap className={`${
                  isHomePage
                    ? scrolled ? 'w-5 h-5 sm:w-6 sm:h-6 text-white' : 'w-4 h-4 sm:w-5 sm:h-5 text-white'
                    : 'w-5 h-5 sm:w-6 sm:h-6 text-slate-900'
                }`} />
              </div>
              {/* Status Indicator */}
              <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-amber-500 rounded-full animate-pulse ${
                isHomePage ? "border-2 border-white" : "border-2 border-slate-900"
              }`} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`font-black text-base sm:text-lg sm:text-xl md:text-2xl uppercase tracking-tighter leading-none italic ${
                isHomePage
                  ? scrolled ? 'text-slate-900' : 'text-white'
                  : 'text-slate-900'
              }`}>
                UPDA
              </span>
              <span className={`text-[6px] sm:text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] sm:tracking-[0.3em] mt-0.5 ${
                isHomePage
                  ? scrolled ? 'text-amber-600' : 'text-amber-300'
                  : 'text-amber-600'
              }`}>
                Examination Qatar
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            <div className="flex items-center gap-4 lg:gap-6 xl:gap-8 border-r border-slate-200/30 pr-6 lg:pr-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path || link.category}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative group"
                >
                  {link.path ? (
                    <Link
                      to={link.path}
                      className={`relative text-[10px] lg:text-[11px] xl:text-xs font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-all py-1 ${
                        isHomePage
                          ? scrolled
                            ? isActive(link.path) ? "text-amber-600" : "text-slate-600 hover:text-slate-900"
                            : isActive(link.path) ? "text-amber-400" : "text-white/70 hover:text-white"
                          : isActive(link.path) ? "text-amber-600" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.category ? null : link.category)}
                      className={`relative text-[10px] lg:text-[11px] xl:text-xs font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-all flex items-center gap-1.5 lg:gap-2 group py-1 ${
                        isHomePage
                          ? scrolled
                            ? "text-slate-600 hover:text-slate-900"
                            : "text-white/70 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={13} className={`transition-transform duration-300 ${openDropdown === link.category ? "rotate-180" : ""}`} />
                    </button>
                  )}
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.category && openDropdown === link.category && (
                      <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-4 w-56 lg:w-64 bg-white border border-slate-200/50 rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden backdrop-blur-sm"
                      >
                        {COURSE_CATEGORIES[link.category].map((course, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleCourseClick(course.id)}
                            className="w-full text-left px-6 py-3.5 lg:py-4 text-sm lg:text-base font-bold text-slate-700 hover:bg-amber-50/80 hover:text-amber-600 transition-all border-b border-slate-100 last:border-b-0 active:scale-95"
                          >
                            {course.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="tel:+97433728957"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 lg:gap-3 px-5 lg:px-6 xl:px-7 py-2.5 lg:py-3 rounded-full font-black text-[9px] lg:text-[10px] xl:text-xs uppercase tracking-widest transition-all shadow-lg ${
                isHomePage
                  ? scrolled
                    ? "bg-slate-900 text-white hover:bg-amber-600 shadow-slate-200/50"
                    : "bg-white/20 text-white hover:bg-amber-600 shadow-black/20 backdrop-blur-sm border border-white/30"
                  : "bg-slate-900 text-white hover:bg-amber-600 shadow-slate-200/50 border border-slate-900"
              }`}
            >
              <PhoneCall className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              <span>Direct Line</span>
            </motion.a>
          </div>

          {/* --- MOBILE TRIGGER --- */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`md:hidden p-2 sm:p-2.5 rounded-lg transition-all ${
              isHomePage
                ? scrolled
                  ? "text-slate-900 hover:text-amber-600 hover:bg-slate-100"
                  : "text-white hover:text-amber-300 hover:bg-white/10"
                : "text-slate-900 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            {isOpen ? <X size={24} className="sm:w-6 sm:h-6" /> : <Menu size={24} className="sm:w-6 sm:h-6" />}
          </motion.button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY (CINEMATIC) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 h-screen w-full z-[110] md:hidden px-4 sm:px-6 py-4 sm:py-6 flex flex-col overflow-y-auto ${
              isHomePage
                ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-12 sm:mb-16">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={`flex flex-col gap-0.5 ${isHomePage ? "text-white" : "text-slate-900"}`}
               >
                  <span className={`font-black text-2xl sm:text-3xl uppercase italic tracking-tighter leading-none ${isHomePage ? "text-white" : "text-slate-900"}`}>UPDA</span>
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Exam Center Qatar</span>
               </motion.div>
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setIsOpen(false)}
                 className={`p-2 sm:p-2.5 rounded-lg transition-all ${
                   isHomePage
                     ? "text-white bg-white/10 hover:bg-white/20"
                     : "text-slate-900 bg-slate-100 hover:bg-slate-200"
                 }`}
               >
                 <X size={20} className="sm:w-6 sm:h-6" />
               </motion.button>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8 mb-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path || link.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  {link.path ? (
                    <Link
                      to={link.path}
                      className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center justify-between group py-2 transition-all ${
                        isHomePage
                          ? isActive(link.path) ? "text-amber-400" : "text-white/50 hover:text-white"
                          : isActive(link.path) ? "text-amber-600" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ChevronRight className={`w-6 h-6 sm:w-7 sm:h-7 opacity-0 group-hover:opacity-100 transition-all ${isActive(link.path) ? "opacity-100 translate-x-0" : "-translate-x-4"}`} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.category ? null : link.category)}
                      className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center justify-between group w-full py-2 transition-all ${
                        isHomePage
                          ? "text-white/50 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ChevronRight className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${openDropdown === link.category ? "rotate-90" : ""}`} />
                    </button>
                  )}
                  
                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {link.category && openDropdown === link.category && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 sm:mt-6 ml-6 sm:ml-8 space-y-3 sm:space-y-4 border-l-2 border-amber-500 pl-4 sm:pl-6"
                      >
                        {COURSE_CATEGORIES[link.category].map((course, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleCourseClick(course.id)}
                            className={`text-lg sm:text-xl font-bold transition-all text-left block active:scale-95 py-1 ${
                              isHomePage
                                ? "text-amber-300 hover:text-amber-200"
                                : "text-amber-600 hover:text-amber-700"
                            }`}
                          >
                            {course.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className={`mt-auto space-y-4 sm:space-y-6 pt-8 border-t ${
              isHomePage ? "border-white/10" : "border-slate-200"
            }`}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center ${
                  isHomePage ? "text-slate-400" : "text-slate-500"
                }`}
              >
                📞 Contact Admissions
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+97433728957"
                className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm shadow-2xl shadow-amber-900/30 active:scale-95 transition-all"
              >
                <PhoneCall size={16} className="sm:w-5 sm:h-5" />
                <span>Call Now</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;