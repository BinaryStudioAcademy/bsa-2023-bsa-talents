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
        super(logger, '/file');

        this.fileService = fileService;

        this.addRoute({
            path: '/upload',
            method: 'POST',
            handler: (options) =>
                this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            filePath: string;
                            newFileName?: string;
                        };
                    }>,
                ),
        });
    }

    private async upload(
        options: ApiHandlerOptions<{
            body: {
                filePath: string;
                newFileName?: string;
            };
        }>,
    ): Promise<ApiHandlerResponse> {
        const file = await this.fileService.create({
            filePath: options.body.filePath,
            newFileName: options.body.newFileName,
        });

        return {
            status: HttpCode.OK,
            payload: file,
        };
    }
}

export { FileController };
