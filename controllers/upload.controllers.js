const UserModel = require('../models/user.models');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
    try{
        if(
            req.file.dectectedMimeType !== "image/jpg" &&
            req.file.dectectedMimeType !== "image/jpeg" &&
            req.file.dectectedMimeType !== "image/png"
        )
            throw Error("Format du fichier invalide");

        if(req.file.size > 500000) throw Error("max size");
    }
    catch (err){
        return res.status(201).json(err);
    }

    const fileName = req.body.name + ".jpg";
};