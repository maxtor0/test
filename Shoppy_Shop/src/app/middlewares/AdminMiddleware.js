const Role = require("../../models").role;

module.exports = async (req, res, next) => {
    if(req.session.isAuth){
        const role = await Role.findOne({where:{id:req.session.user.role_id}})
        if(role.role === "admin")
            return next();
    }
    return res.redirect("/");
}
