import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { Search, LayoutGrid, BookOpen, ChevronRight, GraduationCap, Award } from "lucide-react";

// --- UPDATED PROFESSIONAL DATA REPOSITORY (Synchronized with CourseDetail.js) ---
const COURSES_DATA = [
  {
    id: "upda-civil",
    title: "UPDA Civil Exam Preparation",
    category: "UPDA",
    description: "The definitive prep course for MME/UPDA Civil Engineering licensure. Our curriculum covers Qatar Construction Specifications (QCS 2014) and advanced structural analysis, ensuring success based on past papers from 2012-2025.",
    price: "1200",
    image: "upda-civil.png",
    syllabus: [
      { step: "01", title: "Structural Analysis", desc: "Advanced Eurocodes and Qatar Soil Profiles." },
      { step: "02", title: "QCS 2014 Compliance", desc: "Qatar Construction Specifications and safety codes." },
      { step: "03", title: "Project Management", desc: "Scheduling, Cost Control and MMUP patterns." },
      { step: "04", title: "Final Mock Exam", desc: "Live simulation of the Ministry computer-based test." }
    ],
    features: ["Ministry-Aligned Curriculum", "Documentation Support", "Live Exam Simulators"]
  },
  {
    id: "upda-mechanical",
    title: "UPDA Mechanical Engineering",
    category: "UPDA",
    description: "Expert-led training specifically for Mechanical Engineers. Focuses on HVAC, Fire Protection, and Plumbing systems as per the latest MME exam patterns in Doha.",
   
    price: "1200",
    image: "upda-mechanical.png",
    syllabus: [
      { step: "01", title: "HVAC Systems", desc: "Cooling loads, psychrometry and Kahramaa standards." },
      { step: "02", title: "Fire & Plumbing", desc: "QCDD regulations and water distribution networks." },
      { step: "03", title: "Fluid Mechanics", desc: "Hydraulics, pumps and specialized machinery." },
      { step: "04", title: "MME Mock Test", desc: "Practice with actual technical exam interface." }
    ],
    features: ["Past Paper Analysis", "Face-to-Face Mentorship", "Application Portal Guide"]
  },
  {
    id: "pmp-certification",
    title: "PMP Certification Training",
    category: "PROJECT_MANAGEMENT",
    description: "Authorized PMP training providing the 35 Contact Hours required for the PMP exam. Master the PMBOK 7th Edition processes and Agile methodologies used by global leaders.",
    duration: "35 Hours",
    price: "1500",
    image: "pms-template.png",
    syllabus: [
      { step: "01", title: "People Domain", desc: "Team leadership and stakeholder engagement." },
      { step: "02", title: "Process Domain", desc: "Predictive, Agile and Hybrid project cycles." },
      { step: "03", title: "Business Context", desc: "Organizational compliance and value delivery." },
      { step: "04", title: "Exam Prep", desc: "Comprehensive simulator with 180 questions." }
    ],
    features: ["PMI Authorized Materials", "35 Contact Hours Certificate", "Free Application Review"]
  },
  {
    id: "qcdd-mechanical",
    title: "QCDD Mechanical Exam",
    category: "QCDD",
    description: "Specialized coaching for mechanical engineers seeking Fire Safety certification from the Qatar Civil Defense Department. Covers all NFPA standards and QCDD amendments.",
    duration: "30 Hours",
    price: "1200",
    image: "QCDD-mechanical.png",
    syllabus: [
      { step: "01", title: "QCDD Fire Regulations", desc: "Qatar Civil Defense fire safety amendments." },
      { step: "02", title: "Suppression Systems", desc: "Fire fighting design and NFPA compliance." },
      { step: "03", title: "Smoke Management", desc: "Ventilation and life safety code requirements." },
      { step: "04", title: "QCDD Mock Exam", desc: "Practice with actual Civil Defense test patterns." }
    ],
    features: ["NFPA Aligned Training", "Licensed QCDD Mentors", "Practical Case Studies"]
  },
  {
    id: "upda-electrical",
    title: "UPDA Electrical Engineering",
    category: "UPDA",
    description: "Comprehensive module for Electrical Engineers focusing on Kahramaa regulations, power distribution, and protection systems required for Qatar licensure.",
   
    price: "1200",
    image: "QCDD-electrical.png",
    syllabus: [
      { step: "01", title: "Electrical Machines", desc: "Drives, motors and power system stability." },
      { step: "02", title: "Kahramaa Regs", desc: "Wiring regulations and Qatar power standards." },
      { step: "03", title: "Fault Analysis", desc: "Protection systems and lighting calculations." },
      { step: "04", title: "Electrical Mock", desc: "MME Pattern computer-based examination prep." }
    ],
    features: ["Kahramaa Standards Focus", "High Success Track Record", "Documentation Assistance"]
  },
  {
    id: "primavera-p6",
    title: "Primavera P6 Professional",
    category: "PROJECT_MANAGEMENT",
    description: "Hands-on project scheduling training using Oracle Primavera P6. Learn to manage complex construction schedules and resource allocation effectively.",
    
    price: "1500",
    image: "primavera-p6.png",
    syllabus: [
      { step: "01", title: "WBS & Sequencing", desc: "Creating work breakdown structures and activities." },
      { step: "02", title: "Resource Loading", desc: "Allocation, levelling and cost management." },
      { step: "03", title: "CPM Analysis", desc: "Critical path method and baseline management." },
      { step: "04", title: "Reporting", desc: "Dashboard creation and project monitoring." }
    ],
    features: ["Hands-on Software Access", "Project-Based Learning", "Completion Certificate"]
  }
];

