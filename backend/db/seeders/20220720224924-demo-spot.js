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
       previewImage: 'https://itweetbucket.s3.amazonaws.com/1673575474522.jpg'
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
       previewImage: 'https://itweetbucket.s3.amazonaws.com/1673886945407.jpg'
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
       previewImage: 'https://itweetbucket.s3.amazonaws.com/1673888309117.jpg'
      },
      {
        ownerId: '2',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot4',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673894217754.jpg'
      },
      {
        ownerId: '3',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot5',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673894829730.jpg'
      },
      {
        ownerId: '3',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot6',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673895619791.jpg'
      },
      {
        ownerId: '1',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot7',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673895746104.jpg'
      },
      {
        ownerId: '1',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot8',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673916263776.jpg'
      },
      {
        ownerId: '2',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot9',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673896248392.jpg'
      },
      {
        ownerId: '2',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot10',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673896947677.jpg'
      },
      {
        ownerId: '3',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot11',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673896673698.jpg'
      },
      {
        ownerId: '3',
        address: '355 Testing Pl',
        city: 'Tallahssee',
        state: 'Florida',
        country: 'US',
        lat: '105',
        lng: '106',
        name: 'Testspot12',
        description: 'A great place to stay and test',
        price: '199.50',
        previewImage: 'https://itweetbucket.s3.amazonaws.com/1673896408084.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {});
  }
};