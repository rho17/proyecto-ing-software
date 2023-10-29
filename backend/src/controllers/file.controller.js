"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const PDF = require("../models/file.model");

async function getAllPDFs(req, res) {
  try {
    const pdfs = await PDF.find();
    respondSuccess(req, res, 200, pdfs);
  } catch (error) {
    handleError(error, "pdf.controller -> getAllPDFs");
    respondError(req, res, 500, "Error al obtener los archivos PDF");
  }
}

async function uploadPDF(req, res) {
  try {
    // Lógica para subir un archivo PDF
    // ...
    respondSuccess(req, res, 201, "PDF subido exitosamente");
  } catch (error) {
    handleError(error, "pdf.controller -> uploadPDF");
    respondError(req, res, 500, "Error al subir el archivo PDF");
  }
}

async function deletePDF(req, res) {
  try {
    const pdfId = req.params.id;
    const pdfToDelete = await Pdf.findById(pdfId);

    if (!pdfToDelete) {
      return res.status(404).json({ error: "PDF no encontrado" });
    }

    await pdfToDelete.remove();

    res.status(200).json({ message: "PDF eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getAllPDFs,
  uploadPDF,
  deletePDF,
};