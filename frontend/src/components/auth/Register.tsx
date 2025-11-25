import { Eye, EyeOff, LogIn, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "@/utils/fetcher";
import { useAppDispatch } from "@/app/hooks";
import { addAlertWithTimeout, clearAlerts } from "@/features/alert/alertSlice";

export default function Register() {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function togglePassword() {
    setShow((prev) => !prev);
  }

  function validateInput(): boolean {
    if (password.length < 12) {
      dispatch(
        addAlertWithTimeout({
          type: "error",
          message: "Password must be at least 12 letters",
        })
      );
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch(
        addAlertWithTimeout({
          type: "error",
          message: "Please enter a valid email",
        })
      );
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      dispatch(
        addAlertWithTimeout({
          type: "error",
          message: "Password must contain at least one capital letter",
        })
      );
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      dispatch(
        addAlertWithTimeout({
          type: "error",
          message: "Password must contain at least one special character",
        })
      );
      return false;
    }
    if (password !== confirmPassword) {
      dispatch(
        addAlertWithTimeout({ type: "error", message: "Passwords don't match" })
      );
      return false;
    }
    return true;
  }

  async function registerUser() {
    if (!validateInput()) return;
    try {
      const data = await fetcher({
        address: "/auth/register",
        method: "POST",
        body: { email, password },
      });
      if (data.ok) {
        dispatch(clearAlerts());
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center">
      <div className="bg-linear-to-br from-blue-500 to-purple-700 p-0.5 h-fit w-[90%] rounded-lg shadow-lg">
        <form
          className="w-full h-full bg-white rounded-md flex flex-col items-center p-6 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <LogIn size={28} color={"#4d5ff1"} />
            <div className="flex flex-col gap-0 items-center">
              <p className="font-bold text-xl text-slate-900">Hey there!</p>
              <p className="text-md text-slate-400">Create your account</p>
            </div>
          </div>
          <label htmlFor="" className="w-full">
            <p className="font-bold text-slate-500">Email</p>
            <div className="relative before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-slate-300">
              <UserRound
                className="absolute right-1 top-1/2 -translate-y-1/2"
                color="#62748e"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                className="w-full focus:outline-none p-1 bg-transparent text-lg!"
              />
            </div>
          </label>
          <label htmlFor="" className="w-full">
            <p className="font-bold text-slate-400">Password</p>
            <div className="relative before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-slate-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePassword();
                }}
              >
                {show ? (
                  <Eye
                    className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.03] transition-all"
                    color="#62748e"
                  />
                ) : (
                  <EyeOff
                    className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-[1.03] transition-all"
                    color="#62748e"
                  />
                )}
              </button>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                className="w-full focus:outline-none p-1 text-lg!"
              />
            </div>
          </label>
          <label htmlFor="" className="w-full">
            <p className="font-bold text-slate-400">Confirm Password</p>
            <div className="relative before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-slate-300">
              <input
                type={show ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  e.preventDefault();
                  setConfirmPassword(e.target.value);
                }}
                className="w-full focus:outline-none p-1 text-lg!"
              />
            </div>
          </label>
          <div className="relative">
            <button
              className={`w-fit px-6 py-4 bg-[#4d5ff1] text-white rounded-2xl text-lg! cursor-pointer font-semibold! will-change-transform transition-all duration-500  hover:scale-[1.01] shadow-xl`}
            >
              Register
            </button>
          </div>
          <Link to="/login" className="text-md text-slate-400 font-semibold">
            Already have an account? Sign in{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
