import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

// React Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  //   Signup User
  const signup = async (email, password, name) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update user name
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  };

  //   Login User
  const login = async (email, password) => {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //   Logout User
  const logout = async () => {
    const auth = getAuth();
    return await signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
