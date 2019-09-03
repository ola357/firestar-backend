'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('logins', [{
      email: 'youremail@andela.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'youremail2@andela.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: process.env.YOUR_EMAIL,
      password: process.env.SOME_PASSWORD,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('logins', null, {});
  }
}