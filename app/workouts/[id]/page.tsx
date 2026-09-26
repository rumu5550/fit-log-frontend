import Image from "next/image";
import { notFound } from "next/navigation";
import { Workout } from "@/types/workout";
import WorkoutDetailActions from "@/components/workout/WorkoutDetailActions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const tableRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-6 w-full flex flex-col">
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[360px] rounded-2xl overflow-hidden bg-[#15171D] border border-[#222630]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-3">
                {workout.name}
              </h1>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                {workout.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-3 py-0.5 rounded-full bg-[#C2F800] text-black text-[11px] font-semibold uppercase"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#15171D] border border-[#222630] divide-y divide-[#1F242F] overflow-hidden text-xs">
              {tableRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <span className="font-semibold text-[#8F9CAE] uppercase">
                    {row.label}
                  </span>
                  <span className="font-medium text-white text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-title text-lg font-bold text-white uppercase tracking-tight mb-3">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2.5 text-xs sm:text-sm text-[#8F9CAE] list-decimal list-inside">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed pl-1">
                    <span className="text-[#D1D5DB]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <WorkoutDetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
