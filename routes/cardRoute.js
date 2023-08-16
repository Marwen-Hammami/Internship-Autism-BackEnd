const express = require('express');
const {getCards, getCard, addCard, updateCard, deleteCard} = require('../controllers/cardController');

const router = express.Router();

//get all Cards
router.get('/', getCards);

//get a Card
router.get('/:id', getCard);

//add a Card
router.post('/', addCard);

//update a Card
router.put('/:id', updateCard);

//delete a Card
router.delete('/:id', deleteCard);


module.exports = router;
