const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const SolicitudPatente = require('./models/solicitud.model'); 

app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/solicitud_patentes', { useNewUrlParser: true, useUnifiedTopology: true });

// Ruta para mostrar el formulario de solicitud
app.get('/solicitud', (req, res) => {
  res.render('formulario_solicitud.ejs'); //pendiente crear una vistas del formulario
});

// Ruta para manejar la creación de la solicitud
app.post('/solicitud', async (req, res) => {
  try {
    const { codigo, estado, nombreSolicitante, tipoPatente } = req.body;
    const nuevaSolicitud = new SolicitudPatente({
      codigo,
      estado,
      nombreSolicitante,
      tipoPatente,
    });
    await nuevaSolicitud.save();
    res.redirect('/solicitud');
  } catch (error) {
    res.status(500).send('Error al crear la solicitud de patente.');
  }
});

app.listen(3000, () => {
  console.log('La aplicación está corriendo en http://localhost:3000');
});
