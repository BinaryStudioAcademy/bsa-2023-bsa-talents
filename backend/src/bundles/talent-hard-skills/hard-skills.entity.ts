import { type Entity } from '~/common/types/types.js';

class TalentHardSkillsEntity implements Entity {
    private 'id': string | null;

    private 'hardSkillId': string;

    private 'userDetailsId': string | null;

    private constructor({
        id,
        hardSkillId,
        userDetailsId,
    }: {
        id: string | null;
        hardSkillId: string;
        userDetailsId: string | null;
    }) {
        this.id = id;
        this.hardSkillId = hardSkillId;
        this.userDetailsId = userDetailsId;
    }

    public static initialize({
        id,
        hardSkillId,
        userDetailsId,
    }: {
        id: string | null;
        hardSkillId: string;
        userDetailsId: string | null;
    }): TalentHardSkillsEntity {
        return new TalentHardSkillsEntity({
            id,
            hardSkillId,
            userDetailsId,
        });
    }

    public static initializeNew({
        hardSkillId,
        userDetailsId,
    }: {
        hardSkillId: string;
        userDetailsId: string | null;
    }): TalentHardSkillsEntity {
        return new TalentHardSkillsEntity({
            id: null,
            hardSkillId,
            userDetailsId,
        });
    }

    public toObject(): {
        id: string | null;
        hardSkillId: string;
        userDetailsId: string | null;
    } {
        return {
            id: this.id as string,
            hardSkillId: this.hardSkillId,
            userDetailsId: this.userDetailsId,
        };
    }

    public toNewObject(): {
        hardSkillId: string;
        userDetailsId: string | null;
    } {
        return {
            hardSkillId: this.hardSkillId,
            userDetailsId: this.userDetailsId,
        };
    }
}

export { TalentHardSkillsEntity };
