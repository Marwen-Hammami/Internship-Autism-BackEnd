const express = require('express');
const {getLessons, getLesson, addLesson, updateLesson, deleteLesson} = require('../controllers/lessonController');

const router = express.Router();

//get all Lesson
router.get('/', getLessons);

//get a Lesson
router.get('/:id', getLesson);

//add a Lesson
router.post('/', addLesson);

//update a Lesson
router.put('/:id', updateLesson);

//delete a Lesson
router.delete('/:id', deleteLesson);


module.exports = router;
