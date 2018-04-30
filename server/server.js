const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
//pem for generating our own SSL Certificate
let pem = require('pem')
//need to be on https for facebook
let https = require('https')
const pool = require('./modules/pool.js');
const passport = require('./strategies/fb.strategy.js');
const sessionConfig = require('./modules/session-middleware');

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//this logic checks to see if you are in dev mode and need to work on localhost
//if you are on ocalhost you need to create your own ssl certificate
//if you are on heroku you need to not use the ssl cert since heroku provides its own
if(process.env.DEV == 'true') {
  console.log('in DEV local mode, from server');
  //pem generates our SSL Certifiace here
  pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
      throw err
    }
  //Keys for https are used here
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(4430)
  console.log('listening on port 4430');
  })
} else{
  console.log('in live mode, from server');
  //if you are not in dev mode the server does not need to generate its own ssl
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, function(){
    console.log(`server listening on port ${PORT}`);
  });//end app listen
}
//end if for dev


// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('server/public'));

// Route includes
const stripeRouter = require('./routes/stripe.router');
const nonprofitRouter = require('./routes/nonprofit.router');
const feedRouter = require('./routes/feed.router');
const reportRouter = require('./routes/report.router');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

/* Routes */
app.use('/stripe', stripeRouter);
app.use('/nonprofit', nonprofitRouter);
app.use('/feed', feedRouter);
app.use('/report', reportRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Filestack api key
const FILESTACK_KEY = process.env.FILESTACK_KEY;
app.get('/filestack-key', (req, res) => {
  res.send(FILESTACK_KEY);
});
