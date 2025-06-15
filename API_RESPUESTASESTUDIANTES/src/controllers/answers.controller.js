const db = require('../db');

// GET /answers
async function getAll(req, res) {
  try {
    const [rows] = await db.promise().query('SELECT * FROM respuestas');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// GET /answers/:id
async function getOne(req, res) {
  try {
    const [rows] = await db.promise().query('SELECT * FROM respuestas WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Respuesta no encontrada' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// POST /answers
async function create(req, res) {
  try {
    const { student_id, question_id, answer } = req.body;
    const sql = 'INSERT INTO respuestas (student_id, question_id, answer) VALUES (?, ?, ?)';
    const [result] = await db.promise().query(sql, [student_id, question_id, answer]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// PUT /answers/:id
async function update(req, res) {
  try {
    const { student_id, question_id, answer } = req.body;
    const sql = 'UPDATE respuestas SET student_id=?, question_id=?, answer=? WHERE id=?';
    const [result] = await db.promise().query(sql, [student_id, question_id, answer, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Respuesta no encontrada' });
    res.json({ id: req.params.id, ...req.body });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// DELETE /answers/:id
async function remove(req, res) {
  try {
    const [result] = await db.promise().query('DELETE FROM respuestas WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Respuesta no encontrada' });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAll, getOne, create, update, remove };