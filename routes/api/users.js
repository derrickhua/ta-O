const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login)
router.post('/update', ensureLoggedIn, usersCtrl.update)
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.delete('/delete', usersCtrl.deleteUser)
module.exports = router;