import Navbar from "../navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";

export default function Layout() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen relative">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
