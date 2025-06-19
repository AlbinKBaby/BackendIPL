const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    captianName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    coachName: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum : ['admin' , 'Team' ,'Association'],
        require: true,
    },
    logo:{
        type : String,
        require :false,
    }

})

const users = mongoose.model('users',userSchema)
module.exports = users;