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
    duration: "30 Hours",
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
    image: "upda-mechanical.png",
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
    duration: "30 Hours",
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
  "pmp-certification": {
    title: "PMP Certification Training",
    category: "Project Management",
    description: "Authorized PMP training providing the 35 Contact Hours required for the PMP exam. Master the PMBOK 7th Edition processes and Agile methodologies.",
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
  "qcdd-mechanical": {
    title: "QCDD Mechanical Exam",
    category: "QCDD Qatar",
    description: "Specialized coaching for mechanical engineers seeking Fire Safety certification from the Qatar Civil Defense Department.",
    duration: "30 Hours",
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
  "primavera-p6": {
    title: "Primavera P6 Professional",
    category: "Project Management",
    description: "Hands-on project scheduling training using Oracle Primavera P6. Learn to manage complex construction schedules effectively.",
    duration: "40 Hours",
    price: "1500",
    image: "primavera -p6.png",
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
    <div className="min-h-screen bg-white">
      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[70vh] overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-950/80" />
        </div>
        
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <button onClick={() => navigate('/courses')} className="group flex items-center gap-3 text-white/50 hover:text-amber-500 mb-12 transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                Return to Modules
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                 <div className="bg-amber-600 text-white px-5 py-1.5 font-black text-[10px] uppercase tracking-[0.4em] rounded-sm shadow-2xl">
                    {course.category}
                 </div>
                 <span className="w-12 h-[1px] bg-white/20"></span>
                 <div className="flex items-center gap-2 text-white/40 text-[9px] font-bold uppercase tracking-widest">
                    <Layout size={12} /> Live Lab Doha
                 </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white leading-tight mb-10 sm:mb-12 md:mb-14 lg:mb-16 max-w-4xl">
                {course.title}
              </h1>
              
              <div className="flex flex-wrap gap-10 items-center">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-amber-600 transition-colors">
                    <Clock className="w-6 h-6 text-amber-500 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Training Span</span>
                    <span className="text-white font-bold text-xl uppercase tracking-tighter">{course.duration}</span>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-amber-600 transition-colors">
                    <Globe className="w-6 h-6 text-amber-500 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Regional Hub</span>
                    <span className="text-white/70 text-xl font-bold uppercase tracking-tighter">Doha, Qatar</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURAL LAYOUT --- */}
      <section className="relative z-20 -mt-24 pb-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 md:p-20 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] rounded-[4rem] border border-slate-50">
                
                {/* Section: Overview */}
                <div className="mb-24">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-600 mb-10 sm:mb-12 md:mb-14 flex items-center gap-3 font-black">
                    <Target className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                    Core Objectives
                  </h3>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight sm:leading-tight md:leading-tight font-black mb-8 sm:mb-10 md:mb-12 uppercase tracking-tight">
                    Empowering the Next Generation of <span className="text-amber-600">Qatar's Engineering Leaders.</span>
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed sm:leading-loose font-medium">{course.description}</p>
                </div>

                {/* Section: 3D Roadmap Syllabus */}
                <div className="mb-24">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-12">Academic Roadmap</h3>
                  <div className="grid gap-6">
                    {course.syllabus?.map((item, index) => (
                      <motion.div 
                        whileHover={{ x: 20 }}
                        key={index} 
                        className="flex items-center gap-8 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 group hover:bg-slate-950 transition-all duration-500"
                      >
                        <div className="text-5xl font-black text-amber-500/20 group-hover:text-amber-500 transition-colors">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-black text-lg sm:text-xl md:text-2xl text-slate-900 uppercase tracking-tight group-hover:text-white transition-colors mb-2 sm:mb-3">{item.title}</h4>
                          <p className="text-sm sm:text-base text-slate-600 font-medium group-hover:text-slate-300 transition-colors leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <Zap className="text-amber-500" size={24} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enquiry Button Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-24 py-12 text-center border-y border-slate-100"
                >
                  <p className="text-slate-600 font-medium mb-6">Ready to get started with this course?</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/enquiry', { state: { courseName: course.title } })}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    Send Enquiry
                  </motion.button>
                </motion.div>

                {/* Section: Perks */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Institutional Advantages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {course.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4 sm:gap-5">
                        <div className="w-12 sm:w-14 h-12 sm:h-14 bg-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <CheckCircle className="w-6 sm:w-7 h-6 sm:h-7 text-amber-700" />
                        </div>
                        <span className="text-slate-800 font-black uppercase tracking-tight text-xs sm:text-sm leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* --- TECHNICAL SIDEBAR --- */}
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="sticky top-32 space-y-10">
                <div className="bg-slate-950 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-12">Tuition Data</h4>
                  
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

                  <button 
                    onClick={() => navigate('/enquiry', { state: { courseName: course.title } })} 
                    className="group w-full bg-amber-600 text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-white hover:text-slate-950 active:scale-95 shadow-2xl flex items-center justify-center gap-4"
                  >
                    Initialize Admission
                    <Zap size={16} className="fill-white group-hover:fill-slate-950 transition-colors" />
                  </button>
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