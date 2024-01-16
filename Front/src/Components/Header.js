import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1>Création by Cynthia</h1>
        <p>
          Bienvenue dans ma boutique en ligne ! Découvrez l'élégance de
          créations artisanales uniques, conçues avec passion. Plongez dans un
          univers où chaque article raconte une histoire authentique. Explorez
          notre sélection exceptionnelle de créations faites main et
          laissez-vous séduire par l'originalité.
        </p>
      </div>
      <div className="header-img">
        <img src="background_header.jpg" alt="" />
      </div>
    </div>
  );
};

export default Header;
