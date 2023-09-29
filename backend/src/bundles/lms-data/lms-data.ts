import { bsaBadgesService } from '../bsa-badges/bsa-badges.js';
import { talentBadgeService } from '../talent-badges/talent-badges.js';
import { userDetailsService } from '../user-details/user-details.js';
import { LMSDataModel } from './lms-data.model.js';
import { LMSDataRepository } from './lms-data.repository.js';
import { LMSDataService } from './lms-data.service.js';

const lmsDataRepository = new LMSDataRepository(LMSDataModel);

const lmsDataService = new LMSDataService({
    lmsDataRepository,
    bsaBadgesService: bsaBadgesService,
    talentBadgeService: talentBadgeService,
    userDetailsService: userDetailsService,
});

export { lmsDataService };
