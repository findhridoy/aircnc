import { CircularProgress } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// React Context
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  //   Signup User
  const signup = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);

    // update user name
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    setUserInfo({ ...auth.currentUser });
  };

  //   Login User
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Logout User
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signup,
    login,
    logout,
    userInfo,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="loader">
          <CircularProgress color="secondary" size={60} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
