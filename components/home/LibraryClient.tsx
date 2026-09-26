"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface LibraryClientProps {
  initialWorkouts: Workout[];
}

export default function LibraryClient({ initialWorkouts }: LibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialWorkouts.forEach((w) => {
      w.muscleGroups?.forEach((m) => tags.add(m));
    });
    return ["ALL", ...Array.from(tags)];
  }, [initialWorkouts]);

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialWorkouts.filter((workout) => {
      const matchesSearch =
        !query ||
        workout.name.toLowerCase().includes(query) ||
        workout.equipment.toLowerCase().includes(query) ||
        workout.description.toLowerCase().includes(query) ||
        workout.muscleGroups.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag =
        selectedTag === "ALL" ||
        workout.muscleGroups.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
        );

      return matchesSearch && matchesTag;
    });
  }, [initialWorkouts, searchQuery, selectedTag]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8F9CAE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by workout name, muscle group, or tag..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#15171D] border border-[#222630] focus:border-[#C2F800] focus:outline-none focus:ring-1 focus:ring-[#C2F800] text-sm text-white placeholder-[#5A6578] rounded-xl transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8F9CAE] hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase whitespace-nowrap cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-[#C2F800] text-black shadow-sm"
                    : "bg-[#15171D] text-[#8F9CAE] border border-[#222630] hover:text-white hover:border-[#384152]"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#222630] py-16 px-4 text-center flex flex-col items-center justify-center">
          <h3 className="font-title text-xl font-bold text-white uppercase tracking-tight mb-2">
            No Workouts Found
          </h3>
          <p className="text-xs sm:text-sm text-[#8F9CAE] max-w-sm mb-4">
            No workouts match &ldquo;{searchQuery || selectedTag}&rdquo;. Try another search term or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("ALL");
            }}
            className="px-4 py-2 rounded-lg bg-[#1E232E] text-white border border-[#2A2F3A] hover:border-[#C2F800] text-xs font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
