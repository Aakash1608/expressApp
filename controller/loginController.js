const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const handleUser = async(req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required' });
    const userExists = await User.findOne({ username: user }).exec();
    if(!userExists) return res.status(401).json({ 'message': `No such ${user} user ` })
    const match = await bcrypt.compare(pwd, userExists.password)
    if(match){
        const accessToken = jwt.sign(
            { "username": userExists.username },
            process.env.ACCESS_TOKEN_SECRET,
            { 'expiresIn': '300s' }
        )
        const refreshToken = jwt.sign(
            { "username": userExists.username },
            process.env.REFRESH_TOKEN_SECRET,
            { 'expiresIn': '300s' }
        )
        userExists.refreshToken = refreshToken;
        const result = await userExists.save();
        console.log(result);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite:'None', maxAge: 24*60*60*1000 })
        res.json({ accessToken })
    }else {
        res.sendStatus(401)
    }
}

module.exports = { handleUser }