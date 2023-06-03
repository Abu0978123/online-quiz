
const mongoose = require('mongoose');
const timeSchema = mongoose.Schema({
    time:{
        type:String,
        required:true,
        
    },
})

module.exports = mongoose.model('Time',timeSchema)