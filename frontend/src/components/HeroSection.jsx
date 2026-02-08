import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from './PrimaryButton';

const HeroSection = ({ 
  title, 
  description, 
  buttonText = 'Get Started', 
  buttonLink = '#',
  imageUrl = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  hasImage = true,
  imagePosition = 'right'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-20 md:py-32 lg:py-40 items-center">
          
          {/* Text Content */}
          <div className={`${imagePosition === 'left' ? 'lg:order-2' : ''} flex flex-col justify-center`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                {description}
              </p>
              <div className="flex gap-4 flex-wrap">
                <PrimaryButton onClick={() => window.location.href = buttonLink}>
                  {buttonText}
                </PrimaryButton>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          {hasImage && (
            <div className={`${imagePosition === 'left' ? 'lg:order-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt="Hero section"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
