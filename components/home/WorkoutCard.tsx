import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col rounded-2xl bg-[#15171D] border border-[#222630] hover:border-[#C2F800] transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full aspect-[16/10] bg-[#1C1F26] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="px-2.5 py-0.5 rounded-full bg-[#C2F800] text-black text-[11px] font-semibold uppercase"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-title text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#C2F800] transition-colors line-clamp-1 mb-1.5">
          {workout.name}
        </h3>

        <p className="text-xs text-[#8F9CAE] line-clamp-1 mb-4">
          {workout.equipment}
        </p>

        <div className="mt-auto pt-3 border-t border-[#1C1F26] flex items-center justify-between text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#C2F800]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#C2F800]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#C2F800]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
