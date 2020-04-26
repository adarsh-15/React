const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const Mongo_URL = `mongodb+srv://singhadarsh50:${process.env.MONGOPASS}@skdcluster-lh4by.mongodb.net/test?retryWrites=true&w=majority`;

const db = mongoose.connect(Mongo_URL || 'mongodb://localhost/shree', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connected to database...')).catch(err => console.log('Refuse to connect...', err));

mongoose.connection.on('connected', () => {
    console.log('connected');
});

let Client = require('./model/client');

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/client', (req, res) => {
    var client = new Client();
    client.name = req.body.name;
    client.email = req.body.email;
    client.mobileno = req.body.mobileno;
    client.comments = req.body.comments;
    
    
    client.save((err, savedClient) => {
        if (err) {
            res.status(500).send({error: "Could not save"});
        } else {
            console.log('Successfully sent');
        }
    });
    
    
    const output = `
    <p>You have a new client request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Mobile No: ${req.body.mobileno}</li>
      <li>Comments: ${req.body.comments}</li>
    </ul>
    <h3>Message</h3>
    <p>Have a good day :)</p>
  `;
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD  // generated ethereal password
        }

  });
    
    // setup email data with unicode symbols
  let mailOptions = {
      from: '"Shree Krishna Residency" <ds8693037047@gmail.com>', // sender address
      to: 'singhadarsh50@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
    
    
    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('index', {layout: false, msg:'Email has been sent'});
  });
    
});



app.get('/client/aboutus', (req, res) => {
    res.render('aboutus', {layout: false});
});
    
    

app.get('/client', (req, res) => {
    res.render('index', {layout: false});
});

app.get('/client/kalyan', (req, res) => {
    res.render('kalyan', {layout: false});
});

app.get('/client/kalyan/building1', (req, res) => {
    res.render('building1', {layout: false});
});

app.get('/client/kalyan/building2', (req, res) => {
    res.render('building2', {layout: false});
});

app.get('/client/kalyan/building3', (req, res) => {
    res.render('building3', {layout: false});
});

app.get('/client/shahad', (req, res) => {
    res.render('shahad', {layout: false});
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000...");
});