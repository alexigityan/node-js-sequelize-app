const Sequelize = require('sequelize')
const db = new Sequelize('code_gigs', 'gigs_user', process.env.DB_PASS, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
})

module.exports = db