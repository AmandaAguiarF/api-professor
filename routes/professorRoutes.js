const express = require('express');
const {
  getProfessores,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getProfessoresByUserId
} = require('../controllers/professorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Gerenciamento de Professores
 */

/**
 * @swagger
 * /api/professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     responses:
 *       200:
 *         description: Lista de professores
 */
router.get('/', authMiddleware, getProfessores);

/**
 * @swagger
 * /api/professores/{id}:
 *   get:
 *     summary: Obtém um professor pelo ID
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da professor
 *     responses:
 *       200:
 *         description: Detalhes do professor
 *       404:
 *         description: Professor não encontrado
 */
router.get('/:id', authMiddleware, getProfessorById);

/**
 * @swagger
 * /api/professores:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               disciplina:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createProfessor);

/**
 * @swagger
 * /api/professores/{id}:
 *   put:
 *     summary: Atualiza um professor existente
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               disciplina:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       404:
 *         description: Professor não encontrado
 */
router.put('/:id', authMiddleware, updateProfessor);

/**
 * @swagger
 * /api/professores/{id}:
 *   delete:
 *     summary: Deleta um professor existente
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da professor
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       404:
 *         description: Professor não encontrado
 */
router.delete('/:id', authMiddleware, deleteProfessor);

/**
 * @swagger
 * /api/professores/user/{userId}:
 *   get:
 *     summary: Retorna todos os professores de um usuário específico
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de professores do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, getProfessoresByUserId);

module.exports = router;
