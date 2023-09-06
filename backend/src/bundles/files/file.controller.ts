import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';
import { ApiPath, FileApiPath } from 'shared/build/index.js';

import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/types/types.js';
import { ControllerBase } from '~/common/packages/packages.js';
import { uploadFile } from '~/common/plugins/plugins.js';

import { type FileService } from './file.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      File:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          url:
 *            type: string
 *            format: url
 *          filename:
 *            type: string
 *          etag:
 *            type: string
 * */
class FileController extends ControllerBase {
    private fileService: FileService;

    public constructor(logger: Logger, fileService: FileService) {
        super(logger, ApiPath.FILES);

        this.fileService = fileService;

        this.addRoute({
            path: FileApiPath.UPLOAD,
            preHandler: uploadFile.single('document'),
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

    /**
     * @swagger
     * /file/upload:
     *    post:
     *      tags: [File]
     *      description: Uploads a file to S3 bucket and saves details to database
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Request body with file
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                file:
     *                  type: buffer
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/File'
     */
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
