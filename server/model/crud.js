module.exports = (Sequelize, sequelize) => {
    const Crud = sequelize.define("crud", {
        title: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
        pub: {
            type: Sequelize.BOOLEAN
        }
    });

    return Crud;
};