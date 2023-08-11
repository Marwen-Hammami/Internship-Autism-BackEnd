const {User, Parent} = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const addUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.create(req.body) ;
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const addParent = asyncHandler(async(req, res) => {
    try {
        const parent = await Parent.create(req.body) ;
        res.status(200).json(parent);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            res.status(404);
            throw new Error(`User with id ${id} Not found!`);
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteUser = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404);
            throw new Error(`User with id ${id} Not found!`);
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getUsers,
    getUser,
    addUser,
    addParent,
    updateUser,
    deleteUser,
}