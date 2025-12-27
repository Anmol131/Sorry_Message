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

const ForgiveButton = ({ onForgive, onReject, onBack, canGoBack }) => {
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const MAX_CLICKS = 5; // After 5 clicks, button becomes unclickable

  const handleNoClick = () => {
    if (noButtonClicks < MAX_CLICKS) {
      setNoButtonClicks(prev => prev + 1);
      // Move button slightly on each click
      setNoButtonOffset({
        x: Math.random() * 30 - 15,
        y: Math.random() * 30 - 15
      });
    }
  };

  const handleNoHover = () => {
    if (noButtonClicks < MAX_CLICKS) {
      // Move NO button slightly when hovered/tapped
      setNoButtonOffset({
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10
      });
    }
  };

  const handleNoLeave = () => {
    if (noButtonClicks < MAX_CLICKS) {
      setNoButtonOffset({ x: 0, y: 0 });
    }
  };

  // Calculate button scale based on clicks
  const buttonScale = Math.max(0.3, 1 - (noButtonClicks * 0.15));
  const isUnclickable = noButtonClicks >= MAX_CLICKS;

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl w-full"
      >
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💔</div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 sm:mb-8 px-2">
          Can you forgive me?
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 leading-relaxed px-2">
          I know I don't deserve it, but I'm asking anyway. 
          I promise to do better, to be better, for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
          <motion.button
            onClick={onForgive}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-romantic-pink hover:bg-romantic-rose text-white font-semibold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl shadow-lg transition-colors min-h-[56px] w-full sm:w-auto"
          >
            YES ❤️
          </motion.button>

          <div className="relative group w-full sm:w-auto">
            <motion.button
              onClick={isUnclickable ? undefined : handleNoClick}
              onMouseEnter={handleNoHover}
              onMouseLeave={handleNoLeave}
              onTouchStart={handleNoHover}
              onTouchEnd={handleNoLeave}
              animate={{
                x: noButtonOffset.x,
                y: noButtonOffset.y,
                scale: buttonScale
              }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={isUnclickable}
              className={`${
                isUnclickable 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              } font-semibold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl shadow-lg transition-colors min-h-[56px] w-full sm:w-auto relative`}
            >
              NO 😤
            </motion.button>
            
            {/* Tooltip when button is small/unclickable */}
            {isUnclickable && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Please choose YES ❤️
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgiveButton;

