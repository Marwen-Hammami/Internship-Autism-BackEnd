const express = require('express');
const {getUsers, getUser, addUser, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

//get all users
router.get('/', getUsers)

//get a user
router.get('/:id', getUser)

//add a user
router.post('/', addUser)

//update a user
router.put('/:id', updateUser)

//delete a user
router.delete('/:id', deleteUser)

module.exports = router;
