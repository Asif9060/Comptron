import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({
  children,
  duration = 3000,
  logoSrc = "/logos/fest.png",
  containerClassName = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`min-h-screen overflow-hidden bg-transparent ${containerClassName}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-900 via-slate-900 to-black"
          >
            <div className="loader-wrapper">
              <div className="loader-logo">
                <img
                  src={logoSrc}
                  alt="Loading"
                  className="w-20 h-20 rounded-2xl shadow-xl object-contain"
                />
              </div>
              <div className="loader-circle"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!isLoading && children ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <style>{`
        :global(body) {
          border-top: none !important;
          margin: 0;
        }

        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          font-family: "Inter", sans-serif;
          font-size: 1.1em;
          font-weight: 300;
          color: transparent;
          border-radius: 50%;
          background-color: transparent;
          user-select: none;
        }

        .loader-logo {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: transparent;
          animation: loader-combined 2.3s linear infinite;
          z-index: 0;
        }

        @keyframes loader-combined {
          0% {
            transform: rotate(90deg);
            box-shadow: 0 6px 12px 0 #38bdf8 inset,
              0 12px 18px 0 #005dff inset,
              0 36px 36px 0 #1e40af inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
          25% {
            transform: rotate(180deg);
            box-shadow: 0 6px 12px 0 #0099ff inset,
              0 12px 18px 0 #38bdf8 inset,
              0 36px 36px 0 #005dff inset,
              0 0 6px 2.4px rgba(56, 189, 248, 0.3),
              0 0 12px 3.6px rgba(0, 93, 255, 0.2),
              0 0 18px 6px rgba(30, 64, 175, 0.15);
          }
          50% {
            transform: rotate(270deg);
            box-shadow: 0 6px 12px 0 #60a5fa inset,
              0 12px 6px 0 #0284c7 inset,
              0 24px 36px 0 #005dff inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
          75% {
            transform: rotate(360deg);
            box-shadow: 0 6px 12px 0 #3b82f6 inset,
              0 12px 18px 0 #0ea5e9 inset,
              0 36px 36px 0 #2563eb inset,
              0 0 6px 2.4px rgba(56, 189, 248, 0.3),
              0 0 12px 3.6px rgba(0, 93, 255, 0.2),
              0 0 18px 6px rgba(30, 64, 175, 0.15);
          }
          100% {
            transform: rotate(450deg);
            box-shadow: 0 6px 12px 0 #4dc8fd inset,
              0 12px 18px 0 #005dff inset,
              0 36px 36px 0 #1e40af inset,
              0 0 3px 1.2px rgba(56, 189, 248, 0.3),
              0 0 6px 1.8px rgba(0, 93, 255, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

LoadingScreen.propTypes = {
  children: PropTypes.node,
  duration: PropTypes.number,
  logoSrc: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default LoadingScreen;