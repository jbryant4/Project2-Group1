//const router = require('express').Router();
//const sequelize = require('../../config/connection');
//const db = require('../models');
const apiKey = process.env.DB_APIKEY;



function movieSearch(data) {


    const movieUrl = "http://www.omdbapi.com/?t=ghost" + data + "&apikey=" + apiKey;
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


//router.get('/search', function (req, res) {
  //  const query = req.query.q;
 //   request('http://www.omdbapi.com/?s=' + query + "&apikey=" + apiKey, function (err, response, body)
 //    { 
 //        let json = JSON.parse(body); 
 //        if (!err && json.Search)
 //         { res.render('search', { movie: json.Search, q: query }); }
  //         else { request('http://www.omdbapi.com/?s=dragon+ball' + "&apikey=" + apiKey, 
  //         function (err, response, body) {
  //              let notFound = JSON.parse(body); res.render('search', { movie: notFound.Search, q: query }
  //              );
  //           });
  //           } 
  //          });
//}); 


module.exports = movieSearch;





