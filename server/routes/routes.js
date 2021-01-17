module.exports = app => {
    const crud = require('../controller/crud');
    let router = require('express').Router();

    router.get("/", crud.findAll); //done
    router.post("/", crud.create); //done
    router.delete("/", crud.deleteAll); //done

    router.get("/pub", crud.findAllPublisheded); //done

    router.get("/:id", crud.findOne); //done
    router.put("/:id", crud.update); //done
    router.delete("/:id", crud.delete); //done


    app.use('/api', router);
};