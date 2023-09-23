import { logger } from '~/common/packages/packages.js';

import { talentBadgeService } from '../talent-badges/talent-badges.js';
import { talentHardSkillsService } from '../talent-hard-skills/talent-hard-skills.js';
import { HiringInfoController } from './hiring-info.controller.js';
import { HiringInfoModel } from './hiring-info.model.js';
import { HiringInfoRepository } from './hiring-info.repository.js';
import { HiringInfoService } from './hiring-info.service.js';

const hiringInfoRepository = new HiringInfoRepository(HiringInfoModel);
const hiringInfoService = new HiringInfoService(
    hiringInfoRepository,
    talentBadgeService,
    talentHardSkillsService,
);
const hiringInfoController = new HiringInfoController(
    logger,
    hiringInfoService,
);

export { hiringInfoController, hiringInfoRepository, hiringInfoService };
export { HiringInfoModel } from './hiring-info.model.js';
