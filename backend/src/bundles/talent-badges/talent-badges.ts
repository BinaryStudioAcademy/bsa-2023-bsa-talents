import { TalentBadgeModel } from './talent-badge.model.js';
import { TalentBadgeRepository } from './talent-badge.repository.js';
import { TalentBadgeService } from './talent-badge.service.js';

const talentBadgeRepository = new TalentBadgeRepository(TalentBadgeModel);
const talentBadgeService = new TalentBadgeService(talentBadgeRepository);

export { TalentBadgeModel } from './talent-badge.model.js';
export { talentBadgeService };
