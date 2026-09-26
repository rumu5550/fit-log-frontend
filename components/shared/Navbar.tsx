"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useWorkouts } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { planList, savedList } = useWorkouts();

  const planCount = planList.length;
  const savedCount = savedList.length;

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="w-full bg-[#0C0D10] border-b border-[#1C1F26] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#1A2508] text-[#C2F800] border border-[#2D3F0E]"
                    : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-xs font-medium">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
          >
            <span className="text-[#8F9CAE]">Plan</span>
            <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-[#C2F800] text-black font-semibold text-xs leading-none">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
          >
            <span className="text-[#8F9CAE]">Saved</span>
            <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full border border-[#2A2F3A] text-white/90 text-xs leading-none">
              {savedCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 text-[#8F9CAE] hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0C0D10] border-b border-[#1C1F26] px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? "bg-[#1A2508] text-[#C2F800] border border-[#2D3F0E]"
                    : "text-[#8F9CAE] hover:text-white hover:bg-[#15171D]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
