const mongoose = require('mongoose');
const {userType} = require('../utils/constants');

//Polimorphic Users with discriminator

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            match: [/^[\u0621-\u064A\s]+$/, "Please provide a valid Arabic first name"],
        },
        lastName: {
            type: String,
            required: true,
            match: [/^[\u0621-\u064A\s]+$/, "Please provide a valid Arabic last name"],
        }
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

const parentSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
              ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        updatePasswordToken: String,
        updatePasswordExpire: Date,
        pinCode: {
            type: String,
            required: true,
            default: "0000",
            match: /^\d{4}$/ // match 4 digits
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
        avatar: {
            type: String, //can add Profile Picture later with Buffer type or long string in B64
            required: true,
        },
        childsList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: userType.Child
            }
        ]
    },
    {
        timestamps: true,
    }
);
const Parent = User.discriminator(userType.Parent, parentSchema);

const childSchema = mongoose.Schema(
    {
        birthDay: {
            type: Date, //'2000-07-21'
            required: true,
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
        avatar: {
            type: String, //can add Profile Picture later with Buffer type or long string in B64
            required: true,
        },
        progression: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Progression"
        }
    },
    {
        timestamps: true,
    }
);
const Child = User.discriminator(userType.Child, childSchema);

const administratorSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
              ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        }
    },
    {
        timestamps: true,
    }
);
const Administrator = User.discriminator(userType.Administrator, administratorSchema);

const superAdministratorSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
              ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        }
    },
    {
        timestamps: true,
    }
);
const SuperAdministrator = User.discriminator(userType.SuperAdministrator, superAdministratorSchema);

module.exports = {User, Parent, Child, Administrator, SuperAdministrator};