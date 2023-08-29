import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string;

    private constructor({
        id,
        email,
        passwordHash,
    }: {
        id: number | null;
        email: string;
        passwordHash: string;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public static initialize({
        id,
        email,
        passwordHash,
    }: {
        id: number;
        email: string;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
    }: {
        email: string;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash,
        });
    }

    public toObject(): {
        id: number;
        email: string;
    } {
        return {
            id: this.id as number,
            email: this.email,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
        };
    }
}

export { UserEntity };
