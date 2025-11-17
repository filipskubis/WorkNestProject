import { useState, useEffect, type JSX } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectTab } from "@/features/tab/tabSlice";
import { createPortal } from "react-dom";
import { useAppDispatch } from "@/app/hooks";
import { swap } from "@/features/tab/tabSlice";
import { LayoutGrid, Users, Plus, X, SquareCheckBig } from "lucide-react";
type SidebarProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  setActive,
}: SidebarProps): JSX.Element | null {
  const tab = useAppSelector(selectTab);
  const [mounted, setMounted] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setOnScreen(true);
    }, 10);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalElement = document.getElementById("sidebar-portal");

  function close() {
    setOnScreen(false);
    setTimeout(() => {
      setActive(false);
    }, 500);
  }
  const activeStyles = "bg-blue-50 rounded-lg text-blue-600";

  if (!portalElement) return null;

  return createPortal(
    <div>
      {onScreen ? (
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={close}
        ></div>
      ) : null}
      <aside
        className={`fixed border-l border-l-slate-200 top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300 -translate-x-full ${
          onScreen ? "translate-x-0" : null
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-b-slate-200">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-700 p-2 grid place-content-center">
              <div className="w-4 h-4 border border-slate-50 rounded-sm"></div>
            </div>
            <p className="text-lg">WorkNest</p>
          </div>
          <button
            onClick={close}
            className="w-6 h-6 rounded-md grid place-content-center hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-6">
          <div className="flex w-full items-center leading-5 gap-4 p-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-700 text-white">
            <Plus size={20} />
            <p className="font-medium">New Task</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => {
                dispatch(swap("tasks"));
                close();
              }}
              className={`flex w-full items-center leading-5 gap-4 p-3 rounded-lg text-slate-700 ${
                tab === "tasks" ? activeStyles : ""
              }`}
            >
              <SquareCheckBig
                size={20}
                color={tab === "tasks" ? "#193cb8" : "#62748e"}
              />
              <p>Tasks</p>
            </button>
            <button
              onClick={() => {
                dispatch(swap("projects"));
                close();
              }}
              className={`flex w-full items-center leading-5 gap-4 p-3 rounded-lg text-slate-700 ${
                tab === "projects" ? activeStyles : ""
              }`}
            >
              <LayoutGrid
                size={20}
                color={tab === "projects" ? "#193cb8" : "#62748e"}
              />
              <p>Projects</p>
            </button>
            <button
              onClick={() => {
                dispatch(swap("team"));
                close();
              }}
              className={`flex w-full items-center leading-5 gap-4 p-3 rounded-lg text-slate-700 ${
                tab === "team" ? activeStyles : ""
              }`}
            >
              <Users size={20} color={tab === "team" ? "#193cb8" : "#62748e"} />
              <p>Team</p>
            </button>
          </div>
        </div>
      </aside>
    </div>,
    portalElement
  );
}
