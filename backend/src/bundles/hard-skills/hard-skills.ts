import { logger } from '~/common/packages/packages.js';

import { HardSkillsController } from './hard-skills.controller.js';
import { HardSkillsModel } from './hard-skills.model.js';
import { HardSkillsRepository } from './hard-skills.repository.js';
import { HardSkillsService } from './hard-skills.service.js';

const hardSkillsRepository = new HardSkillsRepository(HardSkillsModel);
const hardSkillsService = new HardSkillsService(hardSkillsRepository);
const hardSkillsController = new HardSkillsController(
    logger,
    hardSkillsService,
);

export { hardSkillsController, hardSkillsRepository, hardSkillsService };
export { HardSkillsModel } from './hard-skills.model.js';
