import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { checkAuth } from "@/features/user/userSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
}
