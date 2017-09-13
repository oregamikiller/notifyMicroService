var app        = require('express')(),
    bodyParser = require('body-parser'),
    config     = require('./config'),
    Promise    = require('bluebird'),
    nodemailer = require('nodemailer'),
    _          = require('lodash'),
    transporter = nodemailer.createTransport(config.mail.options);

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function dateFormat (format,date) {
    date instanceof Date||(date=new Date(date));
    var f={
        "y+":date.getFullYear(),
        "M+":date.getMonth()+1,
        "d+":date.getDate(),
        "h+":date.getHours(),
        "m+":date.getMinutes(),
        "s+":date.getSeconds()
    },fd;
    for(var o in f){
        if(new RegExp(o).test(format))
        {
            fd=RegExp.lastMatch;
            format=format.replace(fd,o==="y+"?f[o].toString().slice(-fd.length):fd.length===1?f[o]:(f[o]+100).toString().slice(-fd.length));
        }
    }
    return format;
};



app.all('/', function (req, res) {
    var mailOptions = {
        from: config.mail.from, // sender address
        to: 'oregami@163.com', // list of receivers
        subject: 'ipchanged', // Subject line
        text: 'Hello world ?'// plain text body
    };
    if (req.query.text) {
        mailOptions.text = req.query.text;
        if (req.query.to && req.query.to.contains(',')) {
            req.query.to = req.query.to.split(',')
        }
        mailOptions.to = req.query.to || mailOptions.to;
        mailOptions.subject = req.query.subject || mailOptions.subject;
        transporter.sendMail(mailOptions).then(() => res.send('ok')).catch(console.log);
    } else {
        res.send('no text');
    }
});

app.listen(config.port);
console.log("Server is listening: " + config.port);


process.on("uncaughtException", function (err) {
    console.log(err);
});

