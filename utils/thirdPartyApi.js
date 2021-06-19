const router = require('express').Router();
const sequelize = require('../../config/connection');
const db = require('../models');
const apiKey = process.env.DB_APIKEY;


function movieSearch (data) {
    
    const movieUrl = "http://www.omdbapi.com/?t=" + data + "&apikey=" + apiKey;
    fetch(movieUrl).then(function (response){
        if (response.ok) {
            response.json()
            .then(function (data){
                console.log(data);
            });


        }
    
    }); 
}
    


movieSearch(ghost);


