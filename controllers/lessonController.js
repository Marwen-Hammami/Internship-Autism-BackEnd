const Lesson = require('../models/lessonModel');
const asyncHandler = require('express-async-handler');


const getLessons = asyncHandler(async(req, res) => {
    try {
        const lessons = await Lesson.find().populate('listCards');
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getLesson = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const lesson = await Lesson.findById(id).populate('listCards');
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addLesson = asyncHandler(async(req, res) => {
    try {
        var lesson = await Lesson.create(req.body) ;
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateLesson = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        lesson = await Lesson.findByIdAndUpdate(id, req.body);
        if(!lesson){
            res.status(404);
            throw new Error(`Lesson with id ${id} Not found!`);
        }
        const updatedLesson = await Lesson.findById(id);
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteLesson = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const lesson = await Lesson.findByIdAndDelete(id);
        if(!lesson){
            res.status(404);
            throw new Error(`Lesson with id ${id} Not found!`);
        }
        res.status(200).json(lesson);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {
    getLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson
};