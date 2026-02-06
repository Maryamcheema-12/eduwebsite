import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const ThreeDCard = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calibrated for a "Premium Heavy" feel
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  // Dynamic Glare Logic
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]));
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]));
  const glareOpacity = useSpring(hovering ? 0.4 : 0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => setHovering(true);
  
  const handleMouseLeave = () => {
    setHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px", // Essential for the 3D depth effect
      }}
      className={`relative transition-shadow duration-500 ${className} ${
        hovering ? "z-50" : "z-0"
      }`}
    >
      {/* 3D Content Container */}
      <div 
        style={{ 
          transform: "translateZ(60px)", 
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }}
        className="h-full w-full"
      >
        {children}
      </div>

      {/* Dynamic Glare Reflection Overlay */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 80%)`,
          opacity: glareOpacity,
          transform: "translateZ(100px)", // Float slightly above the card
        }}
        className="absolute inset-0 pointer-events-none rounded-[2rem] overflow-hidden"
      />
    </motion.div>
  );
};

export default ThreeDCard;