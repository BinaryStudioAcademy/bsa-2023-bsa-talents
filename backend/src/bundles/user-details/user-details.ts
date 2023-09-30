import { logger } from '~/common/packages/packages.js';

import { EmailService } from '../email/email.js';
import { talentBadgeService } from '../talent-badges/talent-badges.js';
import { talentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.js';
import { UserDetailsController } from './user-details.controller.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserDetailsRepository } from './user-details.repository.js';
import { UserDetailsService } from './user-details.service.js';

const emailService = new EmailService();
const userDetailsRepository = new UserDetailsRepository(UserDetailsModel);
const userDetailsService = new UserDetailsService({
    userDetailsRepository,
    talentBadgeService,
    talentHardSkillsService,
    emailService,
});
const userDetailsController = new UserDetailsController(
    logger,
    userDetailsService,
);

export { userDetailsController, userDetailsRepository, userDetailsService };
export { UserDetailsModel } from './user-details.model.js';
