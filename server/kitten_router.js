module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        // Get all kittens. Put kitten into json response when it resolves.
        dal.getKittens().then(kittens => res.json(kittens));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getKitten(id).then(kitten => res.json(kitten));
    });

    router.post('/', (req, res) => {
        let kitten = {
            name : req.body.name,
            hobbies : [] // Empty hobby array
        };
        dal.createKitten(kitten).then(newKitten => res.json(newKitten));
    });

    router.post('/:id/hobbies', (req, res) => {
        // To add a hobby, you need the id of the kitten, and some hobby text from the request body.
        dal.addHobby(req.params.id, req.body.hobby)
            .then(updatedKitten => res.json(updatedKitten));
    });

    return router;
};