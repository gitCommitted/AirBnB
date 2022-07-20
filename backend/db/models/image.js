'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.Review,
        {foreignKey: 'spotOrReviewId'}
      )
      Image.belongsTo(
        models.Spot,
        {foreignKey: 'spotOrReviewId'}
      )
    }
  }
  Image.init({
    type: DataTypes.STRING,
    spotOrReviewId: DataTypes.INTEGER,
    imagePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};