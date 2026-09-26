"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: number) => void;
  togglePlan: (workout: Workout) => void;
  isInPlan: (workoutId: number) => boolean;
  toggleSave: (workout: Workout) => void;
  isSaved: (workoutId: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlanList(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch {
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(planList));
    } catch {}
  }, [planList, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
    } catch {}
  }, [savedList, isLoaded]);

  const addToPlan = (workout: Workout) => {
    setPlanList((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (workoutId: number) => {
    setPlanList((prev) => prev.filter((item) => item.id !== workoutId));
  };

  const togglePlan = (workout: Workout) => {
    setPlanList((prev) => {
      const exists = prev.some((item) => item.id === workout.id);
      if (exists) {
        return prev.filter((item) => item.id !== workout.id);
      }
      return [...prev, workout];
    });
  };

  const isInPlan = (workoutId: number) => {
    return planList.some((item) => item.id === workoutId);
  };

  const toggleSave = (workout: Workout) => {
    setSavedList((prev) => {
      const exists = prev.some((item) => item.id === workout.id);
      if (exists) {
        return prev.filter((item) => item.id !== workout.id);
      }
      return [...prev, workout];
    });
  };

  const isSaved = (workoutId: number) => {
    return savedList.some((item) => item.id === workoutId);
  };

  return (
    <WorkoutContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        removeFromPlan,
        togglePlan,
        isInPlan,
        toggleSave,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
}
