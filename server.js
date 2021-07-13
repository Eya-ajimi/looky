const express =require("express")
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/.env'})
require('./config/db')
const {checkUser,requireAuth} = require('./middleware/auth.middleware');
const cors = require ('cors')


const app =express()
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false 
  }
  app.use(cors(corsOptions))

//mideleware 
app.use(express.json());  
app.use(cookieParser());
//app.use(express.cookieParser());


// jwt
app.get('*', checkUser); // it checkes if the user have the right token or no 
app.get('/jwtid', requireAuth, (req, res) => {
      res.status(208).send(res.locals.user._id)
    });
    
    //routes
    app.use('/api/user',userRoutes);
    app.use('/api/post' ,postRoutes)
    app.use(express.urlencoded({extended: true})); 




//port 
const port =4000
app.listen(process.env.port,err=>{
    err? console.log(err):console.log( `server is running on port ${process.env.port}`)
})