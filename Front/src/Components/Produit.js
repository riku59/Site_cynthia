import React, { useEffect } from "react";
import gsap from "gsap/src";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Produit = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".d", {
      scrollTrigger: {
        trigger: ".d",
        start: "top 300px",
        end: "top 0px",
        markers: true,
        scrub: true,
        pin: true, // vers le bas
        // toggleActions: "restart pause reverse pause",
      },
      x: 250,
      rotation: 360,
      duration: 1,
      ease: "none",
    });
  }, []);
  return (
    <div>
      <h1>Mes créations</h1>
      <div className="produit">
        <img className="a" src="logo_creation_by.jpg" alt="" />
        <img className="b" src="logo_creation_by.jpg" alt="" />
        <img className="c" src="logo_creation_by.jpg" alt="" />
        <img className="d" src="logo_creation_by.jpg" alt="" />
        <img className="e" src="logo_creation_by.jpg" alt="" />
        <img src="logo_creation_by.jpg" alt="" />
      </div>
    </div>
  );
};

export default Produit;
