//const router = require('express').Router();
//const sequelize = require('../../config/connection');
//const db = require('../models');
const apiKey = process.env.DB_APIKEY;



function movieSearch(data) {


    const movieUrl = "http://www.omdbapi.com/?t=arrival" + data + "&apikey=" + apiKey;
    fetch(movieUrl).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {
                   
                    const movieObject = {
                        movie_title: data.Title,
                        description: data.Plot,
                        genre: data.Genre,
                        year: data.Year
                    }
                    console.log(movieObject);
                    return(movieObject);
                    

                });


        }

    });
}

//need else           let notFound = JSON.parse(body); res.render('search', { movie: notFound.Search, q: query }

//check if we need to render to html directly

module.exports = movieSearch;





