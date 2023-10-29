"use strict";

const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    ruta: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["correcto", "incorrecto"],
      default: "correcto",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PDF = mongoose.model("PDF", pdfSchema);

module.exports = PDF;