const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

const ParentSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            //default: "test@email.com",
        }
    },
    {
        timestamps: true,
    }
);
const Parent = User.discriminator('Parent', ParentSchema)

module.exports = {User, Parent}