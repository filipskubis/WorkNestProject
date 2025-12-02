import { useState, useEffect, type JSX } from "react";
import { useAppSelector } from "@/app/hooks";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { selectUser } from "@/features/user/userSlice";
import TextInput from "../inputs/TextInput";
import TextArea from "../inputs/TextArea";
import DatePicker from "../inputs/DatePicker";
type SidebarProps = {
  setActive: React.Dispatch<React.SetStateAction<"sidebar" | "tasks" | "">>;
};

export default function TaskModal({
  setActive,
}: SidebarProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const user = useAppSelector(selectUser);
  const [focus, setFocus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setOnScreen(true);
    }, 10);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalElement = document.getElementById("task-portal");

  function close() {
    setActive("");
  }

  function handleAddTask(e: any) {
    e.preventDefault();
    return;
  }

  if (!portalElement) return null;

  return createPortal(
    <div>
      {onScreen ? (
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={close}
        ></div>
      ) : null}
      <form
        onSubmit={handleAddTask}
        className="min-w-[260px] fixed flex flex-col gap-4 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[80%] bg-white h-fit rounded-xl"
      >
        <div className="relative">
          <p className="text-2xl font-bold p-4 text-black opacity-50">
            Create Task
          </p>
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black opacity-50"></span>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <TextInput
            focus={focus}
            setFocus={setFocus}
            id="name"
            title="Name"
            value={name}
            setValue={setName}
            type="text"
          ></TextInput>
          <DatePicker title="Due Date" />
          <TextArea
            value={description}
            setValue={setDescription}
            focus={focus}
            setFocus={setFocus}
            id="description"
            title="Description"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-2 rounded-xl bg-black opacity-90 text-white font-semibold! text-xl! w-fit self-center m-8! hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
        >
          {" "}
          Create{" "}
        </button>
      </form>
    </div>,
    portalElement
  );
}
