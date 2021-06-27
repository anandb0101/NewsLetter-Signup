const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        method : "POST",
        auth : "anandb0101:aebe9e868f89186e6811ed3e30ea3a44-us6"
    };

    const url = "https://us6.api.mailchimp.com/3.0/lists/abc8ae3f24";

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    });

    request.write(jsonData);
    request.end();
});




app.listen(process.env.PORT  || 3000,function(){
    console.log("server is running on port 3000");
});
