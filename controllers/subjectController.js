const Subject = require('../models/subjectModel');
const asyncHandler = require('express-async-handler');


const getSubjects = asyncHandler(async(req, res) => {
    try {
        const subjects = await Subject.find().populate('listLessons');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getSubject = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const subject = await Subject.findById(id).populate('listLessons');
        res.status(200).json(subject);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addSubject = asyncHandler(async(req, res) => {
    try {
        var subject = await Subject.create(req.body) ;
        res.status(201).json(subject);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateSubject = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        subject = await Subject.findByIdAndUpdate(id, req.body);
        if(!subject){
            res.status(404);
            throw new Error(`subject with id ${id} Not found!`);
        }
        const updatedSubject = await Subject.findById(id);
        res.status(200).json(updatedSubject);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteSubject = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const subject = await Subject.findByIdAndDelete(id);
        if(!subject){
            res.status(404);
            throw new Error(`subject with id ${id} Not found!`);
        }
        res.status(200).json(subject);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {
    getSubjects,
    getSubject,
    addSubject,
    updateSubject,
    deleteSubject
};