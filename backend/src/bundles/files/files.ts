import { fileStorage, logger } from '~/common/packages/packages.js';

import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';

const fileRepository = new FileRepository(FileModel, fileStorage);
const fileService = new FileService(fileRepository);
const fileController = new FileController(logger, fileService);

export { FileModel } from './file.model.js';
export { fileController };
