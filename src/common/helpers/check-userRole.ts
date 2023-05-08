import { User } from 'src/modules/users/entities/user.entity';
import { RoleEnum } from '../enums';

export const CheckUserRole = (user: User, role: RoleEnum) => {
	const userRoles = user.dataValues.roles.map(role => role.name);
	if (userRoles.includes(role)) {
		return true;
	} else {
		return null;
	}
};
