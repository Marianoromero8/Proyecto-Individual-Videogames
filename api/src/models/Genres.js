const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', { // no le pusimos ID ya que lo genera automaticamente
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'genres',
    })
}