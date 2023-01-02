// setting up express server
const express = require('express');

const path = require('path');

const port = 8000;

const app = express();


//setting assets
app.use(express.static('assets'));

// setting view engine
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));



//using middleware
app.use(express.urlencoded());


// todo app array
var contactList = [
    {   
        descrition:"Why not add a task?",
        cateogry:"Cateogry",
        date :"04-15-2022"
    },
    {   
        descrition:"Let's Make a TODO App",
        cateogry:"Private",
        date :"07-23-2022"
    }
]

// sending home file through ejs

app.get('/', function(req,res){
    return res.render('home', {
        title: 'Homepage',
        //creating contactlist
        contact_List:contactList,
        
    });
});

app.get('/practice', function(req,res){
    return res.render('practice',{
        title: 'Practice'
    });
});

// method used in form 
app.post('/create-contact' , function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);

    contactList.push({
        descrition: req.body.descrition ,
        cateogry: req.body.cateogry,
        date : req.body.date,
        
    })
    return res.redirect('back');
});


// deleting tasks

app.get('/delete-contact',function(req,res){
    //getting query from the url
    console.log(req.query);
    let descrition = req.query.descrition;

    let contatIndex = contactList.findIndex(contact => contact.descrition==descrition);

    if(contatIndex != -1){
        contactList.splice(contatIndex,1);
    }
    return res.redirect('back');
})

// checking if server is running
app.listen(port , function(err){
    if(err){
        console.log('error in running the server ', err);
    }

    console.log('Yup! my server is running on the port: ',port);
});