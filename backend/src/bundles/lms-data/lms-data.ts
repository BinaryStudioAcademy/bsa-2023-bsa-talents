import { LMSDataModel } from './lms-data.model.js';
import { LMSDataRepository } from './lms-data.repository.js';
import { LMSDataService } from './lms-data.service.js';

const lmsDataRepository = new LMSDataRepository(LMSDataModel);
const lmsDataService = new LMSDataService(lmsDataRepository);

export { lmsDataService };
