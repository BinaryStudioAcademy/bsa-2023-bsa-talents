import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentHardSkillsEntity } from './talent-hard-skills.entity.js';
import { type TalentHardSkillsModel } from './talent-hard-skills.model.js';
import {
    type TalentHardSkill,
    type TalentHardSkillDelete,
} from './types/types.js';

class TalentHardSkillsRepository implements Repository {
    private talentHardSkillsModel: typeof TalentHardSkillsModel;

    public constructor(talentHardSkillsModel: typeof TalentHardSkillsModel) {
        this.talentHardSkillsModel = talentHardSkillsModel;
    }

    public findAll(): Promise<TalentHardSkillsEntity[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        talentHardSkill: TalentHardSkill,
    ): Promise<TalentHardSkillsEntity> {
        const item = await this.talentHardSkillsModel
            .query()
            .insert({
                ...talentHardSkill,
            })
            .returning('*')
            .execute();

        return TalentHardSkillsEntity.initializeNew(item);
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<TalentHardSkillsEntity | null> {
        const skill = await this.talentHardSkillsModel
            .query()
            .findOne({ ...payload });

        return skill ? TalentHardSkillsEntity.initialize(skill) : null;
    }

    public update(): Promise<TalentHardSkillsEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async deleteById(
        talentHardSkill: TalentHardSkillDelete,
    ): Promise<boolean> {
        const rowsDeleted = await this.talentHardSkillsModel
            .query()
            .delete()
            .where({
                id: talentHardSkill.id,
                userDetailsId: talentHardSkill.userDetailsId,
            })
            .execute();

        return rowsDeleted > 0;
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentHardSkillsRepository };
