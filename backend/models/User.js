const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
}, {
    timestamps: false}
)

module.exports = {
    User
}