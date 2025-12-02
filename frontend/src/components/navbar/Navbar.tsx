import { Menu } from "lucide-react";
import { useState, type JSX } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectTab } from "@/features/tab/tabSlice";
import Sidebar from "../sidebar/Sidebar";
import TaskModal from "../tasks/TaskModal";
export default function Navbar(): JSX.Element {
  const [active, setActive] = useState<"sidebar" | "tasks" | "">("");
  const tab = useAppSelector(selectTab);
  const title = {
    tasks: "Task Board",
    projects: "Projects",
    team: "Team",
  };
  const desc = {
    tasks: "Manage your daily tasks",
    projects: "Overview of all projects",
    team: "Collaborate with your team",
  };
  return (
    <div className="h-20 flex gap-4 p-4 items-center w-full border-b border-slate-200">
      {active === "sidebar" ? <Sidebar setActive={setActive} /> : null}
      {active === "tasks" ? <TaskModal setActive={setActive} /> : null}
      <button
        onClick={() => {
          setActive("sidebar");
        }}
        className="relative rounded-md w-[34px] h-[30px] grid place-content-center hover:bg-slate-100 transition-colors duration-200"
      >
        <Menu size={"16px"} />
      </button>

      <div>
        <p className="font-semibold">{title[tab]}</p>
        <p className="">{desc[tab]}</p>
      </div>
    </div>
  );
}
