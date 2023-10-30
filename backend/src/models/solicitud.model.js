
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solicitudPatenteSchema = new Schema({
  codigo: { type: String, unique: true, required: true, maxlength: 10 },
  estado: { type: String, enum: ['Pendiente', 'Enviada', 'En revisión', 'Pendiente visita de inspeccion', 'Inspeción realizada', 'Pendiente firma del alcalde',  'Aprobada', 'Apelable', 'Rechazada'], required: true },
  nombreSolicitante: { type: String, required: true },
  tipoPatente: { type: String, required: true },
  fechaSolicitud: { type: Date, default: Date.now },
  usuario: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al modelo de usuario
  archivoAdjunto1: String,
  archivoAdjunto2: String,
  archivoAdjunto3: String,
  archivoAdjunto4: String,
  archivoAdjunto5: String,
  archivoAdjunto6: String,
  archivoAdjunto7: String,
  archivoAdjunto8: String,
  archivoAdjunto9: String,
});

const SolicitudPatente = mongoose.model('SolicitudPatente', solicitudPatenteSchema);

module.exports = SolicitudPatente;

// user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
}, {
  versionKey: false,
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
