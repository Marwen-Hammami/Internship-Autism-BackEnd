const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\u0621-\u064A\s]+$/, "Please provide a valid Arabic name"],
        },
        illustration: {
            type: String,
            required: true,
        },
        listLessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson"
            }
        ]
    },
    {
        timestamps: true,
    }
);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject ;