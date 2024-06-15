const jwt = require('jsonwebtoken')

const jwtmiddleware = (req,res,next) =>
    {
        // define logic to verify
        console.log("inside jwt middleware");
        const token = req.headers['authorization'].split(" ")[1]
        console.log(token);
        if(token)
            {
                try {
                    // verify
                const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
                console.log(jwtResponse);
                req.payload = jwtResponse.userId
                next()
                } catch (error) {
                    res.status(401).json("Invalid Token.., Please Login!!")
                }

            }else{
                res.status(404).json("Missing Token")
            }

    }

module.exports = jwtmiddleware