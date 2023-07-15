const express = require('express')
const jwt = require('jsonwebtoken')
const PORT = 5000 || process.env.PORT
const app = express()

app.get('/api',(req, res)=>{
    res.json({
        message:"hello from api"
    })
})
// Authoriztion: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
if(typeof bearerHeader !== 'undefined') {
    // bearer token => [0] => bearer [1] => token
req.token = bearerHeader.split(' ')[1] 
next()
} else {
      // Forbidden
        res.sendStatus(403)
}
  
}
app.post('/api/posts',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err) {
            res.sendStatus(403)
        } else {

    res.json({
        message:"Post created...",
        authData
    })
        }
    })
})

app.post('/api/login',(req, res)=>{
    // Mock user 
    const user = {
        id:1,
        username:'kamal',
        email:'kamalkafi12@gmail.com'
    }
    jwt.sign({user},'secretKey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        })
    })
   
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})