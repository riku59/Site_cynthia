import React, { useEffect, useRef } from "react";
import Logo from "./Logo";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.to(footerRef.current, {
      opacity: 1,

      duration: 2,
      ease: "slow.out",
    });
  }, []);
  return (
    <div className="footer" ref={footerRef}>
      <Logo />
      <p>Laisser un avis</p>
      <p>Me contacter</p>
      <p>Page facebook</p>
    </div>
  );
};

export default Footer;
