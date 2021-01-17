module.exports = (Sequelize, sequelize) => {
  const Role = sequelize.define("users", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING
      }
  });

  return Role;
};