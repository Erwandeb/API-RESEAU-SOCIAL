
// Gestions messages d'erreurs au moment de l'inscription
module.exports.signUpErrors = (err) =>{
    let errors = {pseudo:"", email:"", password:""};

    if(err.message.includes('pseudo')){
        errors.pseudo = "Votre pseudo est incorrect";
    }
 
    if(err.message.includes('email')){
        errors.pseudo = "Votre email est incorrect";
    }

    if(err.message.includes('password')){
        errors.pseudo = "mot de passe trop court !";
    }
  
    if(err.code === 11000 & Object.keys(err.keyValue)[0].includes("pseudo")){
        errors.pseudo = "Ce pseudo est déjà pris";
    }
    
    if(err.code === 11000 & Object.keys(err.keyValue)[0].includes("email")){
        errors.pseudo = "Cet email est déjà utilisé";
    }
    
    return errors;
}


// Gestions messages d'erreurs au moment de la connexion
module.exports.signInErrors = (err) => {
    let errors = {email:"", password:""};

    if(err.message.includes("email")){
        errors.email = "Email inconnu";
    }

    if(err.message.includes("password")){
        errors.email = "ce mot de passe ne correspond pas";
    }

    return errors;
}



// Gestions d'erreurs quand l'utilisateur upload une image
module.exports.upLoadErrors = (err) => {
    let errors = {format:"", maxSize:""};

    if(err.message.includes("format invalide")){
        errors.format = "Ele format est invalide";
    }

    if(err.message.includes("max sizes")){
        errors.maxSize = "La taille dépasse les 500ko";
    }

    return errors;
}