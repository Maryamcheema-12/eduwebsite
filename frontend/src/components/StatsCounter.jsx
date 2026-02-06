import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const StatsCounter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Safe label for data-testid to prevent "toLowerCase of undefined" error
  const safeId = label ? label.toLowerCase().replace(/\s+/g, '-') : 'stat';

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
      data-testid={`stat-counter-${safeId}`}
    >
      <div className="font-black text-5xl md:text-6xl lg:text-7xl text-amber-600 mb-3 tracking-tighter">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-500 ">
        {label}
      </div>
      
      {/* Decorative bar under the counter */}
      <motion.div 
        initial={{ width: 0 }}
        animate={isInView ? { width: "40px" } : {}}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-1 bg-amber-500/20 mx-auto mt-4 rounded-full"
      />
    </motion.div>
  );
};

export default StatsCounter;