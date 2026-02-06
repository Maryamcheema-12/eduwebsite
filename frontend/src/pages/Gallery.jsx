import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, Maximize2, Camera, Layers, ArrowRight, Aperture, Box, Loader2, Play, Video, ShieldCheck } from "lucide-react";

// --- DATA REPOSITORY ---
const GALLERY_DATA = [
  { id: 1, category: "FACILITIES", caption: "Advanced Engineering Simulation Lab", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200" },
  { id: 2, category: "CLASSROOM", caption: "UPDA Civil Preparation Session", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200" },
  { id: 3, category: "SUCCESS", caption: "PMP Certification Ceremony", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200" },
  { id: 4, category: "WORKSHOP", caption: "Mechanical Systems Training", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200" },
  { id: 5, category: "FACILITIES", caption: "Student Resource Center", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" },
  { id: 6, category: "SUCCESS", caption: "UPDA Electrical Batch Graduation", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1200" },
  { id: 7, category: "WORKSHOP", caption: "Electrical Safety Standards Demo", image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1200" },
  { id: 8, category: "CLASSROOM", caption: "Evening Corporate Training Module", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200" },
];

// --- PROGRESSIVE IMAGE LOADER ---
const ProgressiveImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src={src} alt={alt} onLoad={() => setIsLoaded(true)}
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={isLoaded ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

// --- GALLERY CARD COMPONENT ---
const GalleryCard = ({ item, index, onSelect }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  return (
    <motion.div
      layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group relative aspect-[3/4] rounded-[2.5rem] cursor-pointer perspective-1000 shadow-sm hover:shadow-3xl transition-shadow duration-700"
      onClick={() => onSelect(item)}
    >
      <div className="w-full h-full overflow-hidden rounded-[2.5rem]" style={{ transform: "translateZ(50px)" }}>
        <ProgressiveImage src={item.image} alt={item.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-10 rounded-[2.5rem]">
        <div className="flex justify-end" style={{ transform: "translateZ(80px)" }}>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20"><Maximize2 className="text-white w-5 h-5" /></div>
        </div>
        <div style={{ transform: "translateZ(120px)" }}>
          <span className="bg-amber-600 text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.4em] mb-4 inline-block rounded-sm">{item.category}</span>
          <p className="text-white font-black text-2xl uppercase tracking-tighter leading-tight">{item.caption}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const springX = useSpring(mX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mY, { stiffness: 50, damping: 20 });
  const hRotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const hRotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const filteredGallery = activeFilter === "ALL" ? GALLERY_DATA : GALLERY_DATA.filter(i => i.category === activeFilter);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-amber-100">
      
      {/* --- HERO HEADER --- */}
      <section ref={heroRef} onMouseMove={(e) => {
        const rect = heroRef.current.getBoundingClientRect();
        mX.set((e.clientX - rect.left) / rect.width - 0.5);
        mY.set((e.clientY - rect.top) / rect.height - 0.5);
      }} className="relative pt-56 pb-40 bg-slate-50 border-b border-slate-100 overflow-hidden perspective-2000">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div style={{ y: heroY }}>
              <div className="flex items-center gap-4 mb-10">
                <span className="w-16 h-[2px] bg-amber-600"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 italic">Academy Visual Archive</span>
              </div>
              <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-950 mb-10 uppercase leading-[0.8]">Academy <br /><span className="text-amber-600">Vision.</span></h1>
              <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">Exploring the technical landscape of Doha's premier engineering institute through high-fidelity visual documentation.</p>
            </motion.div>
            <div className="hidden lg:flex justify-end">
                <motion.div style={{ rotateX: hRotateX, rotateY: hRotateY, transformStyle: "preserve-3d" }} className="relative w-96 h-96 bg-white rounded-[5rem] shadow-3xl border border-slate-100 flex items-center justify-center">
                    <div style={{ transform: "translateZ(100px)" }} className="flex flex-col items-center gap-6">
                        <div className="p-8 bg-slate-950 rounded-[2.5rem] shadow-2xl"><Aperture size={80} strokeWidth={1} className="text-amber-500 animate-spin-slow" /></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">ISO: Excellence</span>
                    </div>
                    <div className="absolute inset-6 border border-dashed border-slate-200 rounded-[4rem] animate-pulse" />
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FACILITY TOUR SECTION (VIDEO) --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative group overflow-hidden rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] bg-slate-900 aspect-video lg:aspect-[21/9] flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3s]" alt="Facility Preview" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-60" />
            
            <div className="relative z-10 text-center">
              <motion.button 
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoOpen(true)}
                className="w-28 h-28 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl mb-8 mx-auto group/play"
              >
                <Play size={40} fill="currentColor" className="ml-2 group-hover:scale-110 transition-transform" />
              </motion.button>
              <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">Take a Facility Tour</h2>
              <div className="flex items-center justify-center gap-3 text-amber-500 font-black text-[10px] uppercase tracking-[0.5em]">
                <ShieldCheck size={16} /> Licensed Training Environment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRID FILTER --- */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-10">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap gap-4">
            {["ALL", "FACILITIES", "CLASSROOM", "WORKSHOP", "SUCCESS"].map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all rounded-full border-2 ${activeFilter === cat ? "bg-slate-950 text-white border-slate-950 shadow-2xl scale-105" : "bg-transparent text-slate-400 border-slate-100 hover:border-slate-950 hover:text-slate-950"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MASONRY GRID --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} onSelect={setSelectedImage} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- LIGHTBOX & VIDEO MODAL --- */}
      <AnimatePresence>
        {/* Image Lightbox */}
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[150] flex items-center justify-center p-6 md:p-12" onClick={() => setSelectedImage(null)}>
            <motion.button whileHover={{ rotate: 90 }} className="absolute top-10 right-10 text-white bg-white/5 p-5 rounded-full border border-white/10 z-[160]"><X size={32} /></motion.button>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="max-w-7xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.image} className="max-h-[70vh] rounded-[4rem] shadow-4xl border border-white/10" alt="Full" />
              <div className="mt-16 text-center">
                 <span className="text-amber-500 font-black text-xs uppercase tracking-[0.8em] block italic">{selectedImage.category}</span>
                 <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter max-w-5xl">{selectedImage.caption}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Video Tour Modal */}
        {isVideoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[150] flex items-center justify-center p-4" onClick={() => setIsVideoOpen(false)}>
            <button className="absolute top-10 right-10 text-white"><X size={40} /></button>
            <motion.div initial={{ scale: 0.8, rotateX: 10 }} animate={{ scale: 1, rotateX: 0 }} className="w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden bg-black shadow-4xl border border-white/10" onClick={e => e.stopPropagation()}>
                {/* Embedded Video Link - Replace with your facility tour video */}
                <iframe className="w-full h-full" src="" title="Facility Tour" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER CTA --- */}
      <section className="py-40 bg-white px-6">
        <div className="container mx-auto max-w-7xl bg-slate-950 rounded-[6rem] p-20 md:p-40 text-center relative overflow-hidden group shadow-3xl">
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-amber-600/10 rounded-full blur-[150px] group-hover:bg-amber-600/20 transition-all" />
          <Camera className="w-32 h-32 text-amber-500 mx-auto mb-16 opacity-30" strokeWidth={0.5} />
          <h3 className="text-7xl md:text-[8rem] font-black text-white mb-16 uppercase tracking-tighter leading-[0.8]">Be Part of Our <br /><span className="text-amber-600 underline decoration-amber-500/20 underline-offset-[20px]">Legacy.</span></h3>
          <button onClick={() => navigate('/register')} className="group px-20 py-10 bg-amber-600 text-white font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-slate-950 transition-all flex items-center gap-8 mx-auto rounded-full active:scale-95 shadow-2xl">Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" /></button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;