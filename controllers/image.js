const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6e37221f9ff84bcd92d3a1e2bb23cbca'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("enable to work with api"));
}



const handleImage = (req,res, db) => {
    const { id } = req.body;

    db('users').where({id})
    .increment('score', 1)
    .returning('score')
    .then(score => res.json(score[0].score))
    .catch(err => res.status(400).json("cannot get score"));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}