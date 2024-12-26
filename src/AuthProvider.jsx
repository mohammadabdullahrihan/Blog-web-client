import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "./fire.init";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const user = { email: currentUser?.email };
        axios
          .post("https://blog-web-server-kappa.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => console.log("token added", res.data));
      } else {
        axios
          .post(
            "https://blog-web-server-kappa.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => console.log("token removed", res.data));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Log out the user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // If loading, return a simple loading spinner
  if (loading) {
    return (
      <div className="flex justify-center mt-[200px] lg:mt-[320px]">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="lg:w-20 lg:h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-black rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
