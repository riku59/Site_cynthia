import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1>Création by Cynthia</h1>
        <p>
          Bienvenue sur ma boutique en ligne ! Découvrez l'élégance de la
          création artisanale et explorez des pièces uniques conçues avec
          passion. Plongez-vous dans un univers où chaque article raconte une
          histoire, apportant une touche d'authenticité et de créativité à votre
          vie quotidienne. Explorez notre sélection exceptionnelle de créations
          faites main et laissez-vous séduire par l'art de l'originalité. Nous
          sommes ravis de vous accueillir et espérons que cette visite sera le
          début d'une expérience unique et mémorable.
        </p>
      </div>
      <div className="header-img">
        <img src="background_header.jpg" alt="" />
      </div>
    </div>
  );
};

export default Header;
