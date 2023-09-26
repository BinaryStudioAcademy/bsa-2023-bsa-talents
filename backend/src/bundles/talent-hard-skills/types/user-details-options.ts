import { type HardSkillsService } from '~/bundles/hard-skills/hard-skills.service.js';
import { type TalentBadgeService } from '~/bundles/talent-badges/talent-badge.service.js';
import { type UserDetailsRepository } from '~/bundles/user-details/user-details.repository.js';

import { type TalentHardSkillsService } from '../talent-hard-skills.service.js';

type UserDetailsOptions = {
    userDetailsRepository: UserDetailsRepository;
    talentBadgeService: TalentBadgeService;
    talentHardSkillsService: TalentHardSkillsService;
    hardSkillsService: HardSkillsService;
};

export { type UserDetailsOptions };
