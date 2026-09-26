import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#15171D] border border-[#222630] px-6 py-10 sm:px-12 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              <span className="text-[#C2F800] text-xs font-semibold uppercase tracking-wider mb-4">
                WORKOUT LIBRARY
              </span>

              <h1 className="font-title text-4xl sm:text-5xl lg:text-[60px] font-bold text-white uppercase tracking-tight mb-5">
                TRAIN WITH INTENT.
                LOG EVERY SET.
              </h1>

              <p className="text-[#9CA3AF] text-sm sm:text-base max-w-lg leading-relaxed mb-8">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
              </p>

              <Link
                href="#library"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#C2F800] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#b0e200] active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                BROWSE WORKOUTS
              </Link>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-[380px] aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[340px]">
                <Image
                  src="/assets/banner.png"
                  alt="FitLog Workout Training Machine"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
