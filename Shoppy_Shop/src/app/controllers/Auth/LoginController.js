const Models = require("../../../models");
const User = Models.User;
const Helper = require("./Helpers");
const { Op } = require("sequelize");

const validateLogin = (req) => {
    const errors = {};
    for(let key of Object.keys(req.body)) {
        req.body[key] = !key.endsWith("password")?req.body[key].trim(): req.body[key];
        if(req.body[key]==="") errors[key] = `${key.toUpperCase()} cannot be Empty`;
    }
    return errors
}

module.exports = {
    get:(req, res) => {
        res.render("auth/LoginPage",{"layout": "template/template2"});
    },

    post: async (req, res) => {
        const errors = validateLogin(req);
        if(!Object.keys(errors).length){
            const customer = await Models.role.findOne({where: {role: "customer"}});
            const user = await User.scope("withHiddenData").findOne({
                where: {
                    [Op.or]: [{ username: req.body.username }, { email: req.body.username }],
                    role_id: customer.id
                }
            });
            
            if(user && User.checkPassword(req.body.password, user.password)){
                Helper.authenticate(req, user);
                return res.status(302).redirect("/");
            }
            errors["username_password"]= "username/email or password are not correct";
        }
        return res.render("auth/LoginPage",{"layout": "template/template2", errors:errors});
    },
    logout: (req, res) => {
        Helper.logout(req);
        return res.status(301).redirect("/");
    }
}
