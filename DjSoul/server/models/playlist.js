const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    desc:{
        type:String,
    },
    songs:{
        type:Array,
        default: []
    },
    image:{
        type:String,
    },
})

const validate = (playlist) => {
    const schema = Joi.Object({
        name:Joi.string().required(),
        user:Joi.string().required(),
        desc:Joi.string().allow(""),
        songs:Joi.array().items(Joi.string()),
        image:Joi.string().allow(""),
    });
    return schema.validate(playlist);
}

const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = {Playlist, validate};