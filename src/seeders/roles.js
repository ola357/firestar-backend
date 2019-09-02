module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Travel Administrator',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Treavel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manager',
        parentId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {})
};