const Professor = require('../models/professorModel');
const User = require('../models/userModel');

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate('user');
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id).populate('user');
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfessor = async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  try {
    await Professor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Professor deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessoresByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todos os professores associados a esse usuário
    const professores = await Professor.find({ user: userId });

    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
