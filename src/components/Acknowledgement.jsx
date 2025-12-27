import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
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

const Acknowledgement = ({ onNext, onBack, canGoBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-romantic-blush via-romantic-lightPink to-romantic-lavender relative">
      {/* Floating Elements */}
      <FloatingElements />
      {/* Back Button */}
      {canGoBack && onBack && (
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 left-4 md:top-6 md:left-6 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-full text-base shadow-lg transition-colors min-h-[48px] flex items-center gap-2 z-10"
        >
          <FaArrowLeft />
          <span className="hidden sm:inline">Back</span>
        </motion.button>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-2xl w-full"
      >
        <div className="text-6xl mb-6">😔</div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 px-2">
          I'm Sorry
        </h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 space-y-3 sm:space-y-4 px-2"
        >
          <p>
            I know I hurt you and I am really sorry for that
          </p>
          <p>
            I take full responsibility for my actions. I should have been more thoughtful, 
            more considerate, and more practical.
          </p>
          <p>
            You deserve better, and I'm committed to being better for you.
          </p>
        </motion.div>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-romantic-pink hover:bg-romantic-rose text-white font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full sm:w-auto sm:px-12"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Acknowledgement;

