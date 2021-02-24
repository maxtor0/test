const User = require("../../models").User;

module.exports = async (req, res, next) => {
    res.locals.session = req.session;
    if(req.session.user)
        res.locals.session.user = await User.findOne({where:{id:req.session.user.id}});
    return next();
}
