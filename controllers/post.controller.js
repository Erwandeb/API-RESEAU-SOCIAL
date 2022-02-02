const postModel = require('../models/post.model');
const userModel = require('../models/user.models');
const objectID = require('mongoose').Types.ObjectId;



module.exports.readPost = (req, red) => {
    postModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Error');
        
    })
}

module.exports.createPost = (req, red) => {
    
}

module.exports.updatePost = (req, red) => {
    
}

module.exports.deletePost = (req, red) => {
    
}