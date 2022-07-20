'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        type: 'spot',
        spotOrReviewId: '1',
        imagePath: 'home/desktop'
      },
      {
        type: 'spot',
        spotOrReviewId: '2',
        imagePath: 'home/desktop'
      },
      {
        type: 'review',
        spotOrReviewId: '3',
        imagePath: 'home/desktop'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {});
  }
};
