'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: '1',
        spotId: '1',
        review: 'Stay Here',
        stars: '4'
      },
      {
        userId: '1',
        spotId: '2',
        review: 'Stay Here',
        stars: '3'
      },
      {
        userId: '2',
        spotId: '3',
        review: 'Stay Here',
        stars: '2'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {});
  }
};
