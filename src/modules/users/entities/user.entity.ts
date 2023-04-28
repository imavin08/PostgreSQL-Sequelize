import { DataTypes } from 'sequelize';
import {
	Table,
	Column,
	Model,
	PrimaryKey,
	BelongsToMany,
	BeforeCreate,
} from 'sequelize-typescript';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/modules/roles/entities/userRole.entity';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model {
	@PrimaryKey
	@Column({
		type: DataTypes.UUIDV4,
		allowNull: false,
	})
	id: string;

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

	@BelongsToMany(() => Role, () => UserRole)
	roles: Role[];

	@BeforeCreate
	static addUuidId(instance: User) {
		instance.id = uuidv4();
	}
}
