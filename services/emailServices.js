const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lidia.devworks@gmail.com",
    pass: "slyy qetg pdcf seex",
  },
});

const sendRegistrationEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: "lidia.devworks@gmail.com",
      to: email,
      subject: "Registro Completado",
      html: `<h2>Hola ${name}, gracias por registrarte!</h2>
      <p> Tu registro se ha completado correctamente.</p>`,
    });
    console.log("Email enviado al usuario");
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};

module.exports = { sendRegistrationEmail };
