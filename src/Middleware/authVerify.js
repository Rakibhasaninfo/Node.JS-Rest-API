var jwt = require('jsonwebtoken');


module.exports=(req,res,next)=>{

   let Token=req.headers['token-key'];

   jwt.verify(Token,"Rakib1234",function (err,decoded) {
        if(err){
            res.status(401).json({status:"unauthorized"})
        }
        else {
            // Get User Name From Decoded Token & Add With Req Header
            let username=decoded['data']['UserName'];
            req.headers.username=username

            next();
        }
    })


}