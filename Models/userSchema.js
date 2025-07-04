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
        enum : ['admin' , 'team' ,'association'],
        require: true,
    },
    logo:{
        type : String,
        require :false,
    },
     state : {
        type : String,
        require : true,
    },


})

const users = mongoose.model('users',userSchema)
module.exports = users;