const categories = [
  { value: "ALL", label: "All Curriculums" },
  { value: "UPDA", label: "UPDA MMUP Exams" },
  { value: "QCDD", label: "QCDD Regulations" },
  { value: "PROJECT_MANAGEMENT", label: "Project Management" }
];

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(COURSES_DATA);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);

  // Get category from URL query parameter on component mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    let result = COURSES_DATA;
    if (selectedCategory !== "ALL") {
      result = result.filter(course => course.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCourses(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 pt-20 md:pt-24">
      {/* --- 3D DYNAMIC HERO SECTION --- */}
      <section ref={heroRef} className="relative py-4 md:py-10 lg:py-32 bg-white border-b border-slate-200 overflow-hidden perspective-[1500px] px-4 md:px-6">
        <motion.div style={{ y: y1, rotateX, rotateY: -10 }} className="absolute top-12 sm:top-16 md:top-24 right-[-10%] md:right-[-5%] w-[320px] sm:w-[450px] md:w-[600px] h-[220px] sm:h-[320px] md:h-[400px] opacity-[0.05] hidden lg:block pointer-events-none">
          <div className="w-full h-full bg-slate-900 rounded-3xl sm:rounded-4xl md:rounded-5xl border border-slate-200 shadow-2xl overflow-hidden flex items-center justify-center">
            <GraduationCap size={100} className="w-24 sm:w-32 md:w-[120px] h-24 sm:h-32 md:h-[120px] text-slate-200 opacity-20" />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
                <span className="w-12 md:w-16 h-1 md:h-[2px] bg-amber-600"></span>
                <span className="text-xs md:text-sm font-black uppercase tracking-widest text-amber-600">Educational Catalog</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-8 md:mb-12 leading-tight">
                Professional <br />
                <span className="text-amber-600 font-black">Curriculums.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                Advanced preparation modules strictly aligned with Qatar's MME and QCDD regulatory standards. 
                Achieve your professional licensure with our 2026 updated syllabus.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: 20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.2 }} className="hidden lg:flex justify-end">
              <div className="relative group">
                <div className="absolute -inset-6 bg-amber-500/10 rounded-4xl blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
                <div className="relative h-[420px] w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
                  <img src="upda-civil.png" alt="Courses Poster" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight leading-tight">Professional Courses</h4>
                    <p className="text-lg text-amber-100 font-semibold tracking-wide leading-relaxed">Agency-Level Training</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FILTER INTERFACE --- */}
      <section className="sticky top-0 z-40 bg-white/85 backdrop-blur-2xl border-b border-slate-200 py-6 md:py-8 px-4 md:px-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-5 sm:px-7 md:px-9 py-3 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-black uppercase tracking-wide sm:tracking-widest transition-all rounded-xl border-2 text-nowrap ${
                    selectedCategory === category.value ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-105" : "bg-transparent text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50/50 hover:scale-105"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="relative w-full">
              <Search className="absolute left-5 sm:left-6 md:left-7 top-1/2 -translate-y-1/2 w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-slate-500" />
              <input 
                type="text"
                placeholder="Search by module name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 sm:pl-16 md:pl-18 pr-6 sm:pr-7 md:pr-9 py-3 sm:py-4 md:py-5 bg-slate-50 border-2 border-slate-300 rounded-xl text-sm sm:text-base md:text-lg font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder:text-slate-400 placeholder:font-medium shadow-sm hover:border-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- COURSE GRID --- */}
      <section className="py-4 md:py-10 lg:py-32 px-4 md:px-6 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-24 sm:py-32 md:py-48 text-center">
                <BookOpen className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-slate-200 mx-auto mb-8 sm:mb-10 md:mb-12" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 md:mb-6 uppercase tracking-tight">Module Not Found</h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium tracking-wide">Please refine your filter parameters.</p>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-x-14 lg:gap-y-32">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/course/${course.id}`, { state: course })}
                    className="group cursor-pointer perspective-[1000px]"
                  >
                    <div className="relative transform-gpu transition-all duration-500 group-hover:-translate-y-4">
                        <CourseCard course={course} />
                        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-200 pt-6 sm:pt-7 md:pt-8 gap-4 sm:gap-3">
                          <div className="flex flex-wrap gap-2.5 sm:gap-3">
                            <span className="text-[7px] sm:text-[8px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-amber-700 bg-amber-100 px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-md">Official Prep</span>
                            <span className="text-[7px] sm:text-[8px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-600 bg-slate-150 px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-md">Engr. Ref: 2026</span>
                          </div>
                          <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                            Initialize <ChevronRight size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- CORPORATE CALL TO ACTION --- */}
      <section className="px-4 sm:px-5 md:px-6 mb-16 sm:mb-20 md:mb-28 lg:mb-32">
        <div className="container mx-auto bg-slate-950 rounded-2xl sm:rounded-3xl md:rounded-5xl py-8 sm:py-12 md:py-24 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-16 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-72 sm:w-80 md:w-96 lg:w-[500px] h-72 sm:h-80 md:h-96 lg:h-[500px] bg-amber-600/10 rounded-full blur-3xl md:blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 sm:mb-8 md:mb-12 lg:mb-14 uppercase tracking-tight leading-tight">
              Corporate <span className="text-amber-500 font-black">Group</span> Training
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 md:mb-14 lg:mb-16 font-medium leading-relaxed sm:leading-loose md:leading-relaxed max-w-3xl mx-auto">
              Tailored high-impact coaching solutions for engineering firms across Qatar. 
              Customized schedules and dedicated facility training available.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-8 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 lg:py-8 bg-amber-600 text-white font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs sm:text-sm md:text-base lg:text-lg hover:bg-white hover:text-slate-950 transition-all rounded-full active:scale-95 shadow-2xl shadow-amber-600/40"
            >
              Request Corporate Proposal
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
