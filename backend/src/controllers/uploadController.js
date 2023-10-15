const File = require('../models/file');

// Se crea el controlador para cargar un archivo PDF
const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const newFile = new File({
      filename: file.filename,
      path: file.path,
    });
    await newFile.save();
    res.status(201).json({ message: 'Archivo subido exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
};

// Se crea el controlador para recuperar un archivo PDF
const getFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    res.download(file.path);
  } catch (error) {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
};

module.exports = { uploadFile, getFile };
