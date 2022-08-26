const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403)
            req.user = decoded.username;
            console.log(req.user)
            next()
        }
    )
}

module.exports = verifyJWT 