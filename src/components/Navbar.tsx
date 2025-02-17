import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import {
  NavigationMenuLink,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import talyx from "../assets/talyx.png";
import { useTheme } from "../context/ThemeContext";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-4 z-50 w-full px-4">
      <div
        className={`container max-w-6xl flex h-16 items-center justify-between rounded-lg border-2 ${
          theme === "light"
            ? "border-red-700 bg-white shadow-[0_0_15px_rgba(220,38,38,0.2)]"
            : "border-gray-800 bg-black shadow-[0_0_15px_rgba(220,38,38,0.3)]"
        } py-4 relative hover:border-red-600 transition-all duration-300`}
      >
        <div className="w-[90px] flex items-center gap-2">
          <img src={talyx} alt="Logo" className="h-8 w-8 animate-pulse" />
          <span className="font-['Arial_Black'] text-lg text-red-600 uppercase tracking-wider">
            Talyx
          </span>
        </div>
        <button
          className={`lg:hidden absolute right-4 ${
            theme === "light" ? "text-red-700" : "text-red-600"
          } hover:text-red-500 transition-colors duration-300`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <button
          onClick={toggleTheme}
          className={`absolute right-14 lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md ${
            theme === "light" ? "bg-white" : "bg-black"
          } border-2 border-red-800 text-red-600 hover:text-red-500 hover:border-red-600 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 hover:rotate-180" />
          ) : (
            <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 hover:-rotate-180" />
          )}
        </button>
        <NavigationMenu className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `${
                    theme === "light"
                      ? "bg-white hover:bg-red-50"
                      : "bg-black hover:bg-red-950"
                  } ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  } hover:text-red-600`
                )}
                href="#hero"
                onClick={(e) => scrollToSection(e, "#hero")}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `${
                    theme === "light"
                      ? "bg-white hover:bg-red-50"
                      : "bg-black hover:bg-red-950"
                  } ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  } hover:text-red-600`
                )}
                href="#services"
                onClick={(e) => scrollToSection(e, "#services")}
              >
                What we offer
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `${
                    theme === "light"
                      ? "bg-white hover:bg-red-50"
                      : "bg-black hover:bg-red-950"
                  } ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  } hover:text-red-600`
                )}
                href="#portfolio"
                onClick={(e) => scrollToSection(e, "#portfolio")}
              >
                Portfolio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `${
                    theme === "light"
                      ? "bg-white hover:bg-red-50"
                      : "bg-black hover:bg-red-950"
                  } ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  } hover:text-red-600`
                )}
                href="#about"
                onClick={(e) => scrollToSection(e, "#about")}
              >
                About us
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md ${
              theme === "light" ? "bg-white" : "bg-black"
            } border-2 border-red-800 text-red-600 hover:text-red-500 hover:border-red-600 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 hover:rotate-180" />
            ) : (
              <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 hover:-rotate-180" />
            )}
          </button>
          <a
            href="https://calendly.com/talyx/intro-with-talyx"
            className={`inline-flex h-9 items-center justify-center rounded-md ${
              theme === "light"
                ? "bg-red-700 hover:bg-red-800"
                : "bg-red-600 hover:bg-red-700"
            } px-4 py-2 text-sm font-['Arial_Black'] text-white transition-all duration-300 uppercase tracking-wider border-2 border-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]`}
          >
            Let's Chat Today
          </a>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 mt-2 ${
            theme === "light"
              ? "bg-white border-red-700"
              : "bg-black border-gray-800"
          } border-2 rounded-lg shadow-lg transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-2">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className={`px-4 py-2 ${
                theme === "light"
                  ? "text-gray-600 hover:bg-red-50"
                  : "text-gray-400 hover:bg-red-950"
              } hover:text-red-600 rounded-md transition-colors duration-300 font-mono`}
            >
              Home
            </a>
            <a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, "#portfolio")}
              className={`px-4 py-2 ${
                theme === "light"
                  ? "text-gray-600 hover:bg-red-50"
                  : "text-gray-400 hover:bg-red-950"
              } hover:text-red-600 rounded-md transition-colors duration-300 font-mono`}
            >
              Portfolio
            </a>
            <a
              href="https://calendly.com/talyx/intro-with-talyx"
              className={`px-4 py-2 ${
                theme === "light"
                  ? "text-gray-600 hover:bg-red-50"
                  : "text-gray-400 hover:bg-red-950"
              } hover:text-red-600 rounded-md transition-colors duration-300 font-mono`}
            >
              Contact
            </a>
            <a
              href="https://calendly.com/talyx/intro-with-talyx"
              className={`mt-2 inline-flex w-full items-center justify-center rounded-md ${
                theme === "light"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-red-600 hover:bg-red-700"
              } px-4 py-2 text-sm font-['Arial_Black'] text-white transition-all duration-300 uppercase tracking-wider border-2 border-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]`}
            >
              Let's Chat Today
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
