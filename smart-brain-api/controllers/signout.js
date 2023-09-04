const redisClient = require('../redis/redis').redisClient;

const handleSignout = (req, res, db) => {
    const { authorization } = req.headers;

    return redisClient.del(authorization, (err, reply) => {
        if(err || !reply) {
            return res.status(401).json('Unauthorized');
        } else {
            return res.json({"success": true});
        }
    });
};

module.exports = {
    handleSignout: handleSignout
}