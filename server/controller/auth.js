const db = require("../model");
const config = require("../config/auth");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({
                            msg: "User was registered successfully!"
                        })
                    })
                })
            } else {
                user.setRoles([1]).then(() => {
                    res.send({
                        msg: "User was registered successfully!"
                    })
                })
            }
        }).catch(e => {
        res.status(500).send({msg: e})
    })
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({msg: "User Not found."});
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    msg: "Invalid Password"
                })
            }
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400
            });

            let auth = [];

            user.getRoles().then(roles => {
                roles.forEach((role, index) => {
                    auth.push("ROLE_" + roles[index].name.toUpperCase());
                });

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: auth,
                    accessToken: token
                })
            })
        }).catch(e => {
            res.status(500).send({msg: e})
    })
};