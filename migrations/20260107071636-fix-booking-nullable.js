'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'staffId', {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Staffs', // Make sure this matches your table name
        key: 'id',
      },
    });

    await queryInterface.changeColumn('Bookings', 'serviceId', {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Services', // Make sure this matches your table name
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'staffId', {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'SET NULL',
      references: {
        model: 'Staffs',
        key: 'id',
      },
    });

    await queryInterface.changeColumn('Bookings', 'serviceId', {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'SET NULL',
      references: {
        model: 'Services',
        key: 'id',
      },
    });
  }
};