'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        imageableType: 'spot',
        imageableId: '1',
        url: 'home/desktop'
      },
      {
        imageableType: 'spot',
        imageableId: '2',
        url: 'home/desktop'
      },
      {
        imageableType: 'review',
        imageableId: '3',
        url: 'home/desktop'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {});
  }
};
