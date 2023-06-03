const mongoose = require('mongoose');

const teacherSchema  = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    date:{
        type:Date,
        default:Date.now()

    }

})

module.exports = mongoose.model('Teacher',teacherSchema);