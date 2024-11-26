const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Expected format: "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Access denied! Token missing.' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Splits "Bearer token"
        req.user = verified; // Attaching verified user payload to req object
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token!' });
    }
};

module.exports = authMiddleware;
