import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    // try {
    //     const {token} = req.headers;
    //
    //     if (!token) {
    //         return res.status(401).json({success: false, message: 'Not Authorized. Login again'});
    //     }
    //     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //     req.body.userId = token_decode.id;
    //     next();
    //
    // } catch (error) {
    //     console.log(error);
    //     return res.status(401).json({success: false, message: error.message})
    // }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({success: false, message: 'No token provided. Not Authorized'});
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token. Not Authorized.' });
    }

}

export default authUser;