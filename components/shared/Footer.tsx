import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0C0D10] border-t border-[#1C1F26] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-xs text-[#6B7280]">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
