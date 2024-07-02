const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', { // no le pusimos ID ya que lo genera automaticamente
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