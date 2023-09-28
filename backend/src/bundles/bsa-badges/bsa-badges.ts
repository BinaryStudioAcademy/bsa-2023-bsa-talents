import { logger } from '~/common/packages/packages.js';

import { BSABadgesController } from './bsa-badges.controller.js';
import { BSABadgesModel } from './bsa-badges.model.js';
import { BSABadgesRepository } from './bsa-badges.repository.js';
import { BSABadgesService } from './bsa-badges.service.js';

const bsaBadgesRepository = new BSABadgesRepository(BSABadgesModel);
const bsaBadgesService = new BSABadgesService(bsaBadgesRepository);
const bsaBadgesController = new BSABadgesController(logger, bsaBadgesService);

export { bsaBadgesController, bsaBadgesRepository, bsaBadgesService };
export { BSABadgesModel } from './bsa-badges.model.js';
