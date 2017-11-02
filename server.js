const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const validator = require('validator')
const Mailgun = require('mailgun').Mailgun

const config = require("./config.js")



const PORT = process.env.PORT || 3000

const app = express()

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use(express.static('public'))

app.post('/send', (req, res) => {


  if (validator.isEmail(req.body.email)) {
    const email = validator.normalizeEmail(req.body.email)
    const name = validator.escape(req.body.name)
    const subject = validator.escape(req.body.subject)
    const message = validator.escape(req.body.message) + " FROM " + name;

    const mg = new Mailgun(config.mailgun_api);

    mg.sendText(email, config.email,
      subject,
      message,
      function(err) {
        if (err){
          console.log('Oh noes: ' + err)
          res.json('error')
        } else{
          console.log('Success');
          res.json('success')
        }
      });

    } else {

      res.json("error")

    }
  })

  app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log('Server started on PORT: ', PORT)
  })
