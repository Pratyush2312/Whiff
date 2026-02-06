import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Not authenticated"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded.userId
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

export default authMiddleware