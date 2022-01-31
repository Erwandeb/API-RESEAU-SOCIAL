const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/.env'})
require('./config/dataBase');
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express();

// Application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


//jwt 
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
})


// Pour chaques routes, commencez par le chemin suivant: 
app.use('/api/user', userRoutes);


// Serveur PORT 5000
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})