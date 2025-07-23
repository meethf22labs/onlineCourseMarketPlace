const checkIfInstructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Instructor role required.' });
}

module.exports = checkIfInstructor;