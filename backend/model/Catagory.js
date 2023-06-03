// const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const catagorySchema = mongoose.Schema({
    catagory : {
       type:String,
       required:true
    },
    
    date: {
        type: Date,
        default: Date.now()

    }

})

module.exports = mongoose.model('Catagory', catagorySchema);