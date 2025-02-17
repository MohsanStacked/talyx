import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export function Mission() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const sectionRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    const title = "Our Mission";
    const text =
      "Empowering businesses with innovative digital solutions that drive growth and success in the modern world.";

    if (isVisible) {
      let titleIndex = 0;
      let textIndex = 0;

      const titleInterval = setInterval(() => {
        if (titleIndex <= title.length) {
          setDisplayedTitle(title.slice(0, titleIndex));
          titleIndex++;
        } else {
          clearInterval(titleInterval);

          const textInterval = setInterval(() => {
            if (textIndex <= text.length) {
              setDisplayedText(text.slice(0, textIndex));
              textIndex++;
            } else {
              clearInterval(textInterval);
            }
          }, 30);
        }
      }, 50);

      return () => clearInterval(titleInterval);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-16 ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <div className="container max-w-4xl mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-4 ${
            theme === "light" ? "text-red-700" : "text-red-600"
          } uppercase tracking-wider font-['Arial_Black'] relative`}
        >
          <span className="relative inline-block">{displayedTitle}</span>
          <span className="animate-blink">|</span>
        </h2>
        <p
          className={`text-xl ${
            theme === "light" ? "text-gray-700" : "text-gray-400"
          } text-center mb-12 font-mono max-w-2xl mx-auto`}
        >
          {displayedText}
          <span className="animate-blink">|</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`p-6 rounded-lg border-2 ${
              theme === "light"
                ? "border-gray-300 bg-white hover:border-red-400"
                : "border-gray-800 bg-black hover:border-red-600"
            } transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
          >
            <h3
              className={`text-xl font-semibold mb-3 ${
                theme === "light" ? "text-gray-900" : "text-white"
              } uppercase font-['Arial_Black']`}
            >
              Vision
            </h3>
            <p
              className={`${
                theme === "light" ? "text-gray-700" : "text-gray-400"
              } font-mono`}
            >
              To be the driving force of digital transformation, empowering
              businesses with cutting-edge technology and innovation. We strive
              to set new standards in the industry, ensuring our clients stay
              ahead in an ever-evolving digital world.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg border-2 ${
              theme === "light"
                ? "border-gray-300 bg-white hover:border-red-400"
                : "border-gray-800 bg-black hover:border-red-600"
            } transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
          >
            <h3
              className={`text-xl font-semibold mb-3 ${
                theme === "light" ? "text-gray-900" : "text-white"
              } uppercase font-['Arial_Black']`}
            >
              Values
            </h3>
            <p
              className={`${
                theme === "light" ? "text-gray-700" : "text-gray-400"
              } font-mono`}
            >
              We build scalable solutions that benefit all, focusing on
              long-term success over quick wins. Speed matters, but learning
              faster matters more. We prioritise teamwork, clear communication,
              and direct, respectful dialogue. Innovation thrives on diverse
              perspectives, and we embrace challenges with curiosity and
              ownership to create meaningful impact.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
