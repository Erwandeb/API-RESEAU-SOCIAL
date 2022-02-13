const UserModel = require('../models/user.models');
const fs = require('fs');
const { promisify } = require('util');
const { upLoadErrors } = require('../utils/error.utils');
const pipeline = promisify(require('stream').pipeline);



module.exports.uploadProfil = async (req, res) => {
    try{
        if(
            req.file.dectectedMimeType !== "image/jpg" &&
            req.file.dectectedMimeType !== "image/jpeg" &&
            req.file.dectectedMimeType !== "image/png"
        )
            throw Error("Format du fichier invalide");

        if(req.file.size > 5000000){
            throw Error("max size");
        } 
    }
    catch(err){
        const errors = upLoadErrors(err);
        return res.status(201).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    )


};