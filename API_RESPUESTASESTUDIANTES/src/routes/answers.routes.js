const { Router } = require('express');
const ctrl = require('../controllers/answers.controller');
const router = Router();

router.get('/answers', ctrl.getAll);
router.get('/answers/:id', ctrl.getOne);
router.post('/answers', ctrl.create);
router.put('/answers/:id', ctrl.update);
router.delete('/answers/:id', ctrl.remove);

module.exports = router;