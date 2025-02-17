import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export function Contact() {
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
    const title = "Let's Talk";
    const text =
      "Ready to transform your digital presence? Schedule a consultation or chat with our team.";

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
      } border-t border-b ${
        theme === "light" ? "border-gray-300" : "border-gray-800"
      }`}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "light" ? "text-red-700" : "text-red-600"
            } uppercase tracking-wider font-['Arial_Black'] relative`}
          >
            <span className="relative inline-block">{displayedTitle}</span>
          </h2>
          <p
            className={`text-xl ${
              theme === "light" ? "text-gray-700" : "text-gray-400"
            } mb-8 font-mono`}
          >
            {displayedText}
            <span className="animate-blink">|</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className={`w-full sm:w-auto ${
                theme === "light"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-red-600 hover:bg-red-700"
              } text-white border-2 border-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] uppercase tracking-wider font-bold`}
              asChild
            >
              <a
                href="https://calendly.com/talyx/intro-with-talyx"
                className="flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Book a Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
