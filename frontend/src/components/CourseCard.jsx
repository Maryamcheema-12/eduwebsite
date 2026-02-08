import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThreeDCard from "./ThreeDCard";
import { Clock, ArrowRight, ShieldCheck, Layers } from "lucide-react";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    e.stopPropagation();
    navigate(`/course/${course.id}`, { state: course });
  };

  return (
    <ThreeDCard className="h-full">
      <motion.div
        whileHover={{ y: -12 }}
        className="group relative h-full flex flex-col bg-white border border-slate-100 overflow-hidden shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 rounded-[2rem]"
        data-testid={`course-card-${course.id}`}
        onClick={() => navigate(`/course/${course.id}`, { state: course })}
      >
        {/* --- PROFESSIONAL IMAGE SECTION --- */}
        <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            onError={(e) => e.target.style.display = 'none'}
          />
          
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Verified Badge */}
          <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-2xl">
              <ShieldCheck className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 text-amber-400" strokeWidth={2.5} />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <span className="bg-amber-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl rounded-sm w-fit">
                {course.category.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/60">
                <Layers size={10} className="sm:w-3 sm:h-3" />
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">Professional Training</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col relative">
          <h3 className="font-black text-lg sm:text-xl md:text-2xl uppercase text-slate-900 mb-3 sm:mb-4 md:mb-5 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 tracking-tight leading-tight">
            {course.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose mb-5 sm:mb-6 md:mb-8 flex-1 font-medium line-clamp-3">
            {course.description}
          </p>

          {/* --- INFO STRIP --- */}
          <div className="flex items-center justify-between py-4 sm:py-5 md:py-6 border-y border-slate-100 mb-5 sm:mb-6 md:mb-8 bg-slate-50 px-4 sm:px-5 md:px-6 -mx-5 sm:-mx-7 md:-mx-9 rounded-lg sm:rounded-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 sm:w-12 md:w-12 h-10 sm:h-12 md:h-12 bg-white shadow-sm rounded-lg sm:rounded-lg flex items-center justify-center border border-slate-200 group-hover:border-amber-300 transition-all">
                <Clock className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 text-amber-600" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[7px] sm:text-[8px] md:text-[8px] font-black text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Duration</span>
                <span className="text-xs sm:text-sm md:text-sm font-black text-slate-900 uppercase">{course.duration}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[7px] sm:text-[8px] md:text-[8px] font-black text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Investment</span>
              <div className="flex items-baseline text-slate-900 font-black text-lg sm:text-xl md:text-2xl tracking-tight">
                <span className="text-[7px] sm:text-[8px] md:text-[8px] mr-1 sm:mr-1 text-amber-600">QAR</span>
                {course.price}
              </div>
            </div>
          </div>

          {/* --- CTA BUTTON --- */}
          <button
            onClick={handleNavigation}
            className="group/btn relative w-full bg-slate-950 text-white py-4 sm:py-5 md:py-5 rounded-lg sm:rounded-xl md:rounded-xl overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-slate-300/20"
          >
            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Explore Course
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-2 transition-transform duration-500" />
            </div>
            {/* Hover Fill */}
            <div className="absolute inset-0 bg-amber-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>

        {/* Accent Bar */}
        <div className="h-1 sm:h-1.5 w-0 group-hover:w-full bg-amber-500 transition-all duration-700 ease-in-out" />
      </motion.div>
    </ThreeDCard>
  );
};

export default CourseCard;