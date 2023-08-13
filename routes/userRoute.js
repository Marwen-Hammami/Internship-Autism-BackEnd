const express = require('express');
const {getUsers, getUser, addUser, updateUser, deleteUser, login, updatePassword} = require('../controllers/userController');

const router = express.Router();

//login
router.post('/login/', login);

//update password
router.put('/updatepassword/', updatePassword);

//get all users
router.get('/', getUsers);

//get a user
router.get('/:id', getUser);

//add a user
router.post('/', addUser);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);


module.exports = router;
