'use strict';

const User = require("../../../models").User;
const validator = require("../../../Helpers/ValidateRequestData");
const fs = require("fs");
const path = require("path");

module.exports = {
    get: (req, res) =>{
        res.render("profile", {"layout": "template"});
    },
    update: async (req, res) => {
        const required = ["name", "email", "address", "date_of_birth", "gender"];
        const {isValid, data} = validator.validateExistance(req, required);
        // console.log(req.body);
        console.log(Object.keys(req.body));
        if(isValid){
            const user = await User.findOne({where:{id: req.session.user.id}});
            user.name = data.name || user.name;
            user.email = data.email || user.email;
            user.address = data.address || null;
            user.date_of_birth = data.date_of_birth || null;
            user.gender = data.gender || user.gender;
            if (req.body.photo) {
                console.log("HERE");
                const dir = path.join(path.dirname(require.main.filename), "src", "public", "media_root", "images", req.session.user.username, "profile")
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                const uniqueSuffix = Date.now() + "" + Math.round(Math.random() * 1E9) + ".jpg";
                const base64Data = req.body.photo.replace(/^data:image\/png;base64,/, "");
                fs.writeFileSync(path.join(dir, uniqueSuffix), base64Data, 'base64', function (err) {
                    console.log(err);
                });
                user.profile_picture = `${process.env.MEDIA_URL}images/${req.session.user.username}/profile/${uniqueSuffix}`;
            } else if(req.file) {
                user.profile_picture = `${process.env.MEDIA_URL}images/${req.session.user.username}/profile/${req.file.filename}`;
            }
            const saved = await user.save().catch(console.log)
            if(saved){
                req.session.user = user;
                return res.render("profile", {"layout": "template"});
            }
        }
        return res.render("profile", {"layout": "template", errors:"Invalid data provided"});
    },

}
