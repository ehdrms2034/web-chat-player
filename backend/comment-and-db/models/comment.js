const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types : {ObjectId}} = Schema;

const comment =new Schema({
    owner :{
        type : ObjectId,
        required : true,
        ref : 'user'
    },
    video :{
        type : ObjectId,
        required : true,
        ref : 'video'
    },
    message : {
        type : String,
        required : true
    },
    timeline : {
        type : Number,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},{
    versionKey: false
});

module.exports = mongoose.model('comment',comment);