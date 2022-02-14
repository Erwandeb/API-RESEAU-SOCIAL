const UserModel = require('../models/user.models');
const fs = require('fs');
const { promisify } = require('util');
const { upLoadErrors } = require('../utils/error.utils');
const pipeline = promisify(require('stream').pipeline);



module.exports.uploadProfil = async (req, res) => {
    try{
        
        /*
        if (
            req.file.dectectedMimeType != "image/jpg" && req.file.dectectedMimeType != "image/png" && req.file.dectectedMimeType != "image/jpeg"
        ){
            throw Error("Format du fichier invalide");
        }
        */
        
        
        if(req.file.size > 500000){
            throw Error("max size");
        } 
    }
    catch(err){
        const errors = upLoadErrors(err);
        console.log("error from the catch", err)
        return res.status(201).json({ errors });
    }

    const fileName = req.body.pseudo + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    )

    try{
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            {$set:{picture:"./upload/profil/" + fileName}},
            {new : true, upsert: true , setDefaultOnInsert : true},
            (err, docs) => {
                if(!err) {
                    return res.send(docs);
                } else{
                    return res.status(500).send({message : err})
                }
            }
        )
    } catch(err){
        return res.status(201).json(err);
    }
};