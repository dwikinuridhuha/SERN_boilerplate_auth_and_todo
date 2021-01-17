const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require('../model');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            msg: "no token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                msg: "Unauthorized!"
            });
        }

        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            roles.forEach((role, index) => {
                if (roles[index].name === "admin") {
                    next();
                    return;
                }
            });

            return res.status(403).send({
                msg: "Require Admin Role!"
            });

            return;
        })
    })
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            roles.forEach((role, index) => {
                if (roles[index].name === "moderator") {
                    next();
                    return;
                }
            });

            return res.status(403).send({
                msg: "Require moderator Role!"
            });

            return;
        })
    })
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            roles.forEach((role, index) => {
                if (roles[index].name === "moderator") {
                    next();
                    return;
                }

                if (roles[index].name === "admin") {
                    next();
                    return;
                }
            });

            return res.status(403).send({
                msg: "Require Moderator or Admin Role!"
            });

            return;
        })
    })
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;
