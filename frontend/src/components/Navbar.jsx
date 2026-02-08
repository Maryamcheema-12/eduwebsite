import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, PhoneCall, ChevronDown } from "lucide-react";

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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "UPDA", category: "UPDA" },
    { name: "QCDD", category: "QCDD" },
    { name: "PMP", category: "PROJECT_MANAGEMENT" },
    { name: "Enrollment", path: "/register" },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-white shadow-md py-1" : "bg-white py-2"
      } border-slate-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="bg-slate-900 p-2 rounded-lg group-hover:bg-amber-600 transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none text-slate-900 tracking-tight">UPDA</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Qatar Center</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.category && setActiveDropdown(link.category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.path ? (
                  <Link
                    to={link.path}
                    className={`px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                      location.pathname === link.path ? "text-amber-600" : "text-slate-700 hover:text-amber-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-bold uppercase tracking-wide text-slate-700 hover:text-amber-600 transition-colors">
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.category ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* DROPDOWN */}
                <AnimatePresence>
                  {link.category && activeDropdown === link.category && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 mt-1"
                    >
                      {COURSE_CATEGORIES[link.category].map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-all"
                        >
                          {course.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:block">
            <a
              href="tel:+97433728957"
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-sm"
            >
              <PhoneCall size={14} />
              Call Support
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      className="block text-xl font-black text-slate-900 uppercase tracking-tight"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{link.name}</p>
                      <div className="grid gap-2 pl-4 border-l-2 border-amber-500">
                        {COURSE_CATEGORIES[link.category].map((course) => (
                          <button
                            key={course.id}
                            onClick={() => handleCourseClick(course.id)}
                            className="text-left text-lg font-bold text-slate-700 hover:text-amber-600"
                          >
                            {course.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <a
                href="tel:+97433728957"
                className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase text-sm"
              >
                <PhoneCall size={18} />
                Contact Admissions
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;