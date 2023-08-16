const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            match: [/^[0-9\u0660-\u0669\u06F0-\u06F9\u0621-\u064A\s]+$/, "Please provide a valid Arabic name"]
        },
        illustration: {
            type: String,
            required: true,
        },
        listCards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Card"
            }
        ]
    },
    {
        timestamps: true,
    }
);
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson ;