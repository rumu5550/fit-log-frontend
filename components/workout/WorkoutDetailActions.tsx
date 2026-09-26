"use client";

import { CalendarPlus, Bookmark, Check } from "lucide-react";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";
import { useWorkouts } from "@/context/WorkoutContext";

interface WorkoutDetailActionsProps {
  workout: Workout;
}

export default function WorkoutDetailActions({ workout }: WorkoutDetailActionsProps) {
  const { isInPlan, togglePlan, isSaved, toggleSave } = useWorkouts();

  const inPlan = isInPlan(Number(workout.id));
  const saved = isSaved(Number(workout.id));

  const handleTogglePlan = () => {
    togglePlan(workout);
    if (!inPlan) {
      toast.success(`"${workout.name}" added to today's plan!`, {
        id: `plan-${workout.id}`,
      });
    } else {
      toast.success(`"${workout.name}" removed from today's plan.`, {
        id: `plan-${workout.id}`,
      });
    }
  };

  const handleToggleSave = () => {
    toggleSave(workout);
    if (!saved) {
      toast.success(`"${workout.name}" saved for later!`, {
        id: `save-${workout.id}`,
      });
    } else {
      toast.success(`"${workout.name}" removed from saved.`, {
        id: `save-${workout.id}`,
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 pt-2">
      <button
        type="button"
        onClick={handleTogglePlan}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase cursor-pointer transition-all duration-200 active:scale-[0.98] ${
          inPlan
            ? "bg-[#1A2508] text-[#C2F800] border border-[#2D3F0E]"
            : "bg-[#C2F800] text-black hover:bg-[#b0e200]"
        }`}
      >
        {inPlan ? <Check className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4" />}
        <span>{inPlan ? "Added to today's plan" : "Add to today's plan"}</span>
      </button>

      <button
        type="button"
        onClick={handleToggleSave}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 border active:scale-[0.98] ${
          saved
            ? "bg-[#15171D] text-[#C2F800] border-[#C2F800]"
            : "bg-[#15171D] text-white border-[#2A2F3A] hover:border-[#3E4554]"
        }`}
      >
        <Bookmark className={`w-4 h-4 ${saved ? "fill-[#C2F800]" : ""}`} />
        <span>{saved ? "Saved" : "Save for later"}</span>
      </button>
    </div>
  );
}
