import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({success: false, message: 'Not Authorized! Login again.'});
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET;

        const token_decode = jwt.verify(token, jwtSecret);
        if (token_decode !== adminEmail + adminPassword) {
            return res.status(401).json({success: false, message: 'Not Authorized! Login again.'});
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({success: false, message: err.message})
    }
}

export default adminAuth;