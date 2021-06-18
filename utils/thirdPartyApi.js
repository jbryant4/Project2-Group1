const router = require('express').Router();
const bodyParser = require('body-parser');
const request = require('request');
const sequelize = require('../../config/connection');
const db = require('../models');
const apiKey = process.env.APIKEY;

router.get('/', function (req, res) { res.render('index'); });

router.get('/search', function (req, res) {
    const query = req.query.q;
    request('http://www.omdbapi.com/?s=' + query + "&apikey=" + apiKey, function (err, response, body)
     { 
         let json = JSON.parse(body); 
         if (!err && json.Search)
          { res.render('search', { movie: json.Search, q: query }); }
           else { request('http://www.omdbapi.com/?s=dragon+ball' + "&apikey=" + apiKey, 
           function (err, response, body) {
                let notFound = JSON.parse(body); res.render('search', { movie: notFound.Search, q: query }
                );
             });
             } 
            });
});