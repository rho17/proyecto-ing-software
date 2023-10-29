"use strict";

const Request = require("../models/request.model");

async function createRequest(req, res) {
  try {
    const { user, documents } = req.body;
    const newRequest = new Request({
      user,
      documents,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateRequest(req, res) {
    try {
      const solicitudId = req.params.id;
      const { estado } = req.body;
  
      const solicitudToUpdate = await Solicitud.findById(solicitudId);
  
      if (!solicitudToUpdate) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }
  
      solicitudToUpdate.estado = estado;
      await solicitudToUpdate.save();
  
      res.status(200).json({ message: "Solicitud actualizada con exito", solicitud: solicitudToUpdate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function deleteRequest(req, res) {
    try {
      const solicitudId = req.params.id;
      const solicitudToDelete = await Solicitud.findById(solicitudId);
  
      if (!solicitudToDelete) {
        return res.status(404).json({ error: "Solicitud not found" });
      }
  
      // Aquí podrías agregar lógica adicional para verificar permisos, etc.
  
      await solicitudToDelete.remove();
  
      res.status(200).json({ message: "Solicitud deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getAllRequests(req, res) {
  try {
    const requests = await Request.find().populate("user").populate("documents");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createRequest,
  getAllRequests,
  deleteRequest,
  updateRequest,
};
