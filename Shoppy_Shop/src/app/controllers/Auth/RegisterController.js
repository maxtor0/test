"use strict";

const Models = require("../../../models");
const User = Models.User;
const Helper = require("./Helpers");
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave");
const fs = require("fs");
const path = require('path');

const buildUserFromRequest = async (req) => {
    const customer = await Models.role.findOne({where: {role: "customer"}})
    return User.build({
        name: req.body.name,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        role_id: customer.id,
    })
}

const validateRegistration = (req) => {
    const errors = {};
    const passwords = [];
    for(let key of Object.keys(req.body)) {
        req.body[key] = !key.endsWith("password")?req.body[key].trim(): req.body[key];
        if(req.body[key]==="") errors[key] = `${key.toUpperCase()} cannot be Empty`;
        if(key.endsWith("password")) passwords.push(req.body[key]);
    }
    if(!(passwords.length===2 && passwords[0] === passwords[1]) && !errors[passwords]) errors["password"] = "Password and confirmation not match";
    return errors
}

module.exports = {
    get: (req, res) => {
        res.render("auth/RegisterPage",{"layout": "template/template2"});
    },

    post: async (req, res) => {
        let allErrors = validateRegistration(req);
        if(!Object.keys(allErrors).length) {
            let user = await buildUserFromRequest(req);
            const {item, errors} = await ValidateInstanceSave.validateSave(user, User);
            allErrors = errors;
            if(item){
                const dir = path.join(path.dirname(require.main.filename), "src", "public", "media_root", "images", user.username);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                Helper.authenticate(req, user);
                return res.status(302).redirect("/");
            }
        }

        return res.render("auth/RegisterPage",{"layout": "template/template2", errors: allErrors});
    }
}
