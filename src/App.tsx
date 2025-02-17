import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoCarousel } from "./components/LogoCarousel";
import { WhyUs } from "./components/WhyUs";
import { Mission } from "./components/Mission";
import { Portfolio } from "./components/Portfolio";
import { Services } from "./components/Services";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-[#faebd7]" : "bg-black bg-opacity-90"
      }`}
    >
      <Navbar />
      <main className="pt-24">
        <div id="hero" className="scroll-mt-24">
          <Hero />
        </div>
        <LogoCarousel />
        <About />
        <WhyUs />
        <Mission />
        <div id="services" className="scroll-mt-24">
          <Services />
        </div>
        <div id="portfolio" className="scroll-mt-24">
          <Portfolio />
        </div>
        <div id="blog" className="scroll-mt-24">
          <FAQ />
        </div>
        <div id="contact" className="scroll-mt-24">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
