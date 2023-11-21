
// importing required packages 
const express=require('express');
const mongoose=require('./config/mongoose')
const db=require('./models/schema')
const path=require('path');
const app=express();
const port = 8888

// used to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded());
app.set('view engine','ejs')

//it is a home controller that renders Todo frame page
app.get('/', function(req,res){
    const studt = db.find({}).exec();
    studt.then(data => {
        console.log(data);
        res.render('To-do-frame',{data});
    }).catch(err=>{console.log("Error while we are fetching data.. :)") });
})

// this controller receives data from the form and inserts it into DB
app.post('/adddata',function(req,res){
    const promise=new Promise((resolve,reject)=>{
        db.create({description:req.body.description,category:req.body.category?req.body.category:"*****",date:req.body.date?req.body.date:"No Dead Line :)",check:false});
    });
    promise.then(newdata=>{
        console.log("****")
        resolve(newdata)}).catch(err=>{
        console.log(err);
        reject(err);
    })
    promise.then((newdata)=>{
            res.redirect('back')
        }).catch((err)=>{
            console.log(err);})
            res.redirect('back')
        });

// this controller receives the data, containing a list checked items, which are needed to be delete.
// it used to delete one or more tasks at a time.

app.post('/delete-data',function(req,res){
            keys = Object.values(req.body); 
             //it is a 2D Arary and only keys[0] has values of checkboxes id's
            keys = keys[0];
            console.log(keys);

            // no task is selected but deleted button is clicked
            if(typeof keys === 'undefined'){
                return res.redirect('back');
            }
            var deletePromises = [];

            // to delete only one task  
            if(keys.length==24){
                deletePromises.push(db.findByIdAndDelete(keys));
            }
            else{
            // to delete multiple task  
                for (let i = 0; i < keys.length; i++) {
                    deletePromises.push(db.findByIdAndDelete(keys[i]));
                }
            }
            Promise.all(deletePromises).then(()=>{
                return res.redirect('back'); 
                }).catch((err)=>{
                console.log('error in deleting task', err);
                return res.redirect('back');
                });
               });
       
        // running the server at the sepcified port number, if success sever created otherwise not.
       app.listen(port,function(err){
            if(err){
                console.log("server is not running" )
            }
            console.log("server is up and running in port  :  "+port)
        })                                                          
        
