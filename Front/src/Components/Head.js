import React from "react";

const Head = () => {
  return (
    <div className="head">
      <h2>Une demande spécifique?</h2>
      <div className="head-explain">
        <div className="head-container">
          <h3>Choisissez votre thème</h3>
          <img src="idee.png" alt="logo idée" />
        </div>
        <div className="head-container">
          <h3>Choisissez vos couleurs</h3>
          <img src="paint-palette.png" alt="logo couleur" />
        </div>
        <div className="head-container">
          <h3>Choisissez votre support</h3>
          <img src="support.png" alt="logo support" />
        </div>
      </div>
    </div>
  );
};

export default Head;
