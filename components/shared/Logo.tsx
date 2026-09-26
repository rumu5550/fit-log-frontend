import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <Image
        src="/assets/logo.png"
        alt="FitLog Logo"
        width={26}
        height={26}
        className="h-6 w-auto object-contain"
        priority
      />
      {showText && (
        <span className="font-title text-[18px] font-bold tracking-wider text-white uppercase">
          FITLOG
        </span>
      )}
    </Link>
  );
}
