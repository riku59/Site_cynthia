import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import SignupConfirmation from "./pages/SignupConfirmation";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Creations" element={<Creation />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<NewUser />} />
        <Route path="/verify-email" element={<SignupConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
