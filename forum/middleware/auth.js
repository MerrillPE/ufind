import jwt from 'jsonwebtoken';

// TODO: Replace with actual private key
const jwtKey = "secret_key";

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);

        // separate user token
        const token = req.headers.authorization.split(' ')[1];
        // Google token will be > 500
        const isUfindAuth = token?.length < 500;
        let decodedData;


        if (token && isUfindAuth) {
            decodedData = jwt.verify(token, jwtKey);
            //console.log("User ID: " + decodedData?._id);
            req.userId = decodedData?._id
        } else {
            decodedData = jwt.decode(token);
            //console.log("Google ID: " + decodedData?.sub)
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;