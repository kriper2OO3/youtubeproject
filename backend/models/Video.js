const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User} = require('../models/User')


const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING},
    idCreator: {type: DataTypes.INTEGER, references: {model: User, key: 'id'}}
}, {
    timestamps: false}
)


User.hasMany(Video, { foreignKey: 'idCreator', as: 'creator' });
Video.belongsTo(User, { foreignKey: 'idCreator', as: 'creator' });

module.exports = {
    Video
}