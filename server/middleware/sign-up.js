const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                res.status(400).send({
                    msg: "user is exist"
                });
                return;
            }

            User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user) {
                        res.status(400).send({
                            msg: "email is exist"
                        });
                        return;
                    }

                    next();
                });
        });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        roles.forEach((role, index) => {
            if(!ROLES.includes(req.body.roles[index])) {
                res.status(400).send({
                    msg: "Failed! Role does not exist = " + req.body.roles[index]
                });
                return;
            }
        });
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;