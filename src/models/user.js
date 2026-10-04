const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("user", {
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        required: true,
        validate(val) {
            if (val <= 0) {
                throw new Error("Age must be Positive Number")
            }
        }
    },
    city: {
        type: String,
        required: true
    }
})

module.exports = User