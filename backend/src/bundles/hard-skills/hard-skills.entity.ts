import { type Entity } from '~/common/types/types.js';

class HardSkillsEntity implements Entity {
    private 'id': string | null;

    private 'name': string;

    private constructor({ id, name }: { id: string | null; name: string }) {
        this.id = id;
        this.name = name;
    }

    public static initialize({
        id,
        name,
    }: {
        id: string;
        name: string;
    }): HardSkillsEntity {
        return new HardSkillsEntity({
            id,
            name,
        });
    }

    public static initializeNew({ name }: { name: string }): HardSkillsEntity {
        return new HardSkillsEntity({
            id: null,
            name,
        });
    }

    public toObject(): {
        id: string;
        name: string;
    } {
        return {
            id: this.id as string,
            name: this.name,
        };
    }

    public toNewObject(): {
        name: string;
    } {
        return {
            name: this.name,
        };
    }
}

export { HardSkillsEntity };
