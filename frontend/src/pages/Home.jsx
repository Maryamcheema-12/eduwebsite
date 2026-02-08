import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpRight, Award, ShieldCheck, 
  ChevronRight, CheckCircle2, BookOpen, 
  Users, Globe, Star, Target, Zap, 
  Plus, Minus, HelpCircle, Sparkles, ArrowRight, MessageCircle
} from "lucide-react";
import StatsCounter from "../components/StatsCounter";
import CourseCard from "../components/CourseCard";

// --- FULLY SYNCHRONIZED DATA REPOSITORY ---
// Updated to include 'syllabus' and 'features' so Detail page shows full info
const COURSES_DATA = [
  {
    id: "pmp-certification",
    title: "PMP Certification Training",
    category: "Project Management",
    description: "Authorized PMP training providing the 35 Contact Hours required for the PMP exam. Master the PMBOK 7th Edition processes and Agile methodologies.",
    
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
    category: "QCDD Qatar",
    description: "Specialized coaching for mechanical engineers seeking Fire Safety certification from the Qatar Civil Defense Department.",
    
    price: "1200",
    image: "QCDD-mechanical.png",
    syllabus: [
      { step: "01", title: "QCDD Regulations", desc: "Qatar Civil Defense fire safety amendments." },
      { step: "02", title: "Suppression Systems", desc: "Fire fighting design and NFPA compliance." },
      { step: "03", title: "Smoke Management", desc: "Ventilation and life safety code requirements." },
      { step: "04", title: "Mock Exam", desc: "Practice with actual Civil Defense test patterns." }
    ],
    features: ["NFPA Aligned Training", "Licensed QCDD Mentors", "Practical Case Studies"]
  },
  {
    id: "upda-electrical",
    title: "UPDA Electrical Engineering",
    category: "UPDA Qatar",
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

];

const POSTER_CAROUSEL = [
  { id: 1, image: "Template1.png", title: "PMP Certification", subtitle: "Get Certificate in Project Management Excellence" },
  { id: 2, image: "qcddelectrical-template.png", title: "QCDD Electrical", subtitle: "Professional QCDD electrical training Certification" },
  { id: 3, image: "Template3.png", title: "UPDA Civil Engineering", subtitle: "Professioal UPDA civil engineering training Certification" },
  { id: 4, image: "Template4.png", title: "QCDD Mechanical", subtitle: "Professional QCDD mechanical training Certification" },
  { id: 5, image: "Template5.png", title: "Primavera-p6 Certication", subtitle: "Get Certificate in Master Project Primavera-p6 Excellence" },
  { id: 6, image: "Template6.png", title: "Upda Mechanical ", subtitle: "Professional UPDA mechanical training Certification" }
];

const OTHER_PROGRAMS = [
  { id: 1, icon: BookOpen, title: "Online Learning", desc: "Flexible, self-paced modules with live support" },
  { id: 2, icon: Users, title: "Group Workshops", desc: "Interactive sessions with industry experts" },
  { id: 3, icon: Globe, title: "Global Access", desc: "Learn from anywhere with our virtual platform" },
  { id: 4, icon: Sparkles, title: "Certification Ready", desc: "100% exam-focused curriculum and practice tests" }
];

const FAQ_DATA = [
  { question: "Is the UPDA license mandatory for engineers in Qatar?", answer: "Yes, according to Law No. (19) of 2005, all engineers practicing in Qatar must be registered with the Engineers and Consulting Offices Qualifying Committee (MMUP/UPDA)." },
  { question: "What is the success rate of your UPDA training program?", answer: "We maintain a 98.4% first-attempt success rate by providing students with a curriculum based on exclusive past exam paper analysis (2012–2025)." },
  { question: "Do you provide documentation and attestation support?", answer: "Absolutely. We provide complete guidance for university equivalency procedures and degree attestation required for MME registration." },
  { question: "Are the classes available online or in-person?", answer: "We offer hybrid solutions including face-to-face interactive classroom sessions in Doha and live virtual training for maximum flexibility." }
];

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 3D MOUSE PERSPECTIVE LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <div className="bg-white text-slate-900 selection:bg-amber-100 overflow-x-hidden">     
      
      {/* --- HERO SECTION --- */}
      <section 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex items-center bg-white overflow-hidden py-4 md:py-12 lg:py-30"
      >
     

        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10 py-6 md:py-0">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-10 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2.5 md:gap-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6 bg-amber-50 border border-amber-200 px-3 sm:px-4 py-2 md:py-2.5 rounded-full shadow-sm hover:shadow-md transition-shadow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] md:tracking-[0.3em] text-amber-700 leading-relaxed">Qatar's Trusted Training Partner</span>
              </motion.div>

              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.25] sm:leading-[1.2] md:leading-[1.15] lg:leading-[1.1] mb-3 sm:mb-4 md:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Elevate Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Engineering</span> <br className="hidden sm:block" />
                Career in Qatar.
              </motion.h1>

              <motion.p 
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 font-medium leading-relaxed sm:leading-7 md:leading-8 lg:leading-9 max-w-2xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 opacity-95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Master your <span className="text-slate-900 font-bold underline decoration-amber-500 underline-offset-2 sm:underline-offset-3 md:underline-offset-4">UPDA/MMUP</span> exams with exclusive access to past papers (2012–2025). 
                Join the premier training institute in Qatar and fast-track your professional registration.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/courses')}
                  className="px-8 py-5 md:py-6 bg-slate-950 hover:bg-amber-600 text-white font-black text-sm md:text-base uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                >
                  Explore Courses <ArrowUpRight className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/register')}
                  className="px-8 py-5 md:py-6 border-2 border-slate-950 hover:bg-slate-950 text-slate-950 hover:text-white font-black text-sm md:text-base uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Quick Enrollment
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side: Interactive 3D Card */}
            <div className="flex lg:hidden justify-center mt-8 sm:mt-12">
              {/* Mobile Version: Floating Animation */}
              <motion.div
                animate={isMobile ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-full max-w-sm"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  className="relative z-10 bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 rounded-3xl sm:rounded-[2.5rem] transform-gpu"
                >
                  <Award className="w-12 sm:w-16 text-amber-600 mb-6 sm:mb-8" strokeWidth={1} />
                  <div className="space-y-3 sm:space-y-4">
                    {["UPDA MMUP Preparation", "QCDD Electrical & Mech", "PMP Certification Training"].map((text, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 8 }}
                        className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors"
                      >
                        <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-amber-500 flex-shrink-0" />
                        <span className="font-bold text-slate-800 uppercase tracking-tight text-xs sm:text-sm">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 flex justify-between items-end">
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">Success Rate</p>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">98.4%</p>
                    </div>
                    <div className="bg-slate-100 h-2.5 w-20 rounded-full mb-2 overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 2.5, delay: 0.5 }}
                        className="h-full bg-amber-500 w-full" 
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Desktop Version: 3D Card */}
            <div className="hidden lg:flex justify-center relative perspective-[1500px]">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center opacity-10"
               >
                 <div className="w-[550px] h-[550px] border-[1px] border-slate-900 rounded-full" />
                 <div className="absolute w-[450px] h-[450px] border-[1px] border-dashed border-slate-900 rounded-full" />
               </motion.div>

               <motion.div 
                 style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1, ease: "backOut" }}
                 className="relative z-10 bg-gradient-to-br from-white to-slate-50 p-12 lg:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 rounded-[4rem] transform-gpu"
               >
                 <Award className="w-20 lg:w-24 h-20 lg:h-24 text-amber-600 mb-8 lg:mb-10" strokeWidth={1} />
                 <div className="space-y-6 lg:space-y-8">
                   {["UPDA MMUP Preparation", "QCDD Electrical & Mech", "PMP Certification Training"].map((text, i) => (
                     <motion.div 
                       key={i} 
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       whileHover={{ x: 12, scale: 1.02 }}
                       className="flex items-center gap-4 lg:gap-5 bg-slate-50 p-4 lg:p-5 rounded-2xl lg:rounded-3xl border border-slate-100 hover:border-amber-200 transition-colors"
                      >
                       <CheckCircle2 className="w-6 lg:w-7 h-6 lg:h-7 text-amber-500 flex-shrink-0" />
                       <span className="font-bold text-slate-800 uppercase tracking-tight text-sm lg:text-lg leading-snug">{text}</span>
                     </motion.div>
                   ))}
                 </div>
                 <div className="mt-10 lg:mt-14 pt-10 lg:pt-12 border-t border-slate-100 flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Global Success Rate</p>
                      <p className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">98.4%</p>
                    </div>
                    <div className="bg-slate-100 h-3 lg:h-4 w-28 lg:w-32 rounded-full mb-3 overflow-hidden shadow-inner">
                       <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: "0%" }}
                         transition={{ duration: 2.5, delay: 1 }}
                         className="h-full bg-amber-500 w-full" 
                        />
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* --- POSTER CAROUSEL SECTION (Compact) --- */}
      <section className="py-4 md:py-12 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-2 md:px-4 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-2xl border border-slate-200">
              <motion.div 
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex"
              >
                {POSTER_CAROUSEL.map((poster, idx) => (
                  <motion.div 
                    key={idx} 
                    className="w-full flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="relative w-full aspect-[1080/566] overflow-hidden rounded-2xl shadow-2xl border border-slate-200">
                      <img 
                        src={poster.image} 
                        alt={poster.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2 md:p-6 flex flex-col justify-end">
                        <motion.div className="max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          <h4 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight leading-tight">{poster.title}</h4>
                          <p className="text-xs md:text-base lg:text-lg text-amber-100 font-semibold tracking-wide leading-relaxed">{poster.subtitle}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Carousel Controls (Compact) */}
            <div className="flex justify-between items-center mt-4 md:mt-8 gap-2">
              <div className="flex gap-1 md:gap-2">
                {POSTER_CAROUSEL.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full transition-all duration-500 ${
                      currentSlide === idx ? "bg-amber-600 w-6 md:w-10 h-2 md:h-3 shadow-lg shadow-amber-600/50" : "bg-slate-300 w-2 md:w-3 h-2 md:h-3 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-1 md:gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + POSTER_CAROUSEL.length) % POSTER_CAROUSEL.length)}
                  className="p-1 md:p-2 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all shadow-lg"
                >
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 rotate-180" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % POSTER_CAROUSEL.length)}
                  className="p-1 md:p-2 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all shadow-lg"
                >
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>      
      {/* --- ABOUT US SECTION --- */}
      <section className="py-6 md:py-16 lg:py-40 bg-slate-50 overflow-hidden relative border-t border-slate-200">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group perspective-[1000px] order-2 md:order-1"
            >
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="relative z-10 rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl border-2 sm:border-4 md:border-6 lg:border-8 border-white transform-gpu transition-all"
              >
                <img src="about.png" alt="Facility" className="w-full h-48 sm:h-64 md:h-96 lg:h-[550px] xl:h-[650px] object-cover" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, -12, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 -right-4 sm:-right-6 md:-right-8 lg:-right-10 z-20 bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-3xl rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border border-slate-100 max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px]"
              >
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 md:mb-3 lg:mb-4">
                  <div className="bg-amber-100 p-1.5 md:p-2.5 lg:p-3 rounded-xl md:rounded-2xl"><Star className="text-amber-600 w-4 sm:w-5 md:w-6 lg:w-7 h-4 sm:h-5 md:h-6 lg:h-7 fill-amber-600" /></div>
                  <span className="font-black text-slate-900 uppercase tracking-tighter text-sm md:text-lg lg:text-xl">Top Rated</span>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wide md:tracking-widest leading-relaxed italic">Leading Technical Institute in Qatar.</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 order-1 md:order-2"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 mb-2 md:mb-3 lg:mb-4">
                <span className="w-10 sm:w-12 md:w-16 lg:w-20 h-1 md:h-1.5 lg:h-2 bg-amber-600 rounded-full"></span>
                <span className="text-[9px] sm:text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] text-amber-600 leading-relaxed">Academic Blueprint</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-snug md:leading-tight lg:leading-snug uppercase mb-2 sm:mb-3 md:mb-4 lg:mb-5">Bridging <span className="text-amber-600 underline underline-offset-2 sm:underline-offset-3 md:underline-offset-4 lg:underline-offset-6 decoration-amber-600 decoration-2 md:decoration-3 lg:decoration-4">Industry Gaps.</span></h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 leading-relaxed sm:leading-7 md:leading-8 lg:leading-9 font-normal opacity-95 max-w-3xl">We have been the gold standard for engineering licensure in Qatar. Our methodology focuses on high-yield exam patterns, ensuring our candidates lead the nation's infrastructure development.</p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-6 lg:mt-8">
                {[ { icon: Target, title: "Our Mission", desc: "Empowering engineers through technical excellence." }, { icon: Zap, title: "Industry Experts", desc: "Trainers with 15+ years of Middle East experience." } ].map((box, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-3 md:space-y-4 lg:space-y-5 group p-4 sm:p-5 md:p-6 lg:p-8 bg-slate-50 rounded-2xl md:rounded-3xl hover:bg-amber-50 transition-all duration-300 border border-slate-100 hover:border-amber-200"
                  >
                    <div className="w-12 sm:w-14 md:w-16 lg:w-20 h-12 sm:h-14 md:h-16 lg:h-20 bg-white shadow-lg rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center group-hover:bg-amber-600 transition-all duration-300">
                        <box.icon className="w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10 text-amber-600 group-hover:text-white" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-black text-slate-900 uppercase tracking-wider md:tracking-widest text-xs sm:text-sm md:text-base lg:text-lg leading-tight">{box.title}</h4>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-600 font-medium leading-relaxed md:leading-7 lg:leading-8 opacity-90">{box.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- COURSE GRID SECTION --- */}
      <section className="py-6 md:py-16 lg:py-40 bg-white border-t border-slate-200">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-14 lg:mb-18 gap-4 sm:gap-6 md:gap-8 lg:gap-10 border-b-2 border-slate-200 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
            <div className="max-w-3xl flex-1">
              <h2 className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-black text-amber-600 uppercase tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] mb-3 md:mb-4 lg:mb-6 leading-relaxed">The Catalog</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 uppercase leading-snug lg:leading-snug">Professional Specializations</h3>
            </div>
            <motion.button 
              whileHover={{ gap: "1.5rem" }}
              onClick={() => navigate('/courses')} 
              className="flex items-center gap-2 sm:gap-3 md:gap-4 font-black text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] text-slate-500 hover:text-amber-600 transition-all group whitespace-nowrap px-3 sm:px-4 py-2 md:py-3 rounded-lg hover:bg-amber-50"
            >
              View All <ChevronRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {COURSES_DATA.map((course, idx) => (
              <motion.div 
                key={course.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }} 
                viewport={{ once: true }} 
                onClick={() => navigate(`/course/${course.id}`, { state: course })} 
                className="group cursor-pointer perspective-[1000px]"
              >
                <motion.div whileHover={{ rotateY: isMobile ? 0 : 10, y: -8 }} className="transform-gpu transition-all">
                  <CourseCard course={course} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OTHER PROGRAMS SECTION --- */}
      <section className="py-6 md:py-16 lg:py-40 bg-slate-900 text-white overflow-hidden relative border-t border-slate-200">
        <motion.div className="absolute inset-0 opacity-5">
          <img src="https://www.expedia.com/Qatar.dx149" alt="abstract" className="w-full h-full object-cover" />
        </motion.div>
        
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-16 lg:mb-20">
            <h2 className="text-[9px] sm:text-xs font-black text-amber-400 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-5 lg:mb-8 leading-relaxed">More Offerings</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase leading-snug lg:leading-snug">
              Additional <span className="text-amber-400">Learning Paths</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {OTHER_PROGRAMS.map((program, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-5 sm:p-6 md:p-7 lg:p-8 bg-slate-800/50 backdrop-blur border border-amber-500/20 rounded-xl sm:rounded-2xl md:rounded-3xl hover:border-amber-500/50 hover:bg-slate-700/60 transition-all duration-300"
              >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-11 sm:w-12 md:w-14 lg:w-16 h-11 sm:h-12 md:h-14 lg:h-16 bg-amber-500/10 border border-amber-500/30 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 lg:mb-4 group-hover:bg-amber-500/20 transition-all"
              >
                  <program.icon className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 text-amber-400" />
                </motion.div>
                <h4 className="font-bold text-sm md:text-base lg:text-lg uppercase tracking-wide mb-1 md:mb-2 lg:mb-3 text-white leading-snug">{program.title}</h4>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-300 leading-relaxed md:leading-7 font-normal">{program.desc}</p>
                <motion.div className="mt-2 md:mt-3 lg:mt-4 flex items-center gap-1.5 text-amber-400 font-bold text-[9px] md:text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-6 md:py-16 lg:py-40 bg-white border-t border-slate-200">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12 max-w-5xl">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 space-y-1.5 md:space-y-2 lg:space-y-3">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="flex justify-center">
                <HelpCircle className="w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 text-amber-600 mb-4 md:mb-6 lg:mb-8" strokeWidth={1} />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight uppercase leading-snug lg:leading-[1.15]">Curriculum <span className="text-amber-600">Support.</span></h3>
              <p className="text-slate-500 font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] text-[8px] sm:text-[9px] md:text-xs lg:text-sm leading-normal">Answers to your professional technical queries</p>
          </div>
          <div className="grid gap-2 md:gap-3 lg:gap-4">
            {FAQ_DATA.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={false}
                className="group border border-slate-100 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] overflow-hidden transition-all hover:border-amber-200 hover:shadow-lg md:hover:shadow-2xl hover:shadow-amber-900/5"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 lg:p-8 text-left bg-gradient-to-r from-slate-50/80 to-white group-hover:from-amber-50/50 group-hover:to-amber-50/30 transition-all outline-none gap-3 md:gap-4 lg:gap-6"
                >
                  <span className={`font-bold uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-xl transition-colors leading-snug md:leading-normal lg:leading-tight ${openFaq === idx ? "text-amber-600" : "text-slate-900"}`}>
                    {faq.question}
                  </span>
                  <motion.div 
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    className={`p-1.5 md:p-2 lg:p-3 rounded-full transition-all flex-shrink-0 ${openFaq === idx ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"}`}
                  >
                    {openFaq === idx ? <Minus size={18} strokeWidth={2.5} className="md:w-5 md:h-5 lg:w-6 lg:h-6" /> : <Plus size={18} strokeWidth={2.5} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-6 pt-3 sm:px-5 sm:pb-7 sm:pt-4 md:px-6 md:pb-8 md:pt-5 lg:px-8 lg:pb-10 lg:pt-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-700 leading-relaxed sm:leading-7 md:leading-8 lg:leading-9 font-normal bg-white border-t border-slate-100">
                        "{faq.answer}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <motion.a
        href="https://wa.me/923488644868?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20professional%20training%20programs."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-12 right-5 sm:right-6 md:right-8 lg:right-12 z-50 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl hover:shadow-green-500/60 transition-all duration-300"
      >
        <MessageCircle className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8" />
      </motion.a>

      {/* --- FLOATING BUTTON TOOLTIP --- */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-5 sm:right-6 md:right-8 lg:right-12 z-50 bg-slate-900/95 backdrop-blur text-white px-3 sm:px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg text-[10px] sm:text-xs md:text-sm lg:text-base font-bold whitespace-nowrap shadow-lg opacity-0 pointer-events-none hover:opacity-100"
      >
        Chat with us on WhatsApp
      </motion.div>
    </div>
  );
};

export default Home;
