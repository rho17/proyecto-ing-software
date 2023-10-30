const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

const notificarCambioEstado = async (solicitud) => {
  try {
    const usuario = await User.findById(solicitud.usuario).exec();

    if (!usuario) {
      return;
    }

    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: usuario.email,
      subject: 'Cambio de estado de solicitud',
      text: `El estado de su solicitud ha cambiado a: ${solicitud.estado}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico: ' + error);
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
      }
    });
  } catch (error) {
    console.log('Error al notificar el cambio de estado: ' + error);
  }
};

module.exports = { notificarCambioEstado };
