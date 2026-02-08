import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  Clock, CheckCircle, ArrowLeft, ShieldCheck, 
  Globe, GraduationCap, Zap, FileText, Layout, Target, Send
} from "lucide-react";

// --- FULLY SYNCHRONIZED DATA REPOSITORY ---
const COURSES_DATA = {
  "upda-civil": {
    title: "UPDA Civil Exam Preparation",
    category: "UPDA Qatar",
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
  "upda-mechanical": {
    title: "UPDA Mechanical Engineering",
    category: "UPDA Qatar",
    description: "Expert-led training specifically for Mechanical Engineers. Focuses on HVAC, Fire Protection, and Plumbing systems as per the latest MME exam patterns in Doha.",
    duration: "30 Hours",
    price: "1200",
    image: "template3.png",
    syllabus: [
      { step: "01", title: "HVAC Systems", desc: "Cooling loads, psychrometry and Kahramaa standards." },
      { step: "02", title: "Fire & Plumbing", desc: "QCDD regulations and water distribution networks." },
      { step: "03", title: "Fluid Mechanics", desc: "Hydraulics, pumps and specialized machinery." },
      { step: "04", title: "MME Mock Test", desc: "Practice with actual technical exam interface." }
    ],
    features: ["Past Paper Analysis", "Face-to-Face Mentorship", "Application Portal Guide"]
  },
  "upda-electrical": {
    title: "UPDA Electrical Engineering",
    category: "UPDA Qatar",
    description: "Comprehensive module for Electrical Engineers focusing on Kahramaa regulations, power distribution, and protection systems required for Qatar licensure.",
    
    price: "1200",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    syllabus: [
      { step: "01", title: "Electrical Machines", desc: "Drives, motors and power system stability." },
      { step: "02", title: "Kahramaa Regs", desc: "Wiring regulations and Qatar power standards." },
      { step: "03", title: "Fault Analysis", desc: "Protection systems and lighting calculations." },
      { step: "04", title: "Electrical Mock", desc: "MME Pattern computer-based examination prep." }
    ],
    features: ["Kahramaa Standards Focus", "High Success Track Record", "Documentation Assistance"]
  },
  "pmp-certification": {
    title: "PMP Certification Training",
    category: "Project Management",
    description: "Authorized PMP training providing the 35 Contact Hours required for the PMP exam. Master the PMBOK 7th Edition processes and Agile methodologies.",
    duration: "35 Hours",
    price: "1500",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    syllabus: [
      { step: "01", title: "People Domain", desc: "Team leadership and stakeholder engagement." },
      { step: "02", title: "Process Domain", desc: "Predictive, Agile and Hybrid project cycles." },
      { step: "03", title: "Business Context", desc: "Organizational compliance and value delivery." },
      { step: "04", title: "Exam Prep", desc: "Comprehensive simulator with 180 questions." }
    ],
    features: ["PMI Authorized Materials", "35 Contact Hours Certificate", "Free Application Review"]
  },
  "qcdd-mechanical": {
    title: "QCDD Mechanical Exam",
    category: "QCDD Qatar",
    description: "Specialized coaching for mechanical engineers seeking Fire Safety certification from the Qatar Civil Defense Department.",
    duration: "30 Hours",
    price: "1200",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    syllabus: [
      { step: "01", title: "QCDD Regulations", desc: "Qatar Civil Defense fire safety amendments." },
      { step: "02", title: "Suppression Systems", desc: "Fire fighting design and NFPA compliance." },
      { step: "03", title: "Smoke Management", desc: "Ventilation and life safety code requirements." },
      { step: "04", title: "Mock Exam", desc: "Practice with actual Civil Defense test patterns." }
    ],
    features: ["NFPA Aligned Training", "Licensed QCDD Mentors", "Practical Case Studies"]
  },
  "primavera-p6": {
    title: "Primavera P6 Professional",
    category: "Project Management",
    description: "Hands-on project scheduling training using Oracle Primavera P6. Learn to manage complex construction schedules effectively.",
    duration: "40 Hours",
    price: "1500",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    syllabus: [
      { step: "01", title: "WBS & Sequencing", desc: "Creating work breakdown structures and activities." },
      { step: "02", title: "Resource Loading", desc: "Allocation, levelling and cost management." },
      { step: "03", title: "CPM Analysis", desc: "Critical path method and baseline management." },
      { step: "04", title: "Reporting", desc: "Dashboard creation and project monitoring." }
    ],
    features: ["Hands-on Software Access", "Project-Based Learning", "Completion Certificate"]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state || COURSES_DATA[id];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!course) navigate('/courses');
  }, [course, navigate]);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                 <div className="bg-amber-600 text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] rounded-sm shadow-2xl">
                    {course.category}
                 </div>
                 <span className="w-8 h-[1px] bg-white/20 hidden sm:block"></span>
                 <div className="flex items-center gap-2 text-white/60 text-[8px] sm:text-[9px] md:text-xs font-bold uppercase tracking-widest">
                    <Layout size={12} /> Live Lab Doha
                 </div>
              </div>              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight uppercase text-white leading-tight">
                {course.title}
              </h1>              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed sm:leading-loose font-medium max-w-3xl mx-auto">
                {course.description}
              </p>              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 pt-4 sm:pt-6 md:pt-8">
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-amber-600 group-hover:border-amber-600 transition-all">
                    <Clock className="w-5 h-5 text-amber-400 group-hover:text-white" />
                  </div>                  
                </div>
                <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-amber-600 group-hover:border-amber-600 transition-all">
                    <Globe className="w-5 h-5 text-amber-400 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Location</span>
                    <span className="text-white/80 text-lg font-bold uppercase tracking-tight">Doha, Qatar</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 sm:pt-8 md:pt-10 border-t border-white/10">
                <button onClick={() => navigate('/courses')} className="group inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-all text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1.5 transition-transform" />
                  Back to Courses
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- ARCHITECTURAL LAYOUT --- */}
      <section className="relative z-20 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-20 sm:pb-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-20">            
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 sm:p-12 md:p-16 lg:p-20 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] rounded-[2.5rem] md:rounded-[4rem] border border-slate-50">                
                {/* Section: Overview */}
                <div className="mb-16 sm:mb-20 md:mb-24">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-600 mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 sm:gap-3">
                    <Target className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
                    Core Objectives
                  </h3>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight sm:leading-snug md:leading-tight font-black mb-5 sm:mb-6 md:mb-8 uppercase tracking-tight">
                    Empowering <span className="text-amber-600">Qatar's</span> Next-Gen <span className="text-amber-600">Engineers.</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed sm:leading-loose md:leading-loose font-medium">{course.description}</p>
                </div>
                {/* Section: Curriculum Roadmap */}
                <div className="mb-16 sm:mb-20 md:mb-24">
                  <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-600 to-transparent"></div>
                    <h3 className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-amber-600 px-3 whitespace-nowrap">Curriculum Roadmap</h3>
                    <div className="flex-1 h-0.5 bg-gradient-to-l from-amber-600 to-transparent"></div>
                  </div>
                  <div className="grid gap-3 sm:gap-4 md:gap-5">
                    {course.syllabus?.map((item, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -2 }}
                        className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-200 hover:border-amber-300 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 flex items-start gap-4 sm:gap-5 md:gap-6 bg-white group-hover:bg-amber-50/30 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                              <span className="text-lg sm:text-xl md:text-2xl font-black text-white">{item.step}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm sm:text-base md:text-lg text-slate-900 uppercase tracking-tight group-hover:text-amber-700 transition-colors mb-1 sm:mb-1.5 md:mb-2">{item.title}</h4>
                            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                          <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Enquiry Button Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16 sm:mb-20 md:mb-24 py-8 sm:py-10 md:py-12 text-center border-y border-slate-100"
                >
                  <p className="text-slate-600 font-medium mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base">Ready to advance your engineering career?</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/enquiry', { state: { courseName: course.title } })}
                    className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    Send Enquiry
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
            {/* --- TECHNICAL SIDEBAR --- */}
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="sticky top-32 space-y-10">
                <div className="bg-slate-950 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" /> 
                  <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-12">Tuition Data</h2>
                  <div className="space-y-12 mb-16">
                    <div className="pb-10 border-b border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Course Investment</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-amber-500 tracking-tighter">{course.price}</span>
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">QAR</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <ShieldCheck className="text-amber-500" size={32} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Licensure</p>
                            <p className="font-bold text-lg uppercase tracking-tight leading-none">MME Verified Prep</p>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Requirements Card */}
                <div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] relative overflow-hidden">
                  <FileText className="text-slate-200 absolute -bottom-10 -right-10 w-40 h-40 opacity-20" />
                  <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-amber-600 mb-8">Documentation Req.</h5>
                  <ul className="space-y-4">
                     {["Degree Attestation", "Qatar ID (QID)", "MME Portal Access", "Police Clearance"].map((req, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-700 tracking-tighter">
                           <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                           {req}
                        </li>
                     ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CourseDetail;