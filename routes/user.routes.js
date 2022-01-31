const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const userController = require('../controllers/user.controller');

// Authentification
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post ('/logout', authController.logout);



// Gestion des utilisateurs 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


module.exports = router;