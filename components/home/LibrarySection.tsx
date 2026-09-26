import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }
    return res.json();
  } catch {
    return [];
  }
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-2">
          THE LIBRARY
        </h2>
        <p className="text-sm text-[#8F9CAE]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
