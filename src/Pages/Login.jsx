import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("Login successful!");
        toast.info("Welcome Back!");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email. Please register.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
        toast.error(`Login failed: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();

    setLoading(true);

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success("Google login successful!");
        toast.info("Welcome Back!");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Google login popup closed. Please try again.");
        } else if (error.code === "auth/cancelled-popup-request") {
          toast.error("Another login attempt is already in progress.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
        toast.error(`Google login failed: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {/* login */}

      <div className="flex justify-center">
        <div className="container-2 lg:flex">
          <div className="ml-[30px]">
            <div className="heading">Login</div>
            <form className="form relative" onSubmit={handleLogin}>
              {/* Email Input */}
              <input
                placeholder="E-mail"
                id="email"
                name="email"
                type="email"
                className="input-2 w-full bg-white border-none p-[15px] pl-[50px] rounded-[20px] mt-[15px] shadow-[0px_10px_10px_-5px_#cff0ff] border-l-2 focus:outline-none focus:border-[#12b1d1]"
                required
              />
              {/* Password Input */}
              <div className="relative">
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="input-2 w-full bg-white border-none p-[15px] pl-[50px] rounded-[20px] mt-[15px] shadow-[0px_10px_10px_-5px_#cff0ff] border-l-2 focus:outline-none focus:border-[#12b1d1]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="btnEye absolute right-[30px] top-[60px]"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <input
                value="Login"
                type="submit"
                className="login-button block w-full font-bold text-white py-[15px] mt-[20px] mx-auto rounded-[20px] bg-black border-none transition-all ease-in-out duration-200 hover:scale-105 hover:shadow-[0px_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]"
              />

              <div className="flex">
                <h1>you Don't have a account?</h1>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-600 transition-all duration-200 ml-1"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
          <div className="lg:ml-[70px]">
            <div className="social-account-container">
              <span className="title">Or Sign in with</span>
              <div className="flex-col-1 space-y-3">
                <button
                  className="btn google flex items-center justify-center space-x-2 border border-gray-200 py-3 px-[52px] rounded-[19px] text-[13px] font-medium"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    style={{ enableBackground: "new 0 0 512 512" }}
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                  >
                    <path
                      d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"
                      style={{ fill: "#FBBB00" }}
                    />
                    <path
                      d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                      style={{ fill: "#518EF8" }}
                    />
                    <path
                      d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                      style={{ fill: "#28B446" }}
                    />
                    <path
                      d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"
                      style={{ fill: "#F14336" }}
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div>
            <span className="agreement">
              <a href="#">Learn user license agreement</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
