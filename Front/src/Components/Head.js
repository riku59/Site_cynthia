import React from "react";

const Head = () => {
  return (
    <div className="head">
      <h2>Une demande spécifique?</h2>
      <div className="head-explain">
        <div className="head-container">
          <p>Choisissez votre thème</p>
          <img src="idee.png" alt="logo idée" />
        </div>
        <div className="head-container">
          <p>Choisissez vos couleurs</p>
          <img src="paint-palette.png" alt="logo couleur" />
        </div>
        <div className="head-container">
          <p>Choisissez votre support</p>
          <img src="support.png" alt="logo support" />
        </div>
      </div>
    </div>
  );
};

export default Head;
