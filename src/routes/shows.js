const express = require('express')
const show_routes = express.Router()
const axios = require('axios')

/**
 * @param {*} min 
 * @param {*} max 
 * @returns random_int a random page number (integer) on reload
 */
const get_random_integer = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let random_int = 0;
  for( let i = 0; i < 5; i++){
    random_int =  Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return random_int;
}

/**
 * set up the root route displaying all the posts from the API
 */
show_routes.get('/', async(req, res) => {
  try {
      let page_number = get_random_integer(0,10);
      const show_API = await axios.get(`http://api.tvmaze.com/shows?page=${page_number}`)
      page_number = 0;
      res.render('shows', { shows : show_API.data })
    } catch (err) {
      if(err.response) {
        res.render('shows', { shows : null})
      } else if(err.request) {
        res.render('shows', { shows : null})              
      } else {
        res.render('shows', { shows : null })          
      }
    }
  })
  
/**
 * set up the single post route displaying the posts per its id
 */
  show_routes.get('/:id', async(req, res) => {
    let show_ID = req.params.id
    try{
      const show_API = await axios.get(`https://api.tvmaze.com/shows/${show_ID}`)
      res.render('show_single', { show: show_API.data })
    }catch (err) {
      if( err.response) {
        res.render('show_single', { show : null })
      } else if(err.request) {
        res.render('show_single', { show : null })       
      } else {
        res.render('show_single', { show : null })    
      }
    }
  })
  
/**
 * set up the search post route
 */
  show_routes.post('', async(req, res) => {
    let user_input = req.body.search
    let search = user_input.split(' ').join('+');
    try {
      const show_API = await axios.get(`http://api.tvmaze.com/search/shows?q=${search}`)
      if((show_API.data).length > 0){
        res.render('show_search', { shows : show_API.data})
      } else if(Object.entries(show_API.data).length === 0) {
        res.render('show_search', { shows : null})
      }
    } catch (err) {
        if(err.response) {
          res.render('show_search', { shows : null })
        } else if (err.request) {
          res.render('show_search', { shows : null })              
        } else {
          res.render('show_search', { shows : null })     
        }
    }
})

module.exports = show_routes