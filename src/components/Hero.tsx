import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export function Hero() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const sectionRef = useRef(null);

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
    const title = "Transforming Ideas into Impact";
    const text =
      "From the spark of an idea to a successful launch, we design and develop tailored solutions for your business. And once it's live, we've got your back with updates, maintenance, and AI-driven marketing to keep you growing";

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
    <div
      ref={sectionRef}
      className={`flex min-h-[80vh] flex-col items-center justify-center text-center px-4 relative ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <h1
        className={`text-4xl font-bold tracking-tighter ${
          theme === "light" ? "text-red-700" : "text-red-600"
        } sm:text-5xl md:text-6xl lg:text-7xl uppercase font-['Arial_Black'] relative hover:scale-[1.02] transition-transform duration-300 py-2`}
      >
        <span className="relative inline-block">{displayedTitle}</span>
        <span className="animate-blink">|</span>
      </h1>
      <p
        className={`mt-6 max-w-[600px] text-lg ${
          theme === "light" ? "text-gray-700" : "text-gray-400"
        } sm:text-xl font-mono border-l-2 border-red-600 pl-4`}
      >
        {displayedText}
        <span className="animate-blink">|</span>
      </p>
      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className={`${
            theme === "light"
              ? "bg-red-700 hover:bg-red-800"
              : "bg-red-600 hover:bg-red-700"
          } text-white border-2 border-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] uppercase tracking-wider font-bold`}
          asChild
        >
          <a href="https://calendly.com/talyx/intro-with-talyx">Book a call!</a>
        </Button>
      </div>
    </div>
  );
}
