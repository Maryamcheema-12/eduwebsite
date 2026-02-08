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
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "UPDA", category: "UPDA" },
    { name: "QCDD", category: "QCDD" },
    { name: "Project Management", category: "PROJECT_MANAGEMENT" },
    { name: "Enrollment", path: "/register" },
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <nav className="relative w-full bg-white border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg text-slate-900 uppercase tracking-tighter italic">
                UPDA
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-600">
                Examination Qatar
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative px-3">
                  {link.path ? (
                    <Link
                      to={link.path}
                      className={`text-[11px] font-bold uppercase tracking-wider transition-colors py-2 ${
                        location.pathname === link.path ? "text-amber-600" : "text-slate-700 hover:text-amber-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="relative">
                      <button
                        onMouseEnter={() => setOpenDropdown(link.category)}
                        onClick={() => setOpenDropdown(openDropdown === link.category ? null : link.category)}
                        className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 py-2 transition-colors ${
                            openDropdown === link.category ? "text-amber-600" : "text-slate-700 hover:text-amber-600"
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={12} className={`transition-transform ${openDropdown === link.category ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {openDropdown === link.category && (
                          <>
                            {/* Backdrop to close dropdown on click outside */}
                            <div className="fixed inset-0 z-[-1]" onClick={() => setOpenDropdown(null)} />
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              className="absolute left-0 mt-2 w-52 bg-white border border-slate-100 shadow-2xl rounded-lg overflow-hidden py-1"
                            >
                              {COURSE_CATEGORIES[link.category].map((course) => (
                                <button
                                  key={course.id}
                                  onClick={() => handleCourseClick(course.id)}
                                  className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                                >
                                  {course.name}
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <a
              href="tel:+97433728957"
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95 shadow-sm"
            >
              <PhoneCall size={12} />
              <span>Direct Line</span>
            </a>
          </div>

          {/* --- MOBILE TRIGGER --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-900 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-50"
          >
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="py-1">
                  {link.path ? (
                    <Link
                      to={link.path}
                      className="block px-2 py-2 text-sm font-bold text-slate-800 uppercase"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.category ? null : link.category)}
                        className="flex items-center justify-between w-full px-2 py-2 text-sm font-bold text-slate-800 uppercase"
                      >
                        {link.name}
                        <ChevronDown size={16} className={openDropdown === link.category ? "rotate-180" : ""} />
                      </button>
                      
                      {openDropdown === link.category && (
                        <div className="ml-4 border-l-2 border-amber-500 bg-slate-50 rounded-r-md">
                          {COURSE_CATEGORIES[link.category].map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:text-amber-600"
                            >
                              {course.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <a
                  href="tel:+97433728957"
                  className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs"
                >
                  <PhoneCall size={16} />
                  Call Admissions
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;