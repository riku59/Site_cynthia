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
import ConfirmationMail from "./pages/ConfirmationMail";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import EmailVerificationFailure from "./pages/EmailVerificationFailure";
import { CartProvider } from "./context/CartContext";
import Cart from "./Components/Cart";
import Produit from "./Components/Produit";

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
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Creations" element={<Creation />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<NewUser />} />
          <Route path="/verify-email" element={<SignupConfirmation />} />
          <Route
            path="/confirm/:confirmationCode"
            element={<ConfirmationMail />}
          />
          <Route
            path="/verification-success"
            element={<EmailVerificationSuccess />}
          />
          <Route
            path="/verification-failure"
            element={<EmailVerificationFailure />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/produit" element={<Produit />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
