import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import bgImage1 from '../assets/images/bg-ai-1.jpg';
import bgImage2 from '../assets/images/bg-ai-2.jpg';
import bgImage3 from '../assets/images/bg-ai-3.jpg';

const images = [bgImage1, bgImage2, bgImage3];

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      const scrollProgress = scrollPosition / documentHeight;
      const sectionIndex = Math.min(
        Math.floor(scrollProgress * images.length),
        images.length - 1
      );
      
      setCurrentIndex(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Darker overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
    </div>
  );
};

export default BackgroundSlider;
