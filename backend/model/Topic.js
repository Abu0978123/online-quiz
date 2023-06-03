const { string } = require('joi');
const mongoose = require('mongoose');
const Catagory = require('./Catagory')

const topicSchema = mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    catagory : {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now()

    }

})

module.exports = mongoose.model('Topic', topicSchema);