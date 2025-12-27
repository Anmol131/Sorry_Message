import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaMusic, FaPlay, FaPause, FaArrowLeft } from 'react-icons/fa';

// Import music files
import iris from '../songs/Goo Goo Dolls – Iris.mp3';
import teenageDream from '../songs/Stephen Dawes - Teenage Dream.mp3';
import everyBreath from '../songs/The Police - Every Breath You Take.mp3';

const Confetti = () => {
  const confettiCount = 50;
  const colors = ['#FFB6C1', '#FFC0CB', '#E6E6FA', '#FFE4E1'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(confettiCount)].map((_, i) => {
        const startX = Math.random() * 100;
        const endX = Math.random() * 100;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 2;
        const scale = Math.random() * 0.5 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${startX}%`,
              y: -20,
              rotate: 0,
              scale: scale,
            }}
            animate={{
              y: '100vh',
              rotate: 360,
              x: `${endX}%`,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
              borderRadius: '50%',
            }}
          />
        );
      })}
    </div>
  );
};

const ForgivenessResult = ({ onBack, canGoBack }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showMusicOptions, setShowMusicOptions] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const musicDropdownRef = useRef(null);
  const progressBarRef = useRef(null);

  // Music options with imported files
  const musicOptions = [
    {
      id: 1,
      title: "Iris",
      artist: "Goo Goo Dolls",
      url: iris,
      description: "A special song for you"
    },
    {
      id: 2,
      title: "Teenage Dream",
      artist: "Stephen Dawes",
      url: teenageDream,
      description: "Our favorite melody"
    },
    {
      id: 3,
      title: "Every Breath You Take",
      artist: "The Police",
      url: everyBreath,
      description: "Just for you ❤️"
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (musicDropdownRef.current && !musicDropdownRef.current.contains(event.target)) {
        setShowMusicOptions(false);
      }
    };

    if (showMusicOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMusicOptions]);

  // Update progress bar and time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [currentMusic, isPlaying]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Hide confetti after 5 seconds to reduce performance impact
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleMusicToggle = () => {
    setShowMusicOptions(!showMusicOptions);
  };

  const handleMusicSelect = (music) => {
    // Stop current music if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setCurrentMusic(music);
    setShowMusicOptions(false);
    setIsPlaying(false);

    // Create new audio element
    const audio = new Audio(music.url);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      audioRef.current = null;
    });
  };

  const handlePlayPause = () => {
    if (!currentMusic || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log('Audio playback failed:', err);
        setIsPlaying(false);
      });
    }
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-romantic-blush via-romantic-lightPink to-romantic-lavender relative overflow-y-auto">
      {showConfetti && <Confetti />}
      
      {/* Back Button */}
      {canGoBack && onBack && (
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-4 left-4 md:top-6 md:left-6 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-full text-base shadow-lg transition-colors min-h-[48px] flex items-center gap-2 z-50"
        >
          <FaArrowLeft />
          <span className="hidden sm:inline">Back</span>
        </motion.button>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center max-w-2xl w-full z-10 my-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6"
        >
          <FaHeart className="text-romantic-pink mx-auto" size={64} />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Thank You ❤️
        </h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Thank you for giving us another chance.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2"
        >
          I won't let you down. I promise to be the partner you deserve.
        </motion.p>

        <div className="relative w-full max-w-md px-4" ref={musicDropdownRef}>
          {/* Music Player Controls */}
          {currentMusic && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg mb-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  {currentMusic.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{currentMusic.artist}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div
                  ref={progressBarRef}
                  onClick={handleProgressChange}
                  onTouchStart={handleProgressChange}
                  className="w-full h-3 sm:h-4 bg-gray-200 rounded-full cursor-pointer relative group touch-none"
                >
                  <div
                    className="h-full bg-romantic-pink rounded-full transition-all duration-100"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  />
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-romantic-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ left: duration ? `${(currentTime / duration) * 100}%` : '0%', marginLeft: '-8px' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  onClick={handlePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-romantic-pink hover:bg-romantic-rose text-white rounded-full p-4 shadow-lg transition-colors min-h-[56px] min-w-[56px] flex items-center justify-center"
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </motion.button>
                <motion.button
                  onClick={handleMusicToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-gray-50 border-2 border-romantic-pink text-romantic-pink font-medium py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base shadow-lg transition-colors min-h-[48px]"
                >
                  Change Song
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Music Selection Button */}
          {!currentMusic && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleMusicToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-50 border-2 border-romantic-pink text-romantic-pink font-medium py-4 px-8 rounded-full text-base sm:text-lg shadow-lg transition-colors min-h-[48px] w-full flex items-center justify-center gap-2"
            >
              <FaMusic />
              Play Music
            </motion.button>
          )}

          {/* Music Options Dropdown */}
          <AnimatePresence>
            {showMusicOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl p-4 z-20 max-h-[60vh] overflow-y-auto"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 text-center">
                  Choose a Song
                </h3>
                <div className="space-y-2">
                  {musicOptions.map((music) => (
                    <motion.button
                      key={music.id}
                      onClick={() => handleMusicSelect(music)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3 rounded-xl hover:bg-romantic-blush transition-colors border border-transparent hover:border-romantic-pink"
                    >
                      <div className="font-medium text-gray-800 text-sm sm:text-base">{music.title}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{music.artist}</div>
                      <div className="text-xs text-gray-500 mt-1">{music.description}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgivenessResult;

