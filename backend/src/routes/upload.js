// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Se configura Multer para guardar archivos PDF en una ubicación específica
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Controladores para la carga y recuperación de archivos PDF
const { uploadFile, getFile } = require('../controllers/uploadController');

router.post('/upload', upload.single('pdf'), uploadFile);
router.get('/file/:id', getFile);

module.exports = router;
