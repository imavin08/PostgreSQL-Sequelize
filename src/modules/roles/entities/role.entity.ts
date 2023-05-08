import { PrimaryKey, Column, BeforeCreate, Model, Table } from 'sequelize-typescript';
import { v4 } from 'uuid';
@Table({ timestamps: false })
export class Role extends Model {
	@PrimaryKey
	@Column
	id: string;

	@Column
	name: string;

	@BeforeCreate
	static addUuidId(instance: Role) {
		instance.id = v4();
	}
}
