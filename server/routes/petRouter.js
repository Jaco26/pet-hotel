const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.post('/', function(req, res) {
    const addedOwner = req.body;
    const sqlText = `INSERT INTO owners (first_name, last_name)
    VALUES ($1, $2);`;
    pool.query(sqlText, [addedOwner.first_name, addedOwner.last_name])
    .then(function(response) {
        res.sendStatus(201);
        console.log(response);
    }).catch(function(error) {
        console.log(error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /pet_hotel POST

router.get('/owners', function(req, res) {
    const sqlText = `SELECT * FROM owners ORDER BY id LIMIT 50`;
    pool.query(sqlText)
    .then(function(response) {
        res.send(response.rows);
        console.log(response);
    }).catch(function(error) {
        console.log(error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /pet_hotel GET

router.post('/add', function(req, res){
    const petToAdd = req.body;
    console.log('petToAdd:', petToAdd);
    const sqlText = `INSERT INTO pets (name, color, breed, owner_id) VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText,[petToAdd.name, petToAdd.color, petToAdd.breed, petToAdd.owner_id])
    .then(function(response){
        res.sendStatus(201);
        console.log(response);
    }).catch(function(error){
        res.sendStatus(500);
        console.log('error on add pet post:',error);
    })
})//End router /add POST


router.get('/pets', function(req, res) {
    const sqlText = `SELECT name, breed, color, owner_id, first_name, last_name, pets.id FROM pets JOIN owners ON pets.owner_id = owners.id ORDER BY pets.id LIMIT 50;`;
    pool.query(sqlText)
    .then(function(response) {
        res.send(response.rows);
        console.log(response);
    }).catch(function(error) {
        console.log(error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /pet_hotel GET

//Delete Button
router.delete('/delete/:id', (request, response) =>{
  const id = request.params.id;
  console.log('id from router.delete:' , id);
  
  const sqlText = `DELETE FROM pets WHERE id=$1`;
  pool.query(sqlText, [id])
    .then((result)=> {
      console.log('Delete!', result);
      response.sendStatus(200);
    })
    .catch((error)=> {
      console.log('info not deleted');
      response.sendStatus(500);
    })
}); // END router /delete/:id DELETE


module.exports = router;
