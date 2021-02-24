const User = require("../../../models").User;

module.exports = {
    authenticate: (req, user) => {
        if(user instanceof User) {
            delete user.password;
            req.session.user = user;
            req.session.isAuth = true;
            return true;
        }
        return false;
    },
    logout: (req) => {
        req.session.user = null;
        req.session.isAuth = false;
        return false;
    }
}
