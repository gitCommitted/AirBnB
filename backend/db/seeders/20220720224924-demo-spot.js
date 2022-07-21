'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: '1',
        address: '333 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '85',
        lng: '54',
        name: 'Testspot1',
        description: 'A great place to stay and test',
        price: '89.50',
       url: 'image url'
      },
      {
        ownerId: '1',
        address: '569 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '88',
        lng: '41',
        name: 'Testspot2',
        description: 'A great place to stay and test',
        price: '99.50',
       url: 'image url'
      },
      {
        ownerId: '2',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot3',
        description: 'A great place to stay and test',
        price: '199.50',
       url: 'image url'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {});
  }
};