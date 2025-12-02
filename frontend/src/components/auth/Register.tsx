import { AtSign, Eye, EyeOff, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "@/utils/fetcher";
import { useAppDispatch } from "@/app/hooks";
import { addAlertWithTimeout, clearAlerts } from "@/features/alert/alertSlice";
import TextInput from "../inputs/TextInput";

export default function Register() {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focus, setFocus] = useState("");
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
        body: { email, password, name },
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
            <UserRound size={28} color={"#4d5ff1"} />
            <div className="flex flex-col gap-0 items-center">
              <p className="font-bold text-xl text-slate-900">Hey there!</p>
              <p className="text-md text-slate-400">Create your account</p>
            </div>
          </div>
          <TextInput
            focus={focus}
            setFocus={setFocus}
            value={name}
            setValue={setName}
            id="name"
            type="text"
            title="Name"
          >
            <UserRound
              className="absolute right-1 top-1/2 -translate-y-1/2"
              color="#62748e"
            />
          </TextInput>
          <TextInput
            focus={focus}
            setFocus={setFocus}
            value={email}
            setValue={setEmail}
            id="email"
            type="email"
            title="Email"
          >
            <AtSign
              className="absolute right-1 top-1/2 -translate-y-1/2"
              color="#62748e"
            />
          </TextInput>
          <TextInput
            focus={focus}
            setFocus={setFocus}
            value={password}
            setValue={setPassword}
            id="password"
            type={show ? "text" : "password"}
            title="Password"
          >
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
          </TextInput>
          <TextInput
            focus={focus}
            setFocus={setFocus}
            value={confirmPassword}
            setValue={setConfirmPassword}
            id="confirmPassword"
            type={show ? "text" : "password"}
            title="Confirm Password"
          />
          <div className="relative">
            <button
              tabIndex={5}
              className={`w-fit px-6 py-4 bg-[#4d5ff1] text-white rounded-2xl text-lg! cursor-pointer font-semibold! will-change-transform transition-all duration-300  hover:scale-[1.02] shadow-xl`}
            >
              Register
            </button>
          </div>
          <Link
            to="/login"
            tabIndex={6}
            className="text-md text-slate-400 font-semibold hoverUnderline before:bg-slate-200 after:bg-slate-200"
          >
            Already have an account? Sign in{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
