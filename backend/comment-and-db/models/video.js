const mongoose = require('mongoose');

const {Schema} = mongoose;

const video =new Schema({
    name :{
        type : String,
        required : true
    },
    uploadedAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    summary : {
        type : String,
    },
    url : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('video',video);