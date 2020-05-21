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
    posterUrl : {
        type : String,
        required : true
    },
    videoUrl : {
        type : String,
        required : true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('video',video);