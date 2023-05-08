'use strict';

const { v4 } = require('uuid');

const userId = v4();
const adminId = v4();
const superAdminId = v4();

const roles = [
	{
		id: userId,
		type: 'User',
	},
	{
		id: adminId,
		type: 'Admin',
	},
	{
		id: superAdminId,
		type: 'SuperAdmin',
	},
];

/** @type {import('sequelize-cli').Migration} */
('use strict');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		//Create the Role table
		await queryInterface.createTable('Roles', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		// Create the User table
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});

		// Create the UserRole table to associate Users with Roles
		await queryInterface.createTable('UserRoles', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			roleId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Roles',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});

		// Create the roles
		const roleObjs = roles.map(role => ({
			id: role.id,
			name: role.type,
			createdAt: new Date(),
			updatedAt: new Date(),
		}));
		await queryInterface.bulkInsert('Roles', roleObjs, {});
	},

	down: async (queryInterface, Sequelize) => {
		// Drop the UserRole table
		await queryInterface.dropTable('UserRoles');

		//Drop table Roles
		await queryInterface.dropTable('Roles');

		// Drop the User table
		await queryInterface.dropTable('Users');
	},
};
