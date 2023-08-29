import { type UserRole } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'role': ValueOf<typeof UserRole>;

    private 'passwordHash': string;

    private constructor({
        id,
        email,
        role,
        passwordHash,
    }: {
        id: number | null;
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
    }) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.passwordHash = passwordHash;
    }

    public static initialize({
        id,
        email,
        role,
        passwordHash,
    }: {
        id: number;
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            role,
            passwordHash,
        });
    }

    public static initializeNew({
        email,
        role,
        passwordHash,
    }: {
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            role,
            passwordHash,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        role: ValueOf<typeof UserRole>;
    } {
        return {
            id: this.id as number,
            email: this.email,
            role: this.role,
        };
    }

    public toNewObject(): {
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
    } {
        return {
            email: this.email,
            role: this.role,
            passwordHash: this.passwordHash,
        };
    }
}

export { UserEntity };
