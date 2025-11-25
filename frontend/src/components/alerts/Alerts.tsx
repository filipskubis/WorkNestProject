import { createPortal } from "react-dom";
import { selectAlerts } from "@/features/alert/alertSlice";
import { useAppSelector } from "@/app/hooks";
import Alert from "./Alert";

export default function Alerts() {
  const alerts = useAppSelector(selectAlerts);
  const portalElement = document.getElementById("alert-portal");

  if (!portalElement) return null;
  return createPortal(
    <div className="absolute inset-0 py-4 pointer-events-none">
      {alerts.map(({ id, type, message, stale }) => (
        <Alert type={type} message={message} stale={stale} id={id} />
      ))}
    </div>,
    portalElement
  );
}
