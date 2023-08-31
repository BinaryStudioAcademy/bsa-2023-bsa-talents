import { logger } from '~/common/packages/packages.js';

import { UserDetailsController } from './user-details.controller.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserDetailsRepository } from './user-details.repository.js';
import { UserDetailsService } from './user-details.service.js';

const userDetailsRepository = new UserDetailsRepository(UserDetailsModel);
const userDetailsService = new UserDetailsService(userDetailsRepository);
const userDetailsController = new UserDetailsController(
    logger,
    userDetailsService,
);

export { userDetailsController, userDetailsService };
