

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Hi! I am Naman Bhoj. I am a final year Computer Science Student!! Currently I am working as a trainee in Nagarro Pvt. Ltd. This website is a part of project work from Node.js assignment. I plan to change it into full fledged blog website in coming future. Stay Tuned!";
const aboutContent = "Since my undergrad I have worked on various ML and IoT related projects. Currenly I am learning node.js and vue.js. You can find my contact details in Contact Page for collaborations ";
const contactContent = "Hi you can reach me on my work email : namanbhoj@nagarro.com";

const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];




app.get('/', function(req,res){

  

  res.render('home.ejs', {startcontent: homeStartingContent, allpost : posts});
  
})

// ABOUT PAGE
app.get('/about', function(req,res){

  res.render('about.ejs', {aboutcontent: aboutContent});
})


//CONTACT PAGE

app.get('/contact', function(req,res){

  res.render('contact.ejs', {contact: contactContent});
})

//publish new post
app.get('/publish', function(req,res){

  res.render('publish.ejs');
})

app.post('/publish', function(req,res){

  const detailsOfPost = { //storing in const but remember it can not be changed here once its passed it can be changed

    title : req.body.postTitle,
    body : req.body.postBody, 
  }
  
  posts.push(detailsOfPost);
  res.redirect('/')
})


//post page


app.get('/post/:postName', function(req,res){

  const requestedTitle = _.lowerCase (req.params.postName);

  posts.forEach(function(post){
    const storedtitle = _.lowerCase(post.title);
    if (requestedTitle === storedtitle){

      res.render('post',{
        title: post.title,
        content: post.body,
      });

    }

    });
  
});


 app.get('/delete', function(req, res){

  res.render('delete.ejs', { allpost : posts});
});


app.post('/delete', function(req,res){

  console.log(req.body);


})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
