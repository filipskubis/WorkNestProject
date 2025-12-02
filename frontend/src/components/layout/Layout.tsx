import Navbar from "../navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import { useAppSelector } from "@/app/hooks";
import { selectIsLoading, selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";

export default function Layout() {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login");
      }
    }
  }, [isLoading, user, navigate]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen relative">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
