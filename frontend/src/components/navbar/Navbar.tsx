import { Menu } from "lucide-react";
import type { JSX } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectTab } from "@/features/tab/tabSlice";
export default function Navbar(): JSX.Element {
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
      <button className="relative rounded-md w-[34px] h-[30px] grid place-content-center hover:bg-slate-100 transition-colors duration-200">
        <Menu size={"16px"} />
      </button>

      <div>
        <p className="font-semibold">{title[tab]}</p>
        <p className="">{desc[tab]}</p>
      </div>
    </div>
  );
}
