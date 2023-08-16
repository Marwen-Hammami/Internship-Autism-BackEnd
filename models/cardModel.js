const mongoose = require('mongoose');
const {cardType} = require('../utils/constants');

//Polimorphic Cards with discriminator

const cardSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            match: [/^[0-9\u0660-\u0669\u06F0-\u06F9\u0621-\u064A\s]+$/, "Please provide a valid Arabic name"], //arabic and numbers
        },
        message: {
            type: String,
            required: true,
        },
        hint: String
    },
    {
        timestamps: true,
    }
);
const Card = mongoose.model('Card', cardSchema);

const lectureCardSchema = mongoose.Schema(
    {
        illustration: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const LectureCard = Card.discriminator(cardType.Lecture, lectureCardSchema);

const arrowExerciseCardSchema = mongoose.Schema(
    {
        suggestion1: {          //suggestions can be text or image in Base64 format
            type: String,
            required: true,
        },
        illustration1: {        //illustrations are in image in Base64 format
            type: String,
            required: true,
        },
        suggestion2: {
            type: String,
            required: true,
        },
        illustration2: {
            type: String,
            required: true,
        },
        suggestion3: {
            type: String,
            required: true,
        },
        illustration3: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const ArrowExerciseCard = Card.discriminator(cardType.ArrowExercise, arrowExerciseCardSchema);

const choiseExerciseCardSchema = mongoose.Schema(
    {
        correctIllustration: {
            type: String,
            required: true,
        },
        falseIllustration1: {
            type: String,
            required: true,
        },
        falseIllustration2: {
            type: String,
            required: true,
        },
        falseIllustration3: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const ChoiseExerciseCard = Card.discriminator(cardType.ChoiseExercise, choiseExerciseCardSchema);

module.exports = {Card, LectureCard, ArrowExerciseCard, ChoiseExerciseCard};