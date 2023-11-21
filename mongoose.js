// connecting to atlas mongoDB 
const mongoose=require('mongoose')
// this is a link provide by atlas to establish connection with cloud DB and...
// provide appropriate username and passwrod details along with the DB that you want to connect. 
//mongoose.connect('mongodb+srv://username:passwd@cluster0.pobbk4f.mongodb.net/TODO');

mongoose.connect('mongodb+srv://21505a0506:Divya%401@cluster0.pobbk4f.mongodb.net/TODO');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connection'));
db.once('open',function(){
    console.log("DB CONNECTION SUCCESSFULL")
})


