require('dotenv').config();  // init env vars
const router = require('express').Router();
const fetch = require('node-fetch')
const apiKey = process.env.DB_APIKEY;


router.get('/:movie',(req, res) => {
    // console.log(apiKey, req.params.movie)
    const movieUrl = "http://www.omdbapi.com/?t=" + req.params.movie + "&apikey=" + apiKey;
    fetch(movieUrl).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                // console.log(data)
                const movieObject = {
                    movie_title: data.Title,
                    description: data.Plot,
                    genre: data.Genre,
                    actors: data.Actors,
                    poster: data.Poster,
                    year: data.Year
                }
                // console.log(movieObject);
                res.json(movieObject);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ message: 'No movie found with this title' });
                
            });
            
            
        }
        
    })
})
    

module.exports = router