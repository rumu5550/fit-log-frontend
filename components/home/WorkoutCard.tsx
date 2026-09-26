import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { ClockIcon, CalorieIcon, StarIcon } from "@/components/icons/WorkoutIcons";

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
            <ClockIcon className="w-3.5 h-3.5 text-[#C2F800]" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CalorieIcon className="w-3.5 h-3.5 text-[#C2F800]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <StarIcon className="w-3.5 h-3.5 text-[#C2F800]" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
