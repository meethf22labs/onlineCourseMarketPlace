const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const generate = jwt.sign(
        {
            id: user.id, 
            role: user.role
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    );
    return generate;
}

module.exports = generateToken;

