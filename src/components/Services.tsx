import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Code2,
  Lightbulb,
  MessageSquareCode,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Cloud,
  Bot,
  Brain,
  Shield,
  Database,
} from "lucide-react";

const services = [
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Marketing & Brand Growth",
    description:
      "Strategic digital marketing solutions to elevate your brand and drive sustainable growth.",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Web & App Development",
    description:
      "Custom web applications and mobile solutions built with cutting-edge technologies.",
  },
  {
    icon: <MessageSquareCode className="h-8 w-8" />,
    title: "AI Chatbots",
    description:
      "Intelligent conversational AI solutions to enhance customer engagement and automate support.",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Digital Innovation",
    description:
      "Transformative digital solutions that keep you ahead of the competition.",
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Custom Software Development",
    description:
      "Tailored software solutions designed to meet your specific business requirements.",
  },
  {
    icon: <Cloud className="h-8 w-8" />,
    title: "Cloud Services",
    description:
      "Scalable cloud infrastructure and solutions for optimal performance and reliability.",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Process Automation",
    description:
      "Streamline your operations with intelligent automation solutions.",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI & ML Solutions",
    description:
      "Advanced artificial intelligence and machine learning implementations.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets.",
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights for better decision making.",
  },
];

export function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const itemsPerPage = 4;
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
    const title = "Our Services";
    const text =
      "Comprehensive digital solutions tailored to your business needs";

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= services.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.floor((services.length - 1) / itemsPerPage) * itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const visibleServices = services.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section
      ref={sectionRef}
      className={`w-full py-16 ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "light" ? "text-red-700" : "text-red-600"
            } uppercase tracking-wider font-['Arial_Black'] relative`}
          >
            <span className="relative inline-block">{displayedTitle}</span>
            <span className="animate-blink">|</span>
          </h2>
          <p
            className={`text-xl ${
              theme === "light" ? "text-gray-700" : "text-gray-400"
            } max-w-2xl mx-auto font-mono`}
          >
            {displayedText}
            <span className="animate-blink">|</span>
          </p>
        </div>
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all duration-300"
            aria-label="Previous services"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden">
            {visibleServices.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 ${
                  theme === "light"
                    ? "border-gray-300 bg-white hover:border-red-400"
                    : "border-gray-800 bg-black hover:border-red-600"
                } transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
              >
                <div className="mb-4 text-red-600">{service.icon}</div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } uppercase font-['Arial_Black']`}
                >
                  {service.title}
                </h3>
                <p
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-400"
                  } font-mono`}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all duration-300"
            aria-label="Next services"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
