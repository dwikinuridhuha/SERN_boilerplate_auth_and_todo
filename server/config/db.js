module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "toor",
    DB: "SERN_test_bezKode_1",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};