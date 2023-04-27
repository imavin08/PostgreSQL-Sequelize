import { PrimaryKey, Column, BeforeCreate, Model } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

export class Role extends Model {
	@PrimaryKey
	@Column
	id: string;

	@Column
	name: string;

	@BeforeCreate
	static addUuidId(instance: Role) {
		instance.id = uuidv4();
	}
}
