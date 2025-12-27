import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useMemo } from 'react';

// Floating elements component
const FloatingElements = () => {
  const elements = useMemo(() => {
    const items = [
      { type: 'rose', emoji: '🌹', count: 5 },
      { type: 'tulip', emoji: '🌷', count: 4 },
      { type: 'heart', emoji: '❤️', count: 6 },
      { type: 'butterfly', emoji: '🦋', count: 3 },
    ];

    return items.flatMap((element) =>
      [...Array(element.count)].map((_, i) => {
        const size = element.type === 'butterfly' ? 24 : element.type === 'rose' || element.type === 'tulip' ? 28 : 20;
        return {
          key: `${element.type}-${i}`,
          emoji: element.emoji,
          size: size,
          left: Math.random() * 100,
          top: Math.random() * 100,
        };
      })
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <div
          key={element.key}
          className="absolute"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            fontSize: `${element.size}px`,
            opacity: 0.6,
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  );
};

const Hero = ({ onNext, onBack, canGoBack }) => {
  // Floating heart animation
  const heartVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-romantic-blush via-romantic-lightPink to-romantic-lavender relative">
      {/* Floating Elements */}
      <FloatingElements />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-md w-full"
      >
        <motion.div
          variants={heartVariants}
          animate="float"
          className="mb-6"
        >
          <FaHeart className="text-romantic-pink mx-auto" size={48} />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-3 sm:mb-4 px-2">
          Hey Cooked Potate ❤️
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2">
         I'm really sorry.
        </p>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-romantic-pink hover:bg-romantic-rose text-white font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full sm:w-auto sm:px-12"
        >
          Please hear me out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;

