import { create } from "zustand";
import { persist } from "zustand/middleware";

// using persist to save data in local storage even after refresh 
export const useCourseIdStore = create(persist((set) => ({
    currentCourseId: null,
    setCurrentCourseId: (courseId) => set({currentCourseId: courseId})
    }),
    {name: "currentCourseId"} // will persist in local storage after refresh
));
