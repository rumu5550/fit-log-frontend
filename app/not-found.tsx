import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-full max-w-sm flex items-center justify-center mb-8">
        <svg
          viewBox="0 0 320 240"
          className="w-full max-w-sm drop-shadow-md"
          role="img"
          aria-label="Stylized gym illustration with a barbell"
        >
          <rect width="320" height="240" rx="24" fill="#1A1D23" />
          <rect
            x="24"
            y="24"
            width="272"
            height="192"
            rx="16"
            fill="#0F1115"
            stroke="#2A2E38"
          />
          <circle
            cx="86"
            cy="120"
            r="34"
            fill="#252830"
            stroke="#C4F000"
            strokeWidth="4"
          />
          <circle
            cx="234"
            cy="120"
            r="34"
            fill="#252830"
            stroke="#C4F000"
            strokeWidth="4"
          />
          <rect x="112" y="112" width="96" height="16" rx="4" fill="#C4F000" />
          <rect x="48" y="104" width="14" height="32" rx="3" fill="#E8EAEF" />
          <rect x="258" y="104" width="14" height="32" rx="3" fill="#E8EAEF" />
        </svg>
      </div>

      <h1 className="font-title text-3xl sm:text-4xl lg:text-[40px] font-bold text-white uppercase tracking-tight mb-3">
        404 — MISSED THAT LIFT
      </h1>

      <p className="text-sm sm:text-base text-[#8F9CAE] max-w-md mx-auto leading-relaxed mb-8">
        The page you wanted is not in the library. Head back to the floor and pick a workout that exists.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#C2F800] text-black font-semibold text-xs transition-all duration-200 hover:bg-[#b0e200] active:scale-[0.98]"
      >
        Back to workouts
      </Link>
    </div>
  );
}
