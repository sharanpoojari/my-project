var express = require("express")
var bodyParser = require("body-Parser")
var mongoose = require("mongoose")
const { json }=require("express");

const port=process.env.PORT || 5500;
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("errror in connection"));
db.once('open',()=>console.log("conneted to database"));

const User = require("./public/users");

app.post("/user",async (req,res)=>{
    try{
        const contact= new User({
             name : req.body.name,
             Phone : req.body.Phone,
             email : req.body.email,
             message : req.body.message
        
        })
      const result =  await contact.save();
      res.redirect("thank.html");
      console.log("Record inserted succesfully");
    }
    catch(err){
  
    res.redirect("contact.html");
    }
    
    
});


app.get("/", (req, res) => {
    res.render("index")
   } );
   
   app.get("/contact", (req, res) =>{
       res.render("contact")
   });
   
   app.get("/about", (req, res) =>{
       res.render("about")
   });

   app.get("/thank", (req, res) =>{
    res.render("thank")
});
   
   app.listen(port, () => {
       console.log('sever is running at port no 5500');
   })


  

   // counting and sorting
   const getdocument = async() => {
       try{
           const result = await User
         
           .countDocuments();
           console.log(result);
       }
       catch(err){
           console.log(err)
       }
   }
   getdocument();

   const tetdocument = async(email) => {
    try{
        const result = await User 
        .find({email})
        .select({name:1})
        .sort({name:1});
        console.log(result);
    }
    catch(err){
        console.log(err)
    }
}
     tetdocument();

//delete documents
const deletedocument = async (_id) =>{
    try {
        const result = await User.deleteOne({_id});
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
deletedocument();

