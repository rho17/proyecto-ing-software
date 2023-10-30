const express = require('express');
const router = express.Router();
const SolicitudPatente = require('../models/solicitud.model');
const { notificarCambioEstado } = require('../services/emailService');

// Ruta para cambiar el estado de una solicitud
router.post('/solicitud/:id/cambiar-estado', async (req, res) => {
  try {
    const solicitud = await SolicitudPatente.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).send('Solicitud no encontrada');
    }

    // Actualiza el estado de la solicitud con el nuevo estado proporcionado en el cuerpo de la solicitud
    solicitud.estado = req.body.nuevoEstado;

    await solicitud.save();

    // Notificar al usuario por correo
    notificarCambioEstado(solicitud);

    res.status(200).json({ message: 'Estado de solicitud actualizado con éxito' });
  } catch (error) {
    res.status(500).send('Error al cambiar el estado de la solicitud.');
  }
});

module.exports = router;
