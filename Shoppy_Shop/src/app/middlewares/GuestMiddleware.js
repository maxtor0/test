module.exports = (req, res, next) => {
    if(!req.session.isAuth)
        return next()
    return res.status(301).redirect("/");
}
