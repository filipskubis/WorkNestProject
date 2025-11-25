interface AlertProps {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  stale: boolean;
}

export default function Alert({ id, type, message, stale }: AlertProps) {
  const animation = stale ? "slideOut" : "slideIn";
  const styles = {
    success: `absolute left-1/2 w-max bg-[#0dca6f] text-slate-100 text-shadow-lg px-12 py-4 rounded-2xl font-bold text-md border-2 border-[#00b259]`,
    error:
      "absolute left-1/2 w-max bg-[#E74A5E]  text-slate-100 text-shadow-lg px-12 py-4 rounded-2xl font-bold text-md border-2 border-[#bd1c3d]",
    info: "absolute left-1/2 w-max bg-[#4D5FF1] text-slate-100 text-shadow-lg px-12 py-4 rounded-2xl font-bold text-md border-2 border-[#3d49da]",
  };
  return (
    <div className={styles[type] + " " + animation} key={id}>
      <p>{message}</p>
    </div>
  );
}
