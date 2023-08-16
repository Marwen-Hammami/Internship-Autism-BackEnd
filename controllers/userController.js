const {User, Parent, Child, Administrator, SuperAdministrator} = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const {userType} = require('../utils/constants');
const sendEmail = require("../utils/sendEmail");
const bcrypt = require('bcrypt');

//Number of salt rounds for the hashing process
const saltRounds = 10;

const getUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find().populate('childsList');
        res.status(200).json(users);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('childsList');
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addUser = asyncHandler(async(req, res) => {
    try {
        var user ;
        const plainPassword = req.body.password;
        //hash the password if the user have one
        if(plainPassword){
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            req.body.password = hashedPassword;
        }
        switch(req.body.type) {
            case userType.Parent:
                user = await Parent.create(req.body) ;
              break;
            case userType.Child:
                user = await Child.create(req.body) ;
              break;
            case userType.Administrator:
                user = await Administrator.create(req.body) ;
              break;
            case userType.SuperAdministrator:
                user = await SuperAdministrator.create(req.body) ;
              break;
            default:
                user = await User.create(req.body) ;
          }
          const email = req.body.email;
          if (email) {
            const message = `<h1>لقد تم إنشاء حسابك</h1>
            <p>${email} :بريدك الالكتروني </p>
            <p>${plainPassword} :كلمة السر خاصتك </p>`;
            await sendEmail({
                to: email,
                subject: "لقد تم إنشاء حسابك",
                text: message,
              });
          }
        res.status(201).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        var user = await User.findById(id);
        switch(user.__t) {
            case userType.Parent:
                user = await Parent.findByIdAndUpdate(id, req.body);
              break;
              case userType.Child:
                user = await Child.findByIdAndUpdate(id, req.body);
              break;
            case userType.Administrator:
                user = await Administrator.findByIdAndUpdate(id, req.body);
              break;
            case userType.SuperAdministrator:
                user = await SuperAdministrator.findByIdAndUpdate(id, req.body);
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
});

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
});

const login = asyncHandler(async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).json({message: 'Invalid credantials'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updatePassword = asyncHandler(async(req, res) =>{
    try {
        const {email, password} = req.body;
        const plainPassword = password;
        var user = await User.findOne({email});
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        switch(user.__t) {
            case userType.Parent:
                user = await Parent.findByIdAndUpdate(user._id, req.body);
              break;
            case userType.Administrator:
                user = await Administrator.findByIdAndUpdate(user._id, req.body);
              break;
        }
        const message = `<h1> تم تحديث كلمة المرور </h1>
        <p>${email} :بريدك الالكتروني </p>
        <p>${plainPassword} :كلمة سرك الجديدة</p>`;
        await sendEmail({
            to: email,
            subject: "تحديث كلمة المرور",
            text: message,
        });

        const updatedUser = await User.findOne({email});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
    updatePassword,
};