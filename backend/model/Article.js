const mongoose = require('mongoose');

const articleSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true

    },
    details:{
        type:String,
        required:true

    },
    date:{
        type:Date,
        default:Date.now()

    }

})

module.exports = mongoose.model('article',articleSchema);