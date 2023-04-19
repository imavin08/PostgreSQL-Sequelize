import { DataTypes } from 'sequelize';
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model {
	@PrimaryKey
	@Column({
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	})
	id: number;

	@Column
	name: string;

	@Column({ unique: true })
	email: string;

	@Column
	password: string;

	@Column
	isActive: boolean;
}
