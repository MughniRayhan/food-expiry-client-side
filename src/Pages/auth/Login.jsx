import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import UseAxios from "../../Hooks/UseAxios";

function Login() {
  const { signinWithGoogle, signIn, setUser } = UseAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
 const axiosPublic = UseAxios();
  // 🔹 Handle login with email & password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMsg("");

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
          draggable: true,
        });
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  // 🔹 Handle Google Sign-in
  const handleSigninWithGoogle = async () => {
      try {
        const result = await signinWithGoogle();
        const user = result.user;
        setUser(user);
  
        // ✅ Save user to MongoDB
        await axiosPublic.post("/users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
        });
  
        Swal.fire({
          title: "Logged in successfully!",
          icon: "success",
        });
        navigate(location.state ? location.state : "/");
      } catch (error) {
        setErrorMsg(error.message);
        toast.error("Google sign-in failed");
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-base-300">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-6 mt-8">
        <h1 className="sm:text-3xl text-2xl font-bold text-center mb-4">
          Login now!
        </h1>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label mt-4">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />

            {errorMsg && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-neutral bg-primary border-none mt-4"
            >
              Login
            </button>

            <p className="text-center my-2">OR</p>

            <button
              onClick={handleSigninWithGoogle}
              type="button"
              className="btn bg-white text-black border border-gray-300"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="mr-2"
              >
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </svg>
              Login with Google
            </button>
          </fieldset>

          <p className="text-gray-500 text-sm mt-3 text-center">
            New to this website?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
