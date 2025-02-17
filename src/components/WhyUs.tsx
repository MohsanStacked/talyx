import React, { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const benefits = [
  {
    title: "Expert Team",
    description:
      "Our seasoned professionals bring years of industry experience and technical expertise.",
  },
  {
    title: "Innovative Solutions",
    description:
      "We leverage cutting-edge technologies and methodologies to deliver modern solutions.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We work closely with you to understand and meet your unique needs.",
  },
  {
    title: "Proven Track Record",
    description:
      "Successfully delivered numerous projects across various industries with measurable results.",
  },
];

export function WhyUs() {
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
    const title = "Why Choose Us";
    const text =
      "Experience excellence in digital solutions with our expert team and proven track record.";

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
      className={`w-full py-12 ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <div className="container" ref={sectionRef}>
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
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-6 rounded-lg border-2 ${
                theme === "light"
                  ? "border-gray-300 bg-white hover:border-red-400"
                  : "border-gray-800 bg-black hover:border-red-600"
              } transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
            >
              <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } uppercase font-['Arial_Black']`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-400"
                  } font-mono`}
                >
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
