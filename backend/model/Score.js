
const mongoose = require('mongoose');
const scoreSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        
    },
    score:{
        type:Number,
        required:true,
        default:0
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Score',scoreSchema)