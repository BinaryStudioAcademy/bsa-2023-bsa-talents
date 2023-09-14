import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type TalentHardSkillsEntity } from './talent-hard-skills.entity.js';
import { type TalentHardSkillsRepository } from './talent-hard-skills.repository.js';
import { type TalentHardSkill } from './types/types.js';

class TalentHardSkillsService implements Service {
    private talentHardSkillsRepository: TalentHardSkillsRepository;

    public constructor(talentHardSkillsRepository: TalentHardSkillsRepository) {
        this.talentHardSkillsRepository = talentHardSkillsRepository;
    }

    public findAll(): Promise<{ items: TalentHardSkillsEntity[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public find(): Promise<TalentHardSkillsEntity> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        talentHardSkill: TalentHardSkill,
    ): Promise<TalentHardSkillsEntity> {
        return await this.talentHardSkillsRepository.create(talentHardSkill);
    }

    public async update(
        talentHardSkill: TalentHardSkill,
    ): Promise<boolean | TalentHardSkillsEntity> {
        const hardSkill = await this.talentHardSkillsRepository.find({
            ...talentHardSkill,
        });

        const id = hardSkill?.toObject().id as string;

        return await (hardSkill
            ? this.talentHardSkillsRepository.deleteById({
                  ...hardSkill,
                  id,
              })
            : this.talentHardSkillsRepository.create({
                  ...talentHardSkill,
              }));
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentHardSkillsService };
