import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

function ResultMap(props) {
  const containerStyle = {
    // width: "calc(50% + 60px)",
    width: "50%",
    height: "100%",
  };

  return (
    <div className="map">
      <Map
        style={containerStyle}
        google={props.google}
        initialCenter={{ lat: props.lat, lng: props.lng }}
        zoom={10}
      >
        <Marker name={"Current location"} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2_5C3vlNmcCzKEAlVEPlq9Pv4Febi0b8",
})(ResultMap);








// React Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      const { email: currentUser, displayName } = user;

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ currentUser, displayName })
      );
    });
    return unsubcribe;
  }, []);

  //   Signup User
  const signup = async (email, password, name) => {
    setLoading(true);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update user name
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    const { email: currentUser, displayName } = auth.currentUser;
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ currentUser, displayName })
    );
    setLoading(false);
  };

  //   Login User
  const login = async (email, password) => {
    setLoading(true);
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response) {
      const { email: currentUser, displayName } = auth.currentUser;

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ currentUser, displayName })
      );
      setLoading(false);
    } else {
      console.log("problem");
    }
  };

  //   Logout User
  const logout = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem("userInfo");
      setLoading(false);
    } catch (error) {
      setErrors(error);
    }
  };

  const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));

  const value = {
    loading,
    setLoading,
    errors,
    signup,
    login,
    userInfoFromStorage,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
