
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/lovable-uploads/d3d35ee6-c03d-4675-a3a8-1b7f62fe11bf.png',
  '/lovable-uploads/4a6b2f44-1faf-43ac-874d-6768f0b58153.png',
  '/lovable-uploads/e12228a0-5c74-4ea6-bba8-c95d0e3b01e8.png'
];

export const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      const imageIndex = Math.min(
        Math.floor(scrollPercentage * images.length),
        images.length - 1
      );
      setCurrentImageIndex(imageIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
