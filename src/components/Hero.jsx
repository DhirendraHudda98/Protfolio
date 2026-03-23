import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useEffect, useState } from "react";

const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        const currentText = texts[currentIndex];
        if (displayText.length < currentText.length) {
          setDisplayText((prevText) => currentText.slice(0, prevText.length + 1));
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(true);
            setDisplayText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 2000); // Delay before next typing cycle
        }
      }
    }, 100); // Typing speed

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, isTyping, texts, displayText]);

  return (
    <span className="inline-block text-[#915EFF] font-bold">
      {displayText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const WavingHand = () => {
  return (
    <img
      src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f44b.png"
      alt="Waving Hand"
      className="wave-emoji inline-block w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11"
    />
  );
};

const Hero = ({ weatherMode = "snow", setWeatherMode = () => {} }) => {
  const typedItems = [
    "MERN Stack Developer",
    "Problem Solver",
    "DSA Trainer",
    "Innovator"
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(-10deg); }
          20% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          40% { transform: rotate(9deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wave-emoji {
          animation-name: wave;
          animation-duration: 1.8s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
      <div className="absolute top-6 right-6 z-30 hidden xs:flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
        <label htmlFor="weather-mode" className="text-[11px] uppercase tracking-wide text-gray-200 mr-2">
          Weather
        </label>
        <select
          id="weather-mode"
          value={weatherMode}
          onChange={(event) => setWeatherMode(event.target.value)}
          className="bg-[#111132] text-white text-sm rounded-md px-2 py-1 outline-none border border-white/20"
        >
          <option value="clear">Clear</option>
          <option value="rain">Rain</option>
          <option value="snow">Snow</option>
          <option value="fog">Fog</option>
          <option value="storm">Storm</option>
        </select>
      </div>
      <div className={`absolute inset-0 top-[105px] sm:top-[120px] z-20 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="max-w-3xl">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m{" "}
            <span className="text-[#915EFF] inline-flex items-center gap-2 align-middle">
              Dhirendra Hudda <WavingHand />
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a <TypewriterText texts={typedItems} />
            <br />
            <b>Welcome to my portfolio. Explore my projects, skills, and journey.</b>
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f1026] via-[#111132] to-[#0a0a1a]" />
      <div className="absolute inset-0 z-10 opacity-95">
        <ComputersCanvas weatherMode={weatherMode} />
      </div>

      <div className="absolute xs:bottom-10 bottom-32 z-20 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;