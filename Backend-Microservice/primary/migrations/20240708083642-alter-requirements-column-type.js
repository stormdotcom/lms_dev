'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Courses"
      ALTER COLUMN "requirements"
      SET DATA TYPE VARCHAR[]
      USING string_to_array(requirements, ',');
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Courses', 'requirements', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  }
};
