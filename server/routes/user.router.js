const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const userData= require('../modules/userData.js');


console.log('in user router');

router.post('/', (request, response) => {
  console.log('in POST fb', request.body);
  pool.query('INSERT INTO users (name, img_url, fb_id, first_name, last_name) VALUES ($1, $2, $3, $4, $5);',
              [request.body.name, request.body.url, request.body.fbid, request.body.first_name, request.body.last_name])
    .then((result) => {
      console.log('registered new user');
      response.sendStatus(201);
    })
    .catch((err) => {
      console.log('error in new user post', err);
      response.sendStatus(500);
    })
})
//end POST new user, protect not needed

  router.get('/:id', (request, response) => {
    user = userData(request.params.id)
    .then( user => {
    console.log(user, 'user in get a user router from module');
      if(user == null){
        response.sendStatus(500);
      } else {
        response.send({user:user});
      }
    })
  })
  //end get FB user by id

  router.get('/', (request, response)=>{
    console.log('in get all users route');
    pool.query('SELECT * FROM users ORDER BY name;')
    .then((result)=>{
      console.log('success in get', result.rows);
      response.send(result);
    })
    .catch((err) => {
      response.sendStatus(500);
    })
  })
// end get all users route, protect not needed

router.delete('/:user/:id', (request, response) => {
  console.log('in delete user route', request.params.id, request.params.user);
    user = userData(request.params.user)
    .then(function(user){
      console.log(user, 'user in delete after check');
      if(user.role == 1){
        pool.query('DELETE FROM users WHERE id = $1;', [request.params.id])
        .then((result) => {
          console.log('success in deleting user', result);
          response.sendStatus(200);
        })
        .catch((err) => {
          console.log('error in delete user', err);
          response.sendStatus(500);
        })
      } else {
        response.sendStatus(500)
        console.log('error in delete, must be admin');
        }
  })
})
  // end delete user route, protected

module.exports = router;
