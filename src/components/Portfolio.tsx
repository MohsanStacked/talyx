import { useState, useEffect, useRef } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.png";
import { useTheme } from "../context/ThemeContext";

const projects = [
  {
    title: "Health and Well-being",
    description:
      "Tracking the health and well-being of individuals using smart devices",
    image: img1,
    technologies: [
      "React-native",
      "Python",
      "TensorFlow",
      "Supabase",
      "Geolocation",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Events Finder",
    description: "Find events close to you and discover new experiences.",
    image: img2,
    technologies: ["Flutter", "Swift", "Dart", "AWS", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "G-delivery",
    description: "The uber eats for groceries",
    image: img3,
    technologies: ["React-native", "Swift", "Python", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Food-commerce - Burgers!",
    description:
      "Website for ordering food from a burger branch out in Singapore",
    image: img4,
    technologies: ["React", "Geolocation", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export function Portfolio() {
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
    const title = "Our Portfolio";
    const text = "Explore our latest projects and success stories";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg border-2 ${
                theme === "light"
                  ? "border-gray-300 bg-white hover:border-red-400"
                  : "border-gray-800 bg-black hover:border-red-600"
              } transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]`}
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } uppercase font-['Arial_Black']`}
                >
                  {project.title}
                </h3>
                <p
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-400"
                  } font-mono mb-4`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-0.5 text-sm rounded-full ${
                        theme === "light"
                          ? "bg-red-100 text-red-700"
                          : "bg-red-600/10 text-red-600"
                      } font-mono border ${
                        theme === "light"
                          ? "border-red-300"
                          : "border-red-600/30"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
