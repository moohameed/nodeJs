const isAdmin = (req, res) => {
    try {
        let token = req.get("Authorization")
        if (!token) {
            res.status(400).send({ message: "You are not allowed" })
        } else {
            let decodedToken = jwt.verify('token', "token")
            if (!decodedToken) {
                res.status(400).send({ message: "You are not allowed" })
            } else {
                if (decodedToken.role == "admin") {
                    next()
                } else {
                    res.status(400).send({ message: "You are not allowed" })
                }
            }

        }

    } catch (error) {
        res.status(400).send({ message })
    }

}
module.exports = isAdmin