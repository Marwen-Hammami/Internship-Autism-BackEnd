const express = require('express');
const {getProgressions, getProgression, addProgression, updateProgression, deleteProgression} = require('../controllers/progressionController');

const router = express.Router();

//get all Progression
router.get('/', getProgressions);

//get a Progression
router.get('/:id', getProgression);

//add a Progression
router.post('/', addProgression);

//update a Progression
router.put('/:id', updateProgression);

//delete a Progression
router.delete('/:id', deleteProgression);


module.exports = router;
