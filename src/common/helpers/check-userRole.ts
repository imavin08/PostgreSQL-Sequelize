import { User } from 'src/modules/users/entities/user.entity';
import { RoleEnum } from '../enums';

export const CheckUserRole = (user: User, role: RoleEnum) => {
	return user.dataValues.roles.find(userRole => userRole.name === role);
};
