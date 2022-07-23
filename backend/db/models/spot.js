'use strict';
const {
  Model
} = require('sequelize');
const { Review } = require('./review');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static async makeSpot({ 
ownerId, address, city, state, country, lat, lng, name, description, price }) 
    {
      const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
      return await Spot.findByPk(newSpot.id);
    }
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {
          as: 'Owner',
          foreignKey: 'ownerId'
        }
      )
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Image,
        {foreignKey: 'imageableId'}
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat:  DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    previewImage: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};