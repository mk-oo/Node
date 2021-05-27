
var express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sendergridTransport = require('nodemailer-sendgrid-transport');
const path = require('path');
var exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// upload file
app.use(fileUpload());

// view engine setup 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')))

//bodyParser middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// rendering html
app.get('/', function (req, res) {
    res.render('home');
});


app.post('/send', (req, res) => {
    const output = `
        <ul>
            <li> NAME: ${req.body.fname}</li>
            <li> Image: ${req.body.lname}</li>
            <li> Email: ${req.body.insta}</li>
            <li> Mobile: ${req.body.email}</li>
            <li> subject: ${req.body.mobile}</li>
            <li> message: ${req.body.address}</li>
            <li> NAME: ${req.body.city}</li>
            <li> Image: ${req.body.gender}</li>
            <li> Email: ${req.body.birthday}</li>
            <li> Mobile: ${req.body.study}</li>
            <li> subject: ${req.body.school}</li>
            <li> message: ${req.body.height}</li>
            <li> NAME: ${req.body.hairlength}</li>
            <li> Image: ${req.body.eye}</li>
            <li> Email: ${req.body.shoesize}</li>
            <li> Mobile: ${req.body.fullimage}</li>
            <li> subject: ${req.body.waistup}</li>
            <li> message: ${req.body.closeup}</li>
            <li> message: ${req.body.sideimg}</li>
        </ul>
        `
    console.log(req.body);

    const transporter = nodemailer.createTransport(sendergridTransport({

        auth: {
            api_key: '' //sendgrid api for your gmail 
        }
    }));

    var options = {
        to: 'account_reciever@gmail.com',
        from: 'account_sender@gmail.com',
        subject: 'sendgrid',
        html: output,
        attachments: [
            {
                filename: 'Untitled.png',
                path: __dirname + '/Untitled.png',
                cid: 'uniq-mailtrap.png'
            },
            {
                filename: 'mailtrap.jpg',
                path: __dirname + '/mailtrap.jpg',
                cid: 'uniq-mailtrap.png'
            },
            {
                filename: 'mailtrap.jpg',
                path: __dirname + '/mailtrap.jpg',
                cid: 'uniq-mailtrap.png'
            },
            {
                filename: 'mailtrap.jpg',
                path: __dirname + '/mailtrap.jpg',
                cid: 'uniq-mailtrap.png'
            }
        ]
    }
    transporter.sendMail(options, function (error, info) {

        if (error) { console.log(error) }
        else {
            console.log('Email sent successfully ' + info.respose)

            res.render('home', { msg: 'Email has been sent' });
        }
        
    });
});

app.listen(3000, () => console.log('Server started...'));