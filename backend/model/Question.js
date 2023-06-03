const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    catagory: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correct_option: {
        type: String,
        required: true
    },
    incorrect_options: {
        type: Array,

        // type:String,
        // required:true

    },

    date: {
        type: Date,
        default: Date.now()

    }

})

module.exports = mongoose.model('question', questionSchema);