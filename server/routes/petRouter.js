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

router.get('/', function(req, res) {
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




module.exports = router;