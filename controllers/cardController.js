const {Card, LectureCard, ArrowExerciseCard, ChoiseExerciseCard} = require('../models/cardModel');
const asyncHandler = require('express-async-handler');
const {cardType} = require('../utils/constants');

const getCards = asyncHandler(async(req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getCard = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const card = await Card.findById(id);
        res.status(200).json(card);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const addCard = asyncHandler(async(req, res) => {
    try {
        var card ;
        switch(req.body.type) {
            case cardType.Lecture:
                card = await LectureCard.create(req.body) ;
              break;
            case cardType.ArrowExercise:
                card = await ArrowExerciseCard.create(req.body) ;
              break;
            case cardType.ChoiseExercise:
                card = await ChoiseExerciseCard.create(req.body) ;
              break;
            default:
                card = await Card.create(req.body) ;
          }
        res.status(201).json(card);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateCard = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        var card = await Card.findById(id);
        switch(card.__t) {
            case cardType.Lecture:
                card = await LectureCard.findByIdAndUpdate(id, req.body);
              break;
              case cardType.ArrowExercise:
                card = await ArrowExerciseCard.findByIdAndUpdate(id, req.body);
              break;
            case cardType.ChoiseExercise:
                card = await ChoiseExerciseCard.findByIdAndUpdate(id, req.body);
              break;
            default:
                card = await Card.findByIdAndUpdate(id, req.body);
          }
        if(!card){
            res.status(404);
            throw new Error(`Card with id ${id} Not found!`);
        }
        const updatedCard = await Card.findById(id);
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteCard = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const card = await Card.findByIdAndDelete(id);
        if(!card){
            res.status(404);
            throw new Error(`Card with id ${id} Not found!`);
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getCards, 
    getCard, 
    addCard, 
    updateCard, 
    deleteCard,
};