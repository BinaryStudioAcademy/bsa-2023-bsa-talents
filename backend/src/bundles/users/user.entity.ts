import { type UserRole } from '~/common/enums/enums.js';
import { type Entity, type ValueOf } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': string | null;

    private 'email': string;

    private 'role': ValueOf<typeof UserRole>;

    private 'passwordHash': string;

    private 'resetToken': string | null;

    private 'resetTokenExpiry': number | null;

    private constructor({
        id,
        email,
        role,
        passwordHash,
        resetToken,
        resetTokenExpiry,
    }: {
        id: string | null;
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
        resetToken: string | null;
        resetTokenExpiry: number | null;
    }) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.passwordHash = passwordHash;
        this.resetToken = resetToken;
        this.resetTokenExpiry = resetTokenExpiry;
    }

    public static initialize({
        id,
        email,
        role,
        passwordHash,
        resetToken,
        resetTokenExpiry,
    }: {
        id: string;
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
        resetToken: string | null;
        resetTokenExpiry: number | null;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            role,
            passwordHash,
            resetToken,
            resetTokenExpiry,
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
            resetToken: null,
            resetTokenExpiry: null,
        });
    }

    public toObject(): {
        id: string;
        email: string;
        role: ValueOf<typeof UserRole>;
        resetToken: string | null;
        resetTokenExpiry: number | null;
    } {
        return {
            id: this.id as string,
            email: this.email,
            role: this.role,
            resetToken: this.resetToken,
            resetTokenExpiry: this.resetTokenExpiry,
        };
    }

    public toNewObject(): {
        email: string;
        role: ValueOf<typeof UserRole>;
        passwordHash: string;
        resetToken: string | null;
        resetTokenExpiry: number | null;
    } {
        return {
            email: this.email,
            role: this.role,
            passwordHash: this.passwordHash,
            resetToken: this.resetToken,
            resetTokenExpiry: this.resetTokenExpiry,
        };
    }
}

export { UserEntity };
