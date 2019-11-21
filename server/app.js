const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode

/**** Database ****/
// The "Kitten Data Access Layer".
const kittenDAL = require('./kitten_dal')(mongoose);

/**** Start ****/
const url = (process.env.MONGO_URL || 'mongodb://localhost/kitten_db');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        // Fill in test data if needed.
        await kittenDAL.bootstrap();

        // Routes
        const kittenRouter = require('./kitten_router')(kittenDAL);
        app.use('/api/kittens', kittenRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        await app.listen(port); // Start the API
        console.log(`Kitten API running on port ${port}!`)
    })
    .catch(error => console.error(error));



