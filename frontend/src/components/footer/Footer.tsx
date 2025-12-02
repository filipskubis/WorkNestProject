import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectTab } from "@/features/tab/tabSlice";
import { SquareCheckBig, LayoutGrid, Users } from "lucide-react";
import { swap } from "@/features/tab/tabSlice";
import { motion, AnimatePresence } from "framer-motion";
export default function Footer() {
  const tab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();
  const activeStyles = "bg-blue-50 rounded-lg text-blue-800";
  return (
    <footer className="fixed bottom-0 left-0 h-20 w-full flex justify-around p-2 text-sm border-t text-slate-700 border-slate-200">
      <button
        onClick={() => dispatch(swap("tasks"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 relative cursor-pointer`}
      >
        {tab === "tasks" && (
          <motion.div
            className="absolute inset-0 bg-blue-50 rounded-lg text-blue-700"
            layoutId={"tabBg"}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.3,
            }}
          ></motion.div>
        )}
        <SquareCheckBig
          color={tab === "tasks" ? "#193cb8" : "#62748e"}
          className="z-10"
        />
        <p className={`z-10 ${tab === "tasks" && "text-blue-800"}`}> Tasks</p>
      </button>
      <button
        onClick={() => dispatch(swap("projects"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 relative cursor-pointer`}
      >
        {tab === "projects" && (
          <motion.div
            className="absolute inset-0 bg-blue-50 rounded-lg text-blue-700"
            layoutId={"tabBg"}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.3,
            }}
          ></motion.div>
        )}
        <LayoutGrid
          color={tab === "projects" ? "#193cb8" : "#62748e"}
          className="z-10"
        />
        <p className={`z-10 ${tab === "projects" && "text-blue-800"}`}>
          {" "}
          Projects
        </p>
      </button>
      <button
        onClick={() => dispatch(swap("team"))}
        className={`flex flex-col gap-2 items-center flex-1 h-full pt-2 relative cursor-pointer`}
      >
        {tab === "team" && (
          <motion.div
            className="absolute inset-0 bg-blue-50 rounded-lg text-blue-700"
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.3,
            }}
            layoutId={"tabBg"}
          ></motion.div>
        )}
        <Users
          color={tab === "team" ? "#193cb8" : "#62748e"}
          className="z-10"
        />
        <p className={`z-10 ${tab === "team" && "text-blue-800"}`}> Team</p>
      </button>
    </footer>
  );
}
