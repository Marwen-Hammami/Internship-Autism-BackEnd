const mongoose = require('mongoose');

const progressionSchema = mongoose.Schema(
    {
        progression: [
            {
                type: Map,
                of: Number,
            }
        ]
    },
    {
        timestamps: true,
    }
);
const Progression = mongoose.model('Progression', progressionSchema);

module.exports = Progression ;