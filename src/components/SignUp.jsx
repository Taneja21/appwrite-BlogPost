import { useState } from "react";
import { Input } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../features/authSlice";

function SignUp() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const singUp = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authService.createAccount(data);
      console.log("Session is :: ", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }

    console.log("Error by SetError :: ", error);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          className="h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-3.333 0-5 1.333-5 4s1.667 4 5 4 5-1.333 5-4-1.667-4-5-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12v2m0-4v-2m0 6v4m0-10c2.5 0 4 2.5 4 4m0 0c0 2.5-1.5 4-4 4m0 0c-2.5 0-4-1.5-4-4m0 0c0-1.5.5-3 2-3m0 0h4"
          />
        </svg>
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create A New Account
        </h2>
      </div>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <div className=" mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(singUp)}>
          <div>
            <Input
              label="Full Name: "
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div>
            <Input
              label="Email: "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Enter a valid Email address",
                },
              })}
            />
          </div>
          <div>
            <Input
              label="Password: "
              type="password"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
