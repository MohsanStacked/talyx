import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

export function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    const title = "Frequently Asked Questions";
    const text =
      "Find answers to common questions about our services and process.";

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={theme === "light" ? "bg-[#faebd7]" : "bg-black"}
    >
      <div className="container max-w-4xl mx-auto px-4 py-16">
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
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 ${
                theme === "light"
                  ? "border-gray-300 bg-white hover:border-red-400"
                  : "border-gray-800 bg-black hover:border-red-600"
              } transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] rounded-lg overflow-hidden`}
            >
              <button
                className={`w-full p-6 text-left flex items-center justify-between ${
                  openIndex === index ? "bg-red-600/10" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } uppercase font-['Arial_Black']`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-red-600 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 border-t border-gray-800"
                    : "max-h-0"
                }`}
              >
                <p
                  className={`p-6 ${
                    theme === "light" ? "text-gray-700" : "text-gray-400"
                  } font-mono`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
