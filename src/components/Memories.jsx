import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';

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

const memories = [
  {
    id: 1,
    title: "Our Anniversary",
    caption: "Date: Ashoj 6, 2082",
    details: "I still remember the day you keep waitin me for a day for you decison. I still remember that getting our relationship was like filling the conract. I am like this that and its on you hand to decide huhu I still remeber. And after a day you finally give me the answer you. It was the best dy of my life. Huhu i still remeber and love you so much. I love you so much.",
    emoji: "🌹",
    required: true
  },
  {
    id: 2,
    title: "A Little Surprise",
    caption: "Date: 2081/10/14",
    details: "I know you remember the momet if i share but not the date. Do you remember I came from KTM and suprised you.  Lying you and making you trust one me was really tough i am on way to meet you. At a point you caught me and doubt on me are you travellingc you had never network issues but today you have. Thank god i wrap it up and you didnt cught. I still remeber that exicted, happy, smily journey. and also incident happend that my phone got whole blank screen until next day morning. I still remeber the moment i reached home and get fresh and eat food. Right after that i messaged you and you didnt replied. Then i keep calling you calling you but you didnt recived. But in end finally you picked up and you were sleeping. I still remeber i stay on call so wount sleep huhu. then i came to your house and suprised you. You remeber you were froze for the moment hehe and jumped over me kissing my face. I still remember",
    emoji: "😄",
    required: true
  },
  {
    id: 3,
    title: "Sorry",
    caption: "Sorry, I had assignment",
    details: "Sorry, I had assignment and couldn't write this part, but I will write it in the future.",
    emoji: "☕",
    required: false
  },
  {
    id: 4,
    title: "Sorry",
    caption: "Sorry, I had assignment",
    details: "Sorry, I had assignment and couldn't write this part, but I will write it in the future.",
    emoji: "🌟",
    required: false
  }
];

const Memories = ({ onNext, onBack, canGoBack }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [readMemories, setReadMemories] = useState([]);

  const openModal = (memory) => {
    setSelectedMemory(memory);
  };

  const closeModal = () => {
    if (selectedMemory && !readMemories.includes(selectedMemory.id)) {
      setReadMemories([...readMemories, selectedMemory.id]);
    }
    setSelectedMemory(null);
  };

  // Check if required memories (ID 1 and 2) are read
  const requiredMemoriesRead = readMemories.includes(1) && readMemories.includes(2);

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
        className="text-center mb-6 md:mb-8 max-w-4xl w-full"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3 md:mb-4 px-2">
          Our Memories Together
        </h2>
        <p className="text-base sm:text-lg text-gray-700 px-2">
          Click on any memory to read more
        </p>
        <p className="text-sm text-gray-600 mt-2 px-2">
          Please read the first two memories to continue
        </p>
      </motion.div>

      {/* Mobile: Vertical Timeline */}
      <div className="w-full max-w-2xl md:hidden space-y-4 sm:space-y-6 mb-6 md:mb-8">
        {memories.map((memory, index) => {
          const isRead = readMemories.includes(memory.id);
          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => openModal(memory)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg relative cursor-pointer transition-all hover:shadow-xl border-2 ${
                isRead 
                  ? 'border-romantic-pink' 
                  : memory.required 
                    ? 'border-romantic-pink border-dashed' 
                    : 'border-transparent'
              }`}
            >
              <div className="flex items-start">
                <div className="text-3xl sm:text-4xl mr-3 sm:mr-4 flex-shrink-0">{memory.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {memory.title}
                    </h3>
                    {isRead && <span className="text-romantic-pink text-sm">✓</span>}
                    {memory.required && !isRead && (
                      <span className="text-xs text-romantic-pink bg-romantic-blush px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm">Tap to read more →</p>
                </div>
              </div>
              {index < memories.length - 1 && (
                <div className="absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-4 sm:h-6 bg-romantic-pink opacity-30"></div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:flex w-full max-w-4xl justify-between items-center mb-6 md:mb-8 relative">
        {/* Timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-romantic-pink opacity-30 transform -translate-y-1/2"></div>
        
        {memories.map((memory, index) => {
          const isRead = readMemories.includes(memory.id);
          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => openModal(memory)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg w-[22%] relative z-10 cursor-pointer transition-all hover:shadow-xl border-2 ${
                isRead 
                  ? 'border-romantic-pink' 
                  : memory.required 
                    ? 'border-romantic-pink border-dashed' 
                    : 'border-transparent'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{memory.emoji}</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {memory.title}
                  </h3>
                  {isRead && <span className="text-romantic-pink text-xs">✓</span>}
                </div>
                {memory.required && !isRead && (
                  <p className="text-xs text-romantic-pink mb-1">Required</p>
                )}
                <p className="text-xs sm:text-sm text-gray-500">Click to read more</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal/Popup */}
      <AnimatePresence>
        {selectedMemory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>

                {/* Modal Content */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{selectedMemory.emoji}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    {selectedMemory.title}
                  </h3>
                  <p className="text-lg text-romantic-pink font-medium mb-6">
                    {selectedMemory.caption}
                  </p>
                </div>

                <div className="text-gray-700 leading-relaxed text-base md:text-lg">
                  <p className="whitespace-pre-line">{selectedMemory.details}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-2xl flex flex-col items-center"
      >
        {!requiredMemoriesRead && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm sm:text-base text-gray-600 mb-4 text-center px-4"
          >
            Please read the first two memories to continue
          </motion.p>
        )}
        <motion.button
          onClick={onNext}
          disabled={!requiredMemoriesRead}
          whileHover={requiredMemoriesRead ? { scale: 1.05 } : {}}
          whileTap={requiredMemoriesRead ? { scale: 0.95 } : {}}
          className={`font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full sm:w-auto sm:px-12 ${
            requiredMemoriesRead
              ? 'bg-romantic-pink hover:bg-romantic-rose text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Memories;

