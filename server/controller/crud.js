const db = require('../model');
const crud = db.crud;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            msg: "Content can not be empty"
        });

        return;
    }

    const dataCRUD = {
        title: req.body.title,
        desc: req.body.desc,
        pub: req.body.pub
    };

    crud.create(dataCRUD)
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null;

    // console.log(title);
    // console.log(condition);

    crud.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    crud.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    crud.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    msg: "CRUD is updated"
                });
            } else {
                res.send({
                    msg: `can't update ${id} maybe not found or req.body empty`
                });
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    crud.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    msg: "CRUD is deleted"
                });
            } else {
                res.send({
                    msg: `can't update ${id} maybe not found or req.body empty`
                });
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.deleteAll = (req, res) => {
    crud.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                msg: `CRUD is delete all of them ${num}`
            });
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({
                msg: e
            })
        });
};

exports.findAllPublisheded = (req, res) => {
    crud.findAll({
        where:{pub: true}
    })
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500).send({
                msg: e
            })
        })
};