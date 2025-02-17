import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import s1 from "../assets/s1.png";
import gainz from "../assets/gainz.png";
import poe from "../assets/poe.png";
import helium from "../assets/helium.png";
import breezy from "../assets/breezy.png";
import k4 from "../assets/k4.png";

const logos = [
  { id: 2, name: "Company 2", src: gainz },
  { id: 3, name: "Company 3", src: helium },
  { id: 4, name: "Company 4", src: breezy },
  { id: 5, name: "Company 5", src: k4 },
  { id: 6, name: "Company 6", src: poe },
];

export function LogoCarousel() {
  const { theme } = useTheme();
  return (
    <section
      className={`py-12 ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <div className="container">
        <h3
          className={`text-center text-lg mb-8 ${
            theme === "light" ? "text-gray-700" : "text-gray-400"
          } font-mono`}
        >
          Our services are trusted by industry leaders like:
        </h3>
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          <div className="flex">
            <motion.div
              className="flex space-x-8"
              animate={{
                x: [0, -100 * logos.length],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className={`flex items-center justify-center w-48 h-28 rounded-lg shadow-sm transition-all duration-300 ${
                    theme === "light"
                      ? "bg-white border-2 border-gray-300 hover:border-red-400"
                      : "bg-black/40 border-2 border-gray-800 hover:border-red-600"
                  } hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="w-36 h-20 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set of logos for seamless loop */}
              {logos.map((logo) => (
                <div
                  key={`${logo.id}-duplicate`}
                  className={`flex items-center justify-center w-48 h-28 rounded-lg shadow-sm transition-all duration-300 ${
                    theme === "light"
                      ? "bg-white border-2 border-gray-300 hover:border-red-400"
                      : "bg-black/40 border-2 border-gray-800 hover:border-red-600"
                  } hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="w-36 h-20 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
