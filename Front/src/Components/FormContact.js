import React, { useRef } from "react";
import emailjs from "@emailjs//browser";

const FormContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `service_7ogqabk`, // service ID
        "template_rttpfta", //  template ID
        form.current, // modèle template
        "CyYv8QtOussiCWpyM" // clé public
      )
      .then(
        (result) => {
          console.log("Email envoyé :", result.text);
          alert("Votre message a été envoyé avec succès !");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="form-contact">
      <h1>Contactez moi !</h1>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          name="nom"
          id="nom"
          placeholder="Nom et prenom"
          required
        />

        <input type="email" id="email" name="email" placeholder="Email" />

        <input
          type="text"
          name="objet"
          id="objet"
          placeholder="objet"
          required
        />

        <textarea
          name="message"
          id="message"
          placeholder="Message"
          cols="30"
        ></textarea>
        <input type="submit" id="submit" />
      </form>
    </div>
  );
};

export default FormContact;
