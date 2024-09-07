import { SetMetadata } from "@nestjs/common"
import { Role } from "../../common/enum/Roles.enum"

export const ROLES_KEY = 'rolesKey'
export const RolesDecorator = (role: Role) => SetMetadata('roles', role)