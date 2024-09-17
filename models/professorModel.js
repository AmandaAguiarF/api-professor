const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  disciplina: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Professor', ProfessorSchema);
