import { logger } from '~/common/packages/packages.js';

import { talentBadgeService } from '../talent-badges/talent-badges.js';
import { UserDetailsController } from './user-details.controller.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserDetailsRepository } from './user-details.repository.js';
import { UserDetailsService } from './user-details.service.js';

const userDetailsRepository = new UserDetailsRepository(UserDetailsModel);
const userDetailsService = new UserDetailsService(
    userDetailsRepository,
    talentBadgeService,
);
const userDetailsController = new UserDetailsController(
    logger,
    userDetailsService,
);

export { userDetailsController, userDetailsService };
export { UserDetailsModel } from './user-details.model.js';
