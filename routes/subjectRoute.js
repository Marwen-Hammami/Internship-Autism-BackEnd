const express = require('express');
const {getSubjects, getSubject, addSubject, updateSubject, deleteSubject} = require('../controllers/subjectController');

const router = express.Router();

//get all Subject
router.get('/', getSubjects);

//get a Subject
router.get('/:id', getSubject);

//add a Subject
router.post('/', addSubject);

//update a Subject
router.put('/:id', updateSubject);

//delete a Subject
router.delete('/:id', deleteSubject);


module.exports = router;
