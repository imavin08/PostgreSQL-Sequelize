import { v4 } from 'uuid';
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

@Table
export class User extends Model {
	@PrimaryKey
	@Column({
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: v4(),
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

	@BelongsToMany(() => Role, () => UserRole)
	roles: Role[];

	@BeforeCreate
	static addUuidId(instance: User) {
		instance.id = v4();
	}
}
