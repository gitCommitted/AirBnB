'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: '2',
        spotId: '1',
        startDate: '2022-10-01',
        endDate: '2022-10-10'
      },
      {
        userId: '3',
        spotId: '2',
        startDate: '2022-10-01',
        endDate: '2022-10-10'
      },
      {
        userId: '1',
        spotId: '3',
        startDate: '2022-11-01',
        endDate: '2022-11-10'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {});
  }
};
