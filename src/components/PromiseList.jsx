import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

// Static floating elements component (no animations, random positions on load)
const FloatingElements = () => {
  const elements = useMemo(() => {
    const items = [
      { type: 'rose', emoji: '🌹', count: 6 },
      { type: 'tulip', emoji: '🌷', count: 5 },
      { type: 'heart', emoji: '❤️', count: 8 },
      { type: 'butterfly', emoji: '🦋', count: 4 },
      { type: 'insect', emoji: '🐝', count: 3 },
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

const apologyTexts = [
  "I'm truly sorry for hurting you",
  "I know my words and actions caused you pain",
  "I take full responsibility for my mistakes",
  "You deserve so much better than this",
  "I promise to be more thoughtful and caring",
  "I will listen to you and understand your feelings",
  "I choose you, every single day",
  "Thank you for being patient with me"
];

const PromiseList = ({ onNext, onBack, canGoBack }) => {
  const [visibleTexts, setVisibleTexts] = useState(0);

  const handleTextReveal = () => {
    if (visibleTexts < apologyTexts.length) {
      setVisibleTexts(prev => prev + 1);
    }
  };

  const allTextsVisible = visibleTexts === apologyTexts.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-romantic-blush via-romantic-lightPink to-romantic-lavender relative overflow-hidden">
      {/* Floating Elements (Static, Random Positions) */}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8 max-w-2xl w-full relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3 md:mb-4 px-2">
          I'm Sorry ❤️
        </h2>
        <p className="text-base sm:text-lg text-gray-700 px-2 mb-6">
          Tap each message to read my heartfelt apology
        </p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-3 sm:space-y-4 mb-6 md:mb-8 relative z-10">
        {apologyTexts.map((text, index) => {
          const isVisible = visibleTexts > index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.3, x: -50, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={handleTextReveal}
              whileHover={isVisible ? { scale: 1.02 } : {}}
              whileTap={isVisible ? { scale: 0.98 } : {}}
              className={`bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer min-h-[72px] sm:min-h-[80px] flex items-center transition-all ${
                isVisible ? 'cursor-pointer border-2 border-romantic-pink' : 'cursor-default border-2 border-transparent'
              }`}
            >
              <div className="text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">
                {isVisible ? '💝' : '💌'}
              </div>
              <p className={`text-base sm:text-lg md:text-xl flex-1 ${
                isVisible ? 'text-gray-800 font-medium' : 'text-gray-400'
              }`}>
                {isVisible ? text : 'Tap to reveal...'}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      {allTextsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl flex flex-col items-center relative z-10"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-romantic-pink hover:bg-romantic-rose text-white font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full sm:w-auto sm:px-12"
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PromiseList;
