import { v4 } from 'uuid';
import {
	BeforeCreate,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from './role.entity';

@Table
export class UserRole extends Model {
	@PrimaryKey
	@Column
	id: string;

	@ForeignKey(() => User)
	@Column
	userId: string;

	@ForeignKey(() => Role)
	@Column
	roleId: string;

	@BeforeCreate
	static addUuidId(instance: UserRole) {
		instance.id = v4();
	}
}
