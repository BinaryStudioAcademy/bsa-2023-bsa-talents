import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';
import { ApiPath, FileApiPath } from 'shared/build/index.js';

import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/types/types.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type FileService } from './file.service.js';

class FileController extends ControllerBase {
    private fileService: FileService;

    public constructor(logger: Logger, fileService: FileService) {
        super(logger, ApiPath.FILES);

        this.fileService = fileService;

        this.addRoute({
            path: FileApiPath.UPLOAD,
            method: 'POST',
            handler: (options) =>
                this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            file: MulterFile;
                        };
                    }>,
                ),
        });
    }

    private async upload(
        options: ApiHandlerOptions<{
            body: {
                file: MulterFile;
            };
        }>,
    ): Promise<ApiHandlerResponse> {
        const file = await this.fileService.create({
            file: options.body.file.buffer as Buffer,
            newFileName: options.body.file.originalname,
        });

        return {
            status: HttpCode.OK,
            payload: file,
        };
    }
}

export { FileController };
