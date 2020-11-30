import { User } from 'src/app/shared/models/user.interface';

export class RoleValidator {
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }
}