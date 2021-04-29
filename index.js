const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4040

/** set up static files */
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

/** set up templating engines */
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended : true}))

/** set up routes and let app use them */
const show_routes = require('./src/routes/shows')
app.use('/', show_routes)
app.use('/show', show_routes)

/** app is listening on specified port */
app.listen(process.env.PORT || 4040, () => console.log("Server up and running"))