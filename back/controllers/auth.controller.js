const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const confirmationCode = crypto.randomBytes(20).toString("hex");
    const emailError = await sendConfirmationEmail(email, confirmationCode);
    if (emailError) {
      res.status(500).json({
        message: "Failed to send confirmation email",
        error: emailError.message,
      });
      return;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmationCode,
      status: "Pending",
    });

    await newUser.save();
    sendConfirmationEmail(email, confirmationCode);
    res.status(201).json({
      message:
        "User registered successfully. Please check your email to confirm.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation basique (pourrait être améliorée avec Joi ou une autre librairie)
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // Utilisez la clé secrète de l'environnement
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

async function sendConfirmationEmail(userEmail, confirmationCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Veuillez confirmer votre compte",
      html: `<h1>Confirmation de l'email</h1>
         <h2>Bonjour!</h2>
         <p>Merci de vous être inscrit sur Création by C1thia. Veuillez confirmer votre e-mail en cliquant sur le lien suivant:</p>
         <a href=http://localhost:3000/confirm/${confirmationCode}> Cliquez ici</a>
         </div>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent: " + info.response);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return error; // Propager l'erreur pour la gérer plus haut dans la chaîne
  }
}

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or invalid confirmation code" });
    }

    user.status = "Active"; // Mettre à jour le statut de l'utilisateur
    await user.save();

    res.status(200).json({ message: "Account successfully verified!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
