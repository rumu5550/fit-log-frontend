"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ChevronDown, Check as CheckIcon, Search, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkouts } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import { ClockIcon, CalorieIcon, StarIcon } from "@/components/icons/WorkoutIcons";

type TabType = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Duration", value: "duration" },
  { label: "Calories", value: "calories" },
  { label: "Rating", value: "rating" },
];

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<TabType>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const sortRef = useRef<HTMLDivElement>(null);

  const {
    planList,
    savedList,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
    toggleComplete,
    isCompleted,
  } = useWorkouts();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentList = activeTab === "plan" ? [...planList] : [...savedList];

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0
  );

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    currentList.forEach((w) => {
      w.muscleGroups?.forEach((m) => tags.add(m));
    });
    return ["ALL", ...Array.from(tags)];
  }, [currentList]);

  const filteredList = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return currentList.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.equipment.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.muscleGroups.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag =
        selectedTag === "ALL" ||
        item.muscleGroups.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
        );

      return matchesSearch && matchesTag;
    });
  }, [currentList, searchQuery, selectedTag]);

  const sortedList = useMemo(() => {
    return [...filteredList].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [filteredList, sortBy]);

  const selectedSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Duration";

  const handleToggleComplete = (item: Workout) => {
    const wasCompleted = isCompleted(item.id);
    toggleComplete(item.id);
    if (!wasCompleted) {
      toast.success(`"${item.name}" marked as done!`);
    } else {
      toast.success(`"${item.name}" marked as undone.`);
    }
  };

  const handleRemove = (item: Workout) => {
    if (activeTab === "plan") {
      removeFromPlan(item.id);
      toast.success(`"${item.name}" removed from today's plan.`);
    } else {
      removeFromSaved(item.id);
      toast.success(`"${item.name}" removed from saved.`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-sm text-[#8F9CAE]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="rounded-2xl bg-[#15171D] border border-[#222630] p-6 sm:p-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#222630]">
          <div className="flex flex-col">
            <span className="text-xs text-[#8F9CAE] font-medium mb-1">
              Exercises
            </span>
            <span className="font-title text-4xl sm:text-5xl font-bold text-[#C2F800]">
              {totalExercises}
            </span>
          </div>

          <div className="flex flex-col pt-4 sm:pt-0 sm:pl-8">
            <span className="text-xs text-[#8F9CAE] font-medium mb-1">
              Minutes
            </span>
            <span className="font-title text-4xl sm:text-5xl font-bold text-white">
              {totalMinutes}
            </span>
          </div>

          <div className="flex flex-col pt-4 sm:pt-0 sm:pl-8">
            <span className="text-xs text-[#8F9CAE] font-medium mb-1">
              Calories
            </span>
            <span className="font-title text-4xl sm:text-5xl font-bold text-white">
              {totalCalories}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center p-1 rounded-xl bg-[#15171D] border border-[#222630]">
          <button
            type="button"
            onClick={() => {
              setActiveTab("plan");
              setSelectedTag("ALL");
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "plan"
                ? "bg-[#1E232E] text-white shadow-sm"
                : "text-[#8F9CAE] hover:text-white"
            }`}
          >
            Today&apos;s Plan ({planList.length}/5)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("saved");
              setSelectedTag("ALL");
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "saved"
                ? "bg-[#1E232E] text-white shadow-sm"
                : "text-[#8F9CAE] hover:text-white"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        <div className="relative" ref={sortRef}>
          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-[#8F9CAE] font-medium">Sort By</span>
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className={`flex items-center gap-2 bg-[#15171D] border px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                isSortOpen
                  ? "border-[#C2F800] text-white shadow-[0_0_12px_rgba(194,248,0,0.1)]"
                  : "border-[#222630] text-white hover:border-[#384152]"
              }`}
            >
              <span>{selectedSortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8F9CAE] transition-transform duration-200 ${
                  isSortOpen ? "rotate-180 text-[#C2F800]" : ""
                }`}
              />
            </button>
          </div>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#15171D] border border-[#222630] shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#1A2508] text-[#C2F800] font-semibold"
                        : "text-[#8F9CAE] hover:text-white hover:bg-[#1C2028]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <CheckIcon className="w-3.5 h-3.5 text-[#C2F800]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {currentList.length > 0 && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8F9CAE] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab === "plan" ? "today's plan" : "saved lifts"} by name or tag...`}
              className="w-full pl-10 pr-10 py-2.5 bg-[#15171D] border border-[#222630] focus:border-[#C2F800] focus:outline-none focus:ring-1 focus:ring-[#C2F800] text-xs sm:text-sm text-white placeholder-[#5A6578] rounded-xl transition-all"
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

          {allTags.length > 2 && (
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
          )}
        </div>
      )}

      {!isLoaded ? (
        <div className="rounded-2xl border border-[#222630] bg-[#15171D] py-20 px-4 text-center flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C2F800] animate-spin mb-4" />
          <p className="font-title text-xl font-bold text-white uppercase tracking-tight">
            Loading workouts…
          </p>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#222630] py-20 px-4 text-center flex flex-col items-center justify-center">
          <h2 className="font-title text-2xl font-bold text-white uppercase tracking-tight mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-xs sm:text-sm text-[#8F9CAE] max-w-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#C2F800] text-black font-semibold text-xs transition-all duration-200 hover:bg-[#b0e200] active:scale-[0.98]"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item: Workout) => {
            const completed = isCompleted(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#15171D] border border-[#222630] p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all hover:border-[#2F3646]"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-full sm:w-32 aspect-[21/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#1C1F26] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3
                      className={`font-title text-base sm:text-lg font-bold uppercase tracking-tight transition-colors truncate ${
                        completed
                          ? "line-through text-[#6B7280]"
                          : "text-white"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8F9CAE] mb-2 sm:mb-1.5 truncate">
                      {item.equipment}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#8F9CAE]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <ClockIcon className="w-3.5 h-3.5 text-[#C2F800] shrink-0" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <CalorieIcon className="w-3.5 h-3.5 text-[#C2F800] shrink-0" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <StarIcon className="w-3.5 h-3.5 text-[#C2F800] shrink-0" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 justify-start md:justify-end pt-1 md:pt-0">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#1E232E] hover:bg-[#282F3E] border border-[#2A2F3A] transition-colors whitespace-nowrap shrink-0"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(item)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all active:scale-[0.98] whitespace-nowrap shrink-0 ${
                        completed
                          ? "bg-[#1A2508] text-[#C2F800] border border-[#2D3F0E]"
                          : "bg-[#C2F800] text-black hover:bg-[#b0e200]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>{completed ? "Completed" : "Mark as Done"}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="p-2 text-[#8F9CAE] hover:text-white hover:bg-[#222630] rounded-lg cursor-pointer transition-colors shrink-0"
                    aria-label="Remove workout"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
