import { TalentHardSkillsModel } from './talent-hard-skills.model.js';
import { TalentHardSkillsRepository } from './talent-hard-skills.repository.js';
import { TalentHardSkillsService } from './talent-hard-skills.service.js';

const talentHardSkillsRepository = new TalentHardSkillsRepository(
    TalentHardSkillsModel,
);
const talentHardSkillsService = new TalentHardSkillsService(
    talentHardSkillsRepository,
);

export { talentHardSkillsService };
export { TalentHardSkillsModel } from './talent-hard-skills.model.js';
