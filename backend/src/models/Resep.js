const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resep = sequelize.define('Resep', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bahan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cara_membuat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'resep',
  timestamps: true,
});

module.exports = Resep;
