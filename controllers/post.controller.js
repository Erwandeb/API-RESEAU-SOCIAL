const postModel = require('../models/post.model');
const userModel = require('../models/user.models');
const objectID = require('mongoose').Types.ObjectId;



module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Impossible de retrouver les données' + err);

    }).sort({createdAt: -1});
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        authorId : req.body.authorId,
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
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu' + req.params.id)

    const updateRecord = {
        message : req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        {$set:updateRecord},
        {new: true},
        (err, docs) => {
            if(!err){
                res.send(docs);
            } else{
                console.log("Erreur provenant d'updatePost :" + err )
            }
        }
    )
}



module.exports.deletePost = (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err){
                res.send(docs);
            } else{
                console.log("Erreur provenant de deletePost" + err)
            }
        }
    )
}


module.exports.likePost = async (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)

    try{
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet : {likers : req.body.id}
            },
            {new : true},
            (err, docs) => {
                if(err){
                    return res.status(400).send(err)
                }
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet : {likes: req.params.id}
            },
            {new : true},
            (err, docs) => {
                if(!err){
                    res.send(docs);
                } else {
                    return res.status(400).send(err)
                }
            }
        )
    } catch(err) {
        return res.status(401).send(err)
    }
}

module.exports.unlikePost = async (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)

    try{
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull : {likers : req.body.id}
            },
            {new : true},
            (err, docs) => {
                if(err){
                    return res.status(400).send(err)
                }
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull : {likes: req.params.id}
            },
            {new : true},
            (err, docs) => {
                if(!err){
                    res.send(docs);
                } else {
                    return res.status(400).send(err)
                }
            }
        )
    } catch(err) {
        return res.status(401).send(err)
    }
}

 
module.exports.commentPost = async (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)

    try{
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push : {
                    comments : {
                        commenterId : req.body.commenterId,
                        commenterPseudo : req.body.commenterPseudo,
                        text : req.body.text,
                        timestamp : new Date().getTime()
                    }
                }
            },
            {new : true },
            (err, docs) => {
                if(!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    }catch(err){
        return res.status(401).send(err)
    }
}

 
module.exports.editCommentPost = async (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)
    
    try{
        return postModel.findById(
            req.params.id,
            (err,docs) => {
                const theComment = docs.comments.find((comment) => {
                    comment._id.equals(req.body.commentId)
                })
                if(!theComment){
                    return res.status(404).send("commentaire non trouvé");
                };
                theComment.text = req.body.text;

                return docs.save((err) => {
                    if(!err){
                        return res.status(200).send(docs);
                    }
                    return res.statu(500).send(err);
                })
            }
        )
    }catch(err){
        return res.status(401).send(err)
    }
}

 

module.exports.deleteCommentPost = async (req, res) => {
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu' + req.params.id)

    try{
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull:{
                    comments:{
                        _id: req.body.commentId,
                    },
                },
            },
            {new : true},
            (err, docs) => {
                if(!err) {
                    return res.send(docs);
                } else{
                    return res.status(400).send(err);
                }
            }
        );
    }catch(err){
        return res.status(401).send(err)
    }
}