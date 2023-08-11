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
        var user ;
        switch(req.body.type) {
            case "Parent":
                user = await Parent.create(req.body) ;
              break;
            default:
                user = await User.create(req.body) ;
          }
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        var user = await User.findById(id);
        switch(user.__t) {
            case "Parent":
                user = await Parent.findByIdAndUpdate(id, req.body);
              break;
            default:
                user = await User.findByIdAndUpdate(id, req.body);
          }
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
    updateUser,
    deleteUser,
}