import { DataTypes } from 'sequelize';
import { Table, Column, Model, PrimaryKey, BelongsToMany } from 'sequelize-typescript';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/modules/roles/entities/userRole.entitty';

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

	@Column({ defaultValue: true })
	isActive: boolean;

	@Column({ defaultValue: null })
	token: null | string;

	// @BelongsToMany(() => Role, () => UserRole)
	// roles: Role[];
}
