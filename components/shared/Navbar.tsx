"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

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

        <nav className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  );
}
