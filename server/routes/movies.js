const express = require('express')
const router = express.Router();
const Movies = require('../../models/Movies');
const axios = require('axios')
require('dotenv').config()

const IMDBAPI_KEY = process.env.REACT_APP_IMDBAPI_KEY;
const cx = process.env.REACT_APP_GOOGLE_CX
const API_KEY = process.env.REACT_APP_GOOGLEAPI_KEY

router.post('/search', async (req, res) => {
  let movie_title = req.body.movie.toLowerCase();
  var options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/find',
    params: {q: req.body.movie.toLowerCase()},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': IMDBAPI_KEY 
    }
  };
  
  try {
    let movie = await Movies.findOne({'movie_title': movie_title})
    if (movie) {
      console.log(movie.actor_one.name)
      res.redirect('/?name=' +  movie_title + 
                  '&actor_one=' + movie.actor_one.name + '&actor_one_img=' + movie.actor_one.image +
                  '&actor_two=' + movie.actor_two.name + '&actor_two_img=' + movie.actor_two.image +
                  '&actor_three=' + movie.actor_three.name + '&actor_three_img=' + movie.actor_three.image);
    } else {
      const response  = await axios.request(options)
      const principals = response.data.results[0].principals
      
      if (principals === null || principals === 'undefined') {
        console.log("didn't get actors");
        res.end("Couldn't locate movie in IMDB");
      }
      let imageSrc = [];
      for (const actor of principals) {
        console.log("calling google api...")
        const response = await axios.request(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${actor.name}`)
        const url = response.data.items[0].pagemap.cse_image[0].src
        imageSrc.push(url)
      }
      console.log('Images: ', imageSrc)
      
      actor_one = {'name': principals[0].name, 'image': imageSrc[0]}
      actor_two = {'name': principals[1].name, 'image': imageSrc[1]}
      actor_three = {'name': principals[2].name, 'image': imageSrc[2]}

      movie = new Movies({
        movie_title,
        actor_one,
        actor_two,
        actor_three,
      })

      await movie.save()
      res.redirect('/?name=' +  movie_title + 
                  '&actor_one=' + actor_one.name + '&actor_one_img=' + actor_one.image +
                  '&actor_two=' + actor_two.name + '&actor_two_img=' + actor_two.image +
                  '&actor_three=' + actor_three.name + '&actor_three_img=' + actor_three.image);
    }
  } catch(error) {
    console.log(error.message)
    res.status(500).send('Could not find that movie');
  }
})

module.exports = router