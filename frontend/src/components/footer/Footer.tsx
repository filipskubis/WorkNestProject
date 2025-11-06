import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectTab } from "@/features/tab/tabSlice";
import { CircleCheckBig, LayoutGrid, Users } from "lucide-react";
import { swap } from "@/features/tab/tabSlice";
export default function Footer() {
  const tab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();
  const activeStyles = "bg-blue-50 rounded-lg text-blue-800";
  return (
    <footer className="fixed bottom-0 left-0 h-20 w-full flex justify-around p-2 text-sm border-t text-slate-700 border-slate-200">
      <button
        onClick={() => dispatch(swap("tasks"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 transition-colors ${
          tab === "tasks" ? activeStyles : ""
        }`}
      >
        <CircleCheckBig color={tab === "tasks" ? "#193cb8" : "#62748e"} />
        <p> Tasks</p>
      </button>
      <button
        onClick={() => dispatch(swap("projects"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 transition-colors ${
          tab === "projects" && activeStyles
        }`}
      >
        <LayoutGrid color={tab === "projects" ? "#193cb8" : "#62748e"} />
        <p> Projects</p>
      </button>
      <button
        onClick={() => dispatch(swap("team"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 transition-colors ${
          tab === "team" ? activeStyles : ""
        }`}
      >
        <Users color={tab === "team" ? "#193cb8" : "#62748e"} />
        <p> Team</p>
      </button>
    </footer>
  );
}
