const express = require('express');
const router = express.Router();
const classesCtrl = require('../../controllers/api/classes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// GET /api/classes
router.get('/', classesCtrl.index);
// GET /api/classes/user
router.get('/user', classesCtrl.indexUser);
// GET /api/classes/:id
router.get('/:id', classesCtrl.show);
// GET /api/classes/create
router.post('/create', ensureLoggedIn, classesCtrl.create)
// GET /api/classes/update
router.put('/:id/update', ensureLoggedIn, classesCtrl.update)
// GET /api/classes/delete
router.delete('/:id', ensureLoggedIn, classesCtrl.deleteClass)

module.exports = router;