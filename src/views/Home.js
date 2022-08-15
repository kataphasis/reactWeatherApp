import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, Route } from "react-router-dom";

export default function Home() {
  const { login, user } = useContext(AuthContext);
  return (
    <>
        {(user.loggedIn) ? 
          <Navigate to ="/cities"/>
        : 
          <div>
            <div>
              <h1>Welcome to Patrick's Weather App</h1>
              <p>Please sign into your account</p>
              <button onClick={login}>
                Sign In
              </button>
            </div>
          </div>
        }</>
  );
}

