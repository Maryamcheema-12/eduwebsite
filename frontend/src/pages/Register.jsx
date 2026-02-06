import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { 
  Send, MapPin, CheckCircle2, FileDown, 
  Fingerprint, Activity, Upload, FileText, X, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

const COURSES_LIST = [
  "UPDA Civil Exam Preparation",
  "UPDA Mechanical Engineering",
  "UPDA Electrical Engineering",
  "PMP Certification Training",
  "QCDD Mechanical Exam",
  "Primavera P6 Professional"
];

const Register = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const heroRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course_interest: location.state?.course || "",
    message: ""
  });

  // --- 3D MOUSE PERSPECTIVE LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
    toast.success(`${uploadedFiles.length} Document(s) Staged`);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // --- WHATSAPP REDIRECT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const whatsappNumber = "923488644868"; // Your verified number
    
    // Constructing professional WhatsApp message with URL Encoding
    const message = `*NEW ADMISSION REQUEST*%0A` +
                    `--------------------------%0A` +
                    `*Name:* ${formData.name}%0A` +
                    `*Phone:* ${formData.phone}%0A` +
                    `*Course:* ${formData.course_interest}%0A` +
                    `*Message:* ${formData.message}%0A` +
                    `*Staged Files:* ${files.length} document(s)`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSubmitted(true);
      setLoading(false);
      toast.success("Redirecting to WhatsApp Admissions...");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 overflow-x-hidden">
      
      {/* --- 3D HERO --- */}
      <section ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} className="relative pt-40 sm:pt-48 md:pt-56 lg:pt-64 pb-28 sm:pb-32 md:pb-40 bg-white border-b border-slate-100 perspective-[1500px]">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]" />
        <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 bg-slate-950 text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full">
                <Activity className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-amber-500 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]">Institutional Intake 2026</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black text-slate-900 mb-8 sm:mb-10 md:mb-12 lg:mb-14 uppercase leading-tight tracking-tight">Secure <br /><span className="text-amber-600 underline decoration-slate-200 underline-offset-4 sm:underline-offset-6 md:underline-offset-8">Entry.</span></h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-slate-600 font-medium leading-relaxed sm:leading-loose md:leading-relaxed max-w-2xl mb-10 sm:mb-12 md:mb-14">Official enrollment for specialized Engineering licensure programs in Qatar. Your professional validation begins here.</p>
            </motion.div>

            <div className="hidden lg:flex justify-end">
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-[480px] xl:w-[520px] h-[320px] xl:h-[360px] bg-slate-950 rounded-3xl xl:rounded-4xl shadow-3xl border border-slate-800 p-12 xl:p-14 overflow-hidden">
                    <div style={{ transform: "translateZ(80px)" }} className="relative z-10 flex flex-col h-full justify-between">
                        <Fingerprint size={64} className="text-amber-500" />
                        <div><h3 className="text-white font-black text-2xl xl:text-3xl uppercase tracking-tight leading-tight">Encapsulated Data</h3><p className="text-slate-400 text-[9px] xl:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.25em] mt-1 xl:mt-2">AES-256 Bit Registration Security</p></div>
                    </div>
                    <div className="absolute top-0 right-0 w-72 md:w-80 lg:w-96 h-72 md:h-80 lg:h-96 bg-amber-600/20 rounded-full blur-[100px]" />
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERFACE --- */}
      <section className="py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20">
            
            {/* LIVE MAP */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5">
              <div className="rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl border border-slate-100 h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] relative group sticky top-32">
                <iframe 
                  title="Doha Hub"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115440.03816556114!2d51.442318!3d25.286106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                  allowFullScreen="" loading="lazy"
                />
                <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-6 sm:left-8 md:left-10 right-6 sm:right-8 md:right-10">
                    <div className="bg-slate-950/95 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-4xl text-white shadow-2xl">
                        <MapPin className="text-amber-500 mb-3 sm:mb-4 md:mb-5" size={32} />
                        <h4 className="font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight mb-1.5 sm:mb-2 md:mb-3">Doha Head Office</h4>
                        <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em]">Sadd District, Business Hub, Qatar</p>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7">
              <div className="bg-white border border-slate-100 p-8 sm:p-10 md:p-14 lg:p-16 rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-xl">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 sm:py-24 md:py-32">
                      <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 md:mb-14"><CheckCircle2 className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-green-600" /></div>
                      <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 mb-6 sm:mb-8 md:mb-10 tracking-tight">Data Sent.</h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-lg mx-auto font-medium leading-relaxed mb-10 sm:mb-12 md:mb-16">Continue the conversation on WhatsApp to finalize your seat.</p>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSubmitted(false)} className="mt-8 sm:mt-10 md:mt-14 bg-slate-900 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl md:rounded-3xl font-black uppercase text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] shadow-lg hover:bg-amber-600 transition-all">New Entry</motion.button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
                      <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                          <label className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-slate-500 block">Full Name</label>
                          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full py-4 sm:py-5 md:py-6 border-b-2 border-slate-300 focus:border-amber-600 outline-none font-black text-lg sm:text-xl md:text-2xl text-slate-900 placeholder:text-slate-400 transition-colors" placeholder="YOUR NAME" />
                        </div>
                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                          <label className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-slate-500 block">WhatsApp Number</label>
                          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full py-4 sm:py-5 md:py-6 border-b-2 border-slate-300 focus:border-amber-600 outline-none font-black text-lg sm:text-xl md:text-2xl text-slate-900 placeholder:text-slate-400 transition-colors" placeholder="+974 XXXX XXXX" />
                        </div>
                      </div>

                      <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <label className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-slate-500 block">Program Interest</label>
                        <select name="course_interest" required value={formData.course_interest} onChange={handleChange} className="w-full py-4 sm:py-5 md:py-6 border-b-2 border-slate-300 focus:border-amber-600 outline-none font-black text-lg sm:text-xl md:text-2xl text-slate-900 bg-transparent placeholder:text-slate-400 transition-colors">
                          <option value="">Select Specialization</option>
                          {COURSES_LIST.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div className="space-y-6 sm:space-y-7 md:space-y-8">
                        <label className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-slate-500 block">Upload Credentials (QID/Degree)</label>
                        <div className="relative group cursor-pointer">
                          <input type="file" multiple onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                          <div className="border-2 border-dashed border-slate-300 rounded-2xl sm:rounded-3xl md:rounded-4xl p-12 sm:p-14 md:p-16 text-center group-hover:border-amber-500 group-hover:bg-amber-50/30 transition-all bg-slate-50">
                            <Upload className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-slate-400 mx-auto mb-6 sm:mb-8 md:mb-10 group-hover:text-amber-600 transition-colors" />
                            <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-600 leading-relaxed">Drag files here or click to browse</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                          {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-slate-900 rounded-lg sm:rounded-xl md:rounded-2xl text-white">
                              <span className="text-[8px] sm:text-[9px] md:text-xs font-bold truncate max-w-[80px] sm:max-w-[100px]">{file.name}</span>
                              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} type="button" onClick={() => removeFile(i)}><X size={16}/></motion.button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-slate-950 text-white py-5 sm:py-6 md:py-7 lg:py-8 rounded-xl sm:rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-xs sm:text-sm md:text-base transition-all hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-3 sm:gap-4 shadow-lg">
                        {loading ? "Redirecting..." : "Finalize via WhatsApp"}
                        <Send className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRUST --- */}
      <section className="pb-20 sm:pb-24 md:pb-32 lg:pb-40 container mx-auto px-4 sm:px-5 md:px-6 text-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 md:gap-24 lg:gap-32">
           <div className="flex items-center gap-3 sm:gap-4 md:gap-5 font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase italic text-slate-900 underline decoration-amber-500 decoration-4 md:decoration-[5px] tracking-tight">ISO 9001 Verified</div>
           <div className="flex items-center gap-3 sm:gap-4 md:gap-5 font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase italic text-slate-900 tracking-tight">MME Authorized</div>
        </div>
      </section>
    </div>
  );
};

export default Register;