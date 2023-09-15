import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentHardSkillsEntity } from './talent-hard-skills.entity.js';
import { type TalentHardSkillsModel } from './talent-hard-skills.model.js';
import {
    type TalentHardSkill,
    type TalentHardSkillUpdate,
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

    public async update({
        userDetailsId,
        talentHardSkills,
    }: TalentHardSkillUpdate): Promise<void> {
        const existingIds = await this.talentHardSkillsModel
            .query()
            .where({ userDetailsId: userDetailsId })
            .select('id');

        const existingIdsArray = existingIds.map((entry) => entry.id);

        for (const existingId of existingIdsArray) {
            if (!talentHardSkills.includes(existingId)) {
                await this.talentHardSkillsModel
                    .query()
                    .delete()
                    .where({ id: existingId })
                    .execute();
            }
        }

        for (const incomingId of talentHardSkills) {
            if (!existingIdsArray.includes(incomingId)) {
                await this.talentHardSkillsModel
                    .query()
                    .insert({
                        hardSkillId: incomingId,
                        userDetailsId: userDetailsId,
                    })
                    .execute();
            }
        }
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentHardSkillsRepository };
