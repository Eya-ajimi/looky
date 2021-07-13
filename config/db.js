const mongoose=require('mongoose')
mongoose
.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.m4rbu.mongodb.net/Project",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false,
}


)
.then(()=>console.log('Connected To mongoDB'))
.catch((err)=> console.log ("Failed To connect To mongoDB ",err))