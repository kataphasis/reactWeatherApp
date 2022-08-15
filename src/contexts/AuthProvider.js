import {
    signOut,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
  } from "@firebase/auth";
  import { createContext, useEffect, useState } from "react";
  
  export const AuthContext = createContext();
  
  export const AuthProvider = (props) => {
    const [user, setUser] = useState({ loggedIn: false });
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    const login = () => {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithPopup(auth, provider)
            .then((result) => {
              console.log("User Logged In");
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
  
              console.error(errorCode, errorMessage, email);
              // ...
            });
        })
        .catch((err) => console.error(err));
    };
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({
            username: user.displayName,
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
            loggedIn: true,
          });
        } else {
          setUser([{ loggedIn: false }]);
        }
      });
    }, []);
  
    const values = {
      login,
      logout,
      user,
    };
  
    return (
      <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
    );
  };