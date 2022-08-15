import { useState } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./views/Home";
import Cities from "./views/Cities";
import SingleCity from "./views/SingleCity";
import app from "./firebase";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element= {<Cities />}>
            <Route path=":city" element={<SingleCity />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;