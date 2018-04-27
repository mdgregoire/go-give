var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var pool = require('../modules/pool.js');

let debug = false;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://cogiv.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'birthday','first_name', 'last_name',
      'middle_name', 'gender', 'link', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    if(debug){console.log('Facebook profile', profile, profile.picture);};

    pool.query('SELECT * FROM users WHERE fb_id = $1;', [profile.id]).then((result) => {
      if(result.rows.length === 0) {
        pool.query('INSERT INTO users (name, fb_id, first_name, last_name) VALUES ($1, $2, $3, $4);',
                    [profile.displayName, profile.id, profile.name.givenName, profile.name.familyName])
          .then((result) => {
            if(debug){console.log('registered new user');};
            pool.query(`INSERT INTO feed (nonprofit_id, feed_text) VALUES ($1, $2);`,
                        [1, `Please welcome ${profile.displayName} to cogiv!` ]);

            pool.query('SELECT * FROM users WHERE fb_id = $1;', [profile.id]).then((result) => {
              if(result.rows.length === 0) {
                done(null, false);
              } else {
                let foundUser = result.rows[0];
                if(debug){console.log('found user', foundUser);};
                done(null, foundUser);
              }
            }).catch((err) => {
              done(null, false);
            })
          })
          .catch((err) => {
            if(debug){console.log('error in new user post', err);};
            done(null, false);
          })
      } else {

        let foundUser = result.rows[0];
        if(debug){console.log('found user', foundUser);};
        done(null, foundUser);
      }
    }).catch((err) => {
      if(debug){console.log('error in new user post', err);};
      response.sendStatus(500);
      done(null, false);
    })
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    pool.query("SELECT * FROM users WHERE id = $1", [id], function(err, result) {
      // Handle Errors
      if(err) {
        console.log('query err ', err);
        done(err);
      }
      user = result.rows[0];
      if(!user) {
          // user not found
          return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found
        done(null, user);
      }
    });
});

module.exports = passport;
