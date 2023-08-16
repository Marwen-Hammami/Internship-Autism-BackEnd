const Progression = require('../models/progressionModel');
const asyncHandler = require('express-async-handler');


const getProgressions = asyncHandler(async(req, res) => {
    try {
        const progressions = await Progression.find();
        res.status(200).json(progressions);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getProgression = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const progression = await Progression.findById(id);
        res.status(200).json(progression);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addProgression = asyncHandler(async(req, res) => {
    try {
        var progression = await Progression.create(req.body) ;
        res.status(201).json(progression);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateProgression = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        progression = await Progression.findByIdAndUpdate(id, req.body);
        if(!progression){
            res.status(404);
            throw new Error(`progression with id ${id} Not found!`);
        }
        const updatedProgression = await Progression.findById(id);
        res.status(200).json(updatedProgression);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteProgression = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const progression = await Progression.findByIdAndDelete(id);
        if(!progression){
            res.status(404);
            throw new Error(`progression with id ${id} Not found!`);
        }
        res.status(200).json(progression);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {
    getProgressions,
    getProgression,
    addProgression,
    updateProgression,
    deleteProgression
};