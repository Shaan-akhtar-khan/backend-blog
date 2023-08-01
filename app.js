//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Lodash=require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


var posts= [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home.ejs", { bhai : homeStartingContent , Post : posts});

})



app.get("/about",function(req,res){
  res.render("about.ejs", { aboutPage : aboutContent});
})


app.get("/contact",function(req,res){
  res.render("contact.ejs", { contactPage : contactContent});
})


app.get("/compose",function(req,res){
  res.render("compose.ejs");
})


//  -----------------------------------NOTE:- iterative version of codes to get the concept of the end product --------------------------------------------
// app.get("/posts/:topic",function(req,res){
//   console.log(req.params.topic);
// })

//when "localhost:3000/bhai goldy" is searched for in the browser , "bhai goldy" is logged o the consoole since the paramter "topic"
//syntax = ":topic" acts as a variable holding the string passed as query. so tap into topic using req.params to tap into all
//of the parameteres that you specified and them select the "topic" param so , "req.params.topic" to get the query or the string passed in


//RECIEVER
// <h1><%= title %></h1>
// <p>  <%= body %></p>


// app.get("/posts/:topic",function(req,res){
//   posts.forEach(function(item){
//     if (item.titleText === req.params.topic) {
// console.log("match found !");      
//     }
//   });
// });

// SIMIlar to above code when we pass in "localhost:3000/posts/day1" if day1 is a post in the home page then ( neglect the /posts for now )
//"match found !" is logged ot console . this is done by looping through all the items in the posts arrray ( posts arrray holds all the
//posts made so by checking each one othe posts titles , whenever anyone of them matches we log match found! in the console and loop continues )


//RECIEVER
// <h1><%= title %></h1>
// <p>  <%= body %></p>



app.get("/posts/:topic",function(req,res){
  posts.forEach(function(item){
    if (Lodash._.lowerCase(item.titleText) === Lodash._.lowerCase(req.params.topic) ) {
      res.render("post.ejs", { title : item.titleText , body : item.bodyText });    
      // this renders post.ejs after filling the title and body ejs vars of the file so that any page with path "localhost:3000/posts/title" ,where
      //title is the title of the post , can be shown in a dedicated page for that post
    }
  });
});

// "_.lowercase" is the method used here accesssed by "Lodash." and then the string is passed so that "GOLDY_Bhai" , "GoLDY-BHai" , etc. 
//converts to "goldy bhai".

//RECIEVER
// <h1><%= title %></h1>
// <p>  <%= body %></p>



app.post("/compose",function(req,res){
  
const post = {
  titleText : req.body.text1,
  bodyText : req.body.text2
};

posts.push(post);

res.redirect("/");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
