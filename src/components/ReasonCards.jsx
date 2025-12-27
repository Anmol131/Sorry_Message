import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

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

const reasons = [
  {
    id: 1,
    text: "Your smile lights up my entire world",
    emoji: "😊"
  },
  {
    id: 2,
    text: "You make me want to be a better person",
    emoji: "✨"
  },
  {
    id: 3,
    text: "Your kindness and compassion inspire me",
    emoji: "💝"
  },
  {
    id: 4,
    text: "You understand me like no one else",
    emoji: "💕"
  },
  {
    id: 5,
    text: "Every day with you feels like a gift",
    emoji: "🎁"
  }
];

const ReasonCards = ({ onNext, onBack, canGoBack }) => {
  const [visibleCards, setVisibleCards] = useState(0);

  // Show cards one by one
  const handleCardClick = () => {
    if (visibleCards < reasons.length) {
      setVisibleCards(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-romantic-blush via-romantic-lightPink to-romantic-lavender relative">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8 max-w-2xl w-full"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3 md:mb-4 px-2">
          Why You Matter to Me
        </h2>
        <p className="text-base sm:text-lg text-gray-700 px-2">
          Tap each card to reveal why I love you
        </p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-3 sm:space-y-4 mb-6 md:mb-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -50 }}
            animate={visibleCards > index ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={handleCardClick}
            whileHover={visibleCards > index ? { scale: 1.02 } : {}}
            whileTap={visibleCards > index ? { scale: 0.98 } : {}}
            className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer min-h-[72px] sm:min-h-[80px] flex items-center ${
              visibleCards > index ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="text-3xl sm:text-4xl mr-3 sm:mr-4 flex-shrink-0">{reason.emoji}</div>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 flex-1">
              {visibleCards > index ? reason.text : 'Tap to reveal...'}
            </p>
          </motion.div>
        ))}
      </div>

      {visibleCards === reasons.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-romantic-pink hover:bg-romantic-rose text-white font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full sm:w-auto sm:px-12"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
};

export default ReasonCards;

