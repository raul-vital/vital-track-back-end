const jwt = require('jsonwebtoken')

function authenticate(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()

    }catch(err){
        res.status(400).json({err: 'Invalid Token.'})
    }
}

module.exports = authenticate