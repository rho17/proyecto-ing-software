"use strict";

const express = require("express");
const filesController = require("../controllers/file.controller.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

// Rutas para manejar archivos PDF
router.get("/", filesController.getAllPDFs);
router.post("/", filesController.uploadPDF);
router.post("/", filesController.deletePDF);

module.exports = router;