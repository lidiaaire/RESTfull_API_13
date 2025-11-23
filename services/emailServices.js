const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lidia.devworks@gmail.com",
    pass: "slyy qetg pdcf seex",
  },
});

const sendEmail = async () => {
  try {
    const mailOptions = {
      from: "lidia.devworks@gmail.com",
      to: "lidiagarciatorregrosa@gmail.com",
      subject: "Soy una prueba de nodemailer",
      html: "<h1> Hola, gracias por llegar</h1>",
    };
    await transporter.sendMail(mailOptions);
    console.log("Se ha enviado correctamente");
  } catch (error) {
    console.log("No se ha enviado el correo", error);
  }
};

module.exports = { sendEmail };
