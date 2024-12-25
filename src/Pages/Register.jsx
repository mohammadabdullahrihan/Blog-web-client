import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const provider = new GoogleAuthProvider();

  const validatePassword = (password) => {
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    const regexNumeric = /[0-9]/;

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!regexUppercase.test(password)) {
      return "Password must have at least one uppercase letter";
    }
    if (!regexLowercase.test(password)) {
      return "Password must have at least one lowercase letter";
    }
    if (!regexSpecialCharacter.test(password)) {
      return "Password must have at least one special character";
    }
    if (!regexNumeric.test(password)) {
      return "Password must have at least one numeric character";
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = e.target.terms.checked;

    // Validation checks
    if (!name) {
      toast.error("Name is required.");
      return;
    }
    if (!photoURL) {
      toast.error("Photo URL is required.");
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (!terms) {
      toast.error("You must accept the terms of use.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googlePhotoURL = user.photoURL;
      const googleName = user.displayName || name;

      await updateProfile(user, {
        displayName: googleName,
        photoURL: googlePhotoURL,
      });

      navigate("/home");
    } catch (error) {
      toast.error("Google registration failed: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-16 ">
        <div className="container">
          <div className="text-3xl  font-semibold ml-[70px]">Register</div>
          <form className="form relative" onSubmit={handleRegister}>
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              placeholder="Photo-URL"
              id="photo"
              name="photo"
              type="text"
              className="input"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
            />

            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <div className="relative">
              <input
                placeholder="Password"
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="btnEye"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input value="Register" type="submit" className="login-button" />

            <div className="social-account-container">
              <span className="title">Or Sign in with</span>
              <div className="flex-col-1 space-y-3"></div>
            </div>

            <label className="flex cursor-pointer items-center justify-between p-1">
              <div className="relative inline-block">
                <input
                  name="terms"
                  type="checkbox"
                  className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                />
                <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:left-7 peer-checked:bg-gray-900"></span>
              </div>
              <h1 className="mr-[60px] mb-[7px] font-medium text-[14px]">
                Accept terms of use
              </h1>
            </label>

            <p className="text-[15px] my-4 ">
              Already have an account? <Link to={"/login"}>Login Here</Link>{" "}
            </p>
          </form>
          <div className="ml-[70px]">
            <div className="social-account-container">
              <span className="mx-5 font-semibold">Or Sign in with</span>

              <div className="flex-col-1 space-y-3">
                <button
                  className="button x flex border border-gray-200 py-3 px-[110px] -ml-[70px] rounded-[19px] text-[13px] font-medium google mt-4"
                  onClick={handleGoogleRegister}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
