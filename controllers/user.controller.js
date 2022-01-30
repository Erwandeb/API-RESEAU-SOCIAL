const userModel = require('../models/user.models')
const ObjectId = require('mongoose').Types.ObjectId;



module.exports.getAllUsers = async (req, res) =>{
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
};



module.exports.userInfo = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    userModel.findById(req.params.id, (err,docs) =>{
        if (!err) res.send(docs);
        else console.log('ID unknown :' + err)
    }).select('-password');
};


module.exports.updateUser = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID Unknown' + req.params.id)

    try{
        await userModel.findOneAndUpdate(
            { _id:req.params.id},
            {
                $set:{
                    bio: req.body.bio
                }
            },
            {
                new:true,
                upsert:true,
                setDefaultsOnInsert:true
            },
            (err, docs) =>{
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({message:err});
            }
        )
    } catch(err){
        return res.status(500).json({message:err})
    }
}


module.exports.deleteUser = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID Unknown' + req.params.id)

    try{
        await userModel.deleteOne(
            {
                _id:req.params.id
            },
        ).exec();
    } catch(err){
        return res.status(500).json({message:err})
    }
};



module.exports.follow = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id) || (!ObjectId.isValid(req.body.idToFollow)))
        return res.status(400).send('ID Unknown' + req.params.id)

    try{
        // Add to followers listing 
        await userModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.id}},
            {new: true, upsert: true},
            (err, docs) =>{
                if(!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        )

        // Add to following listing 
        await userModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: {followers: req.parmas.id}},
            {new: true, upsert: true},
            (err) => {
                if(err) return res.status(400).json(err)
            }
        )
    } catch(err){
        return res.status(500).json({message: err})
    };
};


module.exports.unfollow = async (req, res) =>{
    if(!ObjectId.isValid(req.params.id) || (!ObjectId.isValid(req.body.idToUnfollow)))
        return res.status(400).send('ID Unknown' + req.params.id)

    try{
        // Add to followers listing 
        await userModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {following: req.body.idToUnfollow}},
            {new: true, upsert: true},
            (err, docs) =>{
                if(!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        )

        // Add to following listing 
        await userModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull: {followers: req.parmas.id}},
            {new: true, upsert: true},
            (err) => {
                if(err) return res.status(400).json(err)
            }
        )
    } catch(err){
        return res.status(500).json({message: err})
    };
};