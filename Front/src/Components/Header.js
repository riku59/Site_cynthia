import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Header = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const titleText = titleRef.current.textContent;
    const titleChars = Array.from(titleText);

    // Supprime le contenu actuel du titre
    titleRef.current.innerHTML = "";

    // Crée des éléments span pour chaque caractère et les ajoute au titre
    titleChars.forEach((char, index) => {
      const charSpan = document.createElement("span");

      // Si le caractère est un espace, ajoutez simplement un espace
      if (char === " ") {
        charSpan.innerHTML = "&nbsp;";
      } else {
        charSpan.textContent = char;

        // Animation d'arrivée de chaque lettre
        gsap.from(charSpan, {
          opacity: 0,
          y: 100,
          x: 100,
          scale: 1.2,
          duration: 3,

          ease: "steps(2)",
          delay: index * 0.1, // Délai progressif pour chaque lettre
        });
      }

      titleRef.current.appendChild(charSpan);
    });

    // Animation d'opacité globale
    gsap.to(titleRef.current, {
      opacity: 1,
      duration: 5,
      ease: "slow.out",
    });
  }, []);

  return (
    <div className="header">
      <div className="header-text">
        <h1 ref={titleRef}>
          <span>C</span>
          <span>r</span>
          <span>é</span>
          <span>a</span>
          <span>t</span>
          <span>i</span>
          <span>o</span>
          <span>n</span>
          <span>&nbsp;</span>
          <span>b</span>
          <span>y</span>
          <span id="span-br"> </span>
          <span>C</span>
          <span>y</span>
          <span>n</span>
          <span>t</span>
          <span>h</span>
          <span>i</span>
          <span>a</span>
        </h1>
        <p>
          Bienvenue dans ma boutique en ligne ! Découvrez l'élégance de
          créations artisanales uniques, conçues avec passion. Plongez dans un
          univers où chaque article raconte une histoire authentique. Explorez
          notre sélection exceptionnelle de créations faites main et
          laissez-vous séduire par l'originalité.
        </p>
      </div>
      <div className="header-img">
        <img src="image_accueil.webp" alt="" />
      </div>
    </div>
  );
};

export default Header;
