const postModel = require('../models/post.model');
const userModel = require('../models/user.models');
const objectID = require('mongoose').Types.ObjectId;



module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Impossible de retrouver les données' + err);

    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        posterId : req.body.posterId,
        message : req.body.message,
        video : req.body.video,
        likers : [],
        comments : [],
    });
    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    }catch(err){
        return res.status(400).send("Erreur dans createPost" + err)
    }
}

module.exports.updatePost = (req, res) => {
    
}

module.exports.deletePost = (req, res) => {
    
}