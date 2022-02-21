const express = require('express');

// local imports
const UserController = require('../controller/user.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', UserController.signupUser);

router.post('/login', UserController.loginUser);

router.put('/passwordReset', auth, UserController.updatePassword);

router.get('/me', auth, UserController.getUserProfile);

router.delete('/deleteAccount', auth, UserController.deleteUser);


module.exports = router;
