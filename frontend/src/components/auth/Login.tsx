import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/user/userSlice";
import fetcher from "@/utils/fetcher";
import { Eye, EyeOff, LogIn, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    const data = await fetcher({
      address: "/auth/login",
      method: "POST",
      body: { email, password },
    });
    dispatch(setUser(data.user));
    navigate("/");
  }

  function togglePassword(e: any) {
    e.preventDefault();
    setShow((prev) => !prev);
  }

  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center">
      <div className="bg-linear-to-br from-blue-500 to-purple-700 p-0.5 h-fit w-[90%] rounded-lg shadow-lg">
        <form
          className="w-full h-full bg-white rounded-md flex flex-col items-center p-6 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <LogIn size={28} color={"#4d5ff1"} />
            <div className="flex flex-col gap-0 items-center">
              <p className="font-bold text-xl text-slate-900">Welcome!</p>
              <p className="text-md text-slate-400">Sign in to your account</p>
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
              <button onClick={togglePassword}>
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
                minLength={12}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                className="w-full focus:outline-none p-1 text-lg!"
              />
            </div>
          </label>
          <div className="relative perspective-normal">
            <button
              className={`w-fit px-6 py-4 bg-[#4d5ff1] text-white rounded-2xl text-lg! cursor-pointer font-semibold! will-change-transform transition-all duration-500  hover:scale-[1.01] shadow-xl`}
            >
              Login
            </button>
          </div>
          <Link
            to="/register"
            className="text-md text-slate-400 font-semibold "
          >
            New here? Create an account{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
