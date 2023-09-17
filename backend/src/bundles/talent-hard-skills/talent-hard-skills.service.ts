import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type TalentHardSkillsEntity } from './talent-hard-skills.entity.js';
import { type TalentHardSkillsRepository } from './talent-hard-skills.repository.js';
import {
    type TalentHardSkill,
    type TalentHardSkillFind,
    type TalentHardSkillUpdate,
} from './types/types.js';

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
    ): Promise<TalentHardSkillFind> {
        return this.talentHardSkillsRepository.create(talentHardSkill);
    }

    public async update(
        talentHardSkillUpdate: TalentHardSkillUpdate,
    ): Promise<TalentHardSkillFind[]> {
        return this.talentHardSkillsRepository.update(talentHardSkillUpdate);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentHardSkillsService };
