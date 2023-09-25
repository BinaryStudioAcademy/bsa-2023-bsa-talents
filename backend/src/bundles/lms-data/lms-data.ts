import { config } from '~/common/packages/config/config.js';

import { LMSDataModel } from './lms-data.model.js';
import { LMSDataRepository } from './lms-data.repository.js';
import { LMSDataService } from './lms-data.service.js';

const lmsDataRepository = new LMSDataRepository(LMSDataModel);
const lmsDataService = new LMSDataService(
    lmsDataRepository,
    config.ENV.LMS_DATA_SERVER.X_TOKEN,
);

export { lmsDataService };
