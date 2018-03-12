const controllers = require('./controllers')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );

const port = 5000

const baseURL = "/api/weather/:date_time/:temp/:skyCond";
app.put(baseURL, controllers.update)
app.delete( "/api/weather/:id", controllers.delete );



app.listen( port, () => {console.log(`Server jammin on port ${port}.`); } );

