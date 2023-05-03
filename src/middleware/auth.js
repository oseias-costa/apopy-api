const { AuthenticationError } = require('@apollo/server')
const jwt = require('jsonwebtoken')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization

    if(authHeader) {
        const token = authHeader.split('Bearer')[1]

        if(token) {
            try {
                const user = jwt.verify(token, "unsafe")
                return user
            } catch (err) {
                throw new AuthenticationError('Invalid/Expiraded Token')
            }
        }
            throw new AuthenticationError('Authentication token must be: Bearer [token]')
        }
        throw new AuthenticationError('Authentication header must be provided')
    }
