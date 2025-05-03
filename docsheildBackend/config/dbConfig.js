module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'karim_cv_a1b2c3',
    DB: 'souqdz_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}