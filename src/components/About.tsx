import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const storySlides = [
  {
    title: "Our Beginning",
    content:
      "Founded by a team of passionate developers, we started with a simple mission: to create digital solutions that make a difference. Our journey began in a small office, but our dreams were anything but small.",
  },
  {
    title: "Growth & Evolution",
    content:
      "As technology evolved, so did we. We expanded our expertise across web development, mobile applications, and artificial intelligence. Each project taught us something new, making us stronger and more versatile.",
  },
  {
    title: "Our Expertise",
    content:
      "Today, we specialize in crafting cutting-edge web applications, robust backend systems, and seamless user experiences. Our team combines technical prowess with creative innovation to deliver solutions that exceed expectations.",
  },
  {
    title: "Looking Forward",
    content:
      "The future is bright and full of possibilities. We continue to push boundaries, embrace new technologies, and help businesses transform their digital presence. Your success is our success.",
  },
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
    const title = "Our Story";
    const text =
      "Journey through our history and discover what makes us unique.";

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

  const navigateSlide = (direction: "prev" | "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDisplayedText("");

    const newIndex =
      direction === "next"
        ? (currentSlide + 1) % storySlides.length
        : (currentSlide - 1 + storySlides.length) % storySlides.length;

    let textIndex = 0;
    const slide = storySlides[newIndex];

    const textInterval = setInterval(() => {
      if (textIndex <= slide.content.length) {
        setDisplayedText(slide.content.slice(0, textIndex));
        textIndex++;
      } else {
        clearInterval(textInterval);
        setIsAnimating(false);
      }
    }, 30);

    setCurrentSlide(newIndex);
  };

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

        <div className="relative max-w-3xl mx-auto">
          <div
            className={`p-8 rounded-lg border-2 min-h-[200px] ${
              theme === "light"
                ? "border-gray-300 bg-white"
                : "border-gray-800 bg-black"
            } transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
          >
            <h3
              className={`text-2xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              } uppercase font-['Arial_Black']`}
            >
              {storySlides[currentSlide].title}
            </h3>
            <p
              className={`${
                theme === "light" ? "text-gray-700" : "text-gray-400"
              } font-mono text-lg leading-relaxed`}
            >
              {displayedText}
              <span className="animate-blink">|</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => navigateSlide("prev")}
              disabled={isAnimating}
              className={`p-2 rounded-full ${
                theme === "light" ? "bg-red-700" : "bg-red-600"
              } 
                text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] 
                hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] 
                transition-all duration-300 disabled:opacity-50`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
              {storySlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? theme === "light"
                        ? "bg-red-700 w-4"
                        : "bg-red-600 w-4"
                      : theme === "light"
                      ? "bg-gray-300"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => navigateSlide("next")}
              disabled={isAnimating}
              className={`p-2 rounded-full ${
                theme === "light" ? "bg-red-700" : "bg-red-600"
              } 
                text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] 
                hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] 
                transition-all duration-300 disabled:opacity-50`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
