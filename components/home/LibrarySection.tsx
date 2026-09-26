import { Workout } from "@/types/workout";
import LibraryClient from "./LibraryClient";

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

      <LibraryClient initialWorkouts={workouts} />
    </section>
  );
}
