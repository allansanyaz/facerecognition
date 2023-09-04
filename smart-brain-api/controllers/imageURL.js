const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

const handleImageURL = (req, res) => {
    const {input} = req.body;
    // other model is: a403429f2ddf4b49b307e318f00e528b/face-detection
    return app.models.predict(
        {
            id: "a403429f2ddf4b49b307e318f00e528b",
            version: "34ce21a40cc24b6b96ffee54aabff139",
        },
        input)
        .then(data => {
            return res.json(data);
        })
        .catch(err => { console.log(err) })
}

module.exports = {
    handleImageURL: handleImageURL
}