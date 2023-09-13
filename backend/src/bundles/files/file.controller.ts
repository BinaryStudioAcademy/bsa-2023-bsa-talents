import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';
import { ApiPath, FileApiPath } from 'shared/build/index.js';

import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/types/types.js';
import { ControllerBase } from '~/common/packages/packages.js';
import { FileGroups } from '~/common/plugins/file-upload/enums/file-group.enum.js';
import { uploadFile } from '~/common/plugins/plugins.js';

import { type FileService } from './file.service.js';
import { getUniqueName } from './helpers/get-unique-name.helper.js';

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
 * */
class FileController extends ControllerBase {
    private fileService: FileService;

    public constructor(logger: Logger, fileService: FileService) {
        super(logger, ApiPath.FILES);

        this.fileService = fileService;

        this.addRoute({
            path: FileApiPath.DOCUMENT,
            preHandler: uploadFile.single(FileGroups.DOCUMENT),
            method: 'POST',
            handler: (options) => {
                return this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            file: MulterFile;
                        };
                    }>,
                );
            },
        });

        this.addRoute({
            path: FileApiPath.IMAGE,
            preHandler: uploadFile.single(FileGroups.IMAGE),
            method: 'POST',
            handler: (options) => {
                return this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            file: MulterFile;
                        };
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /file/upload:
     *    post:
     *      tags: [File]
     *      description: Uploads a document or image to S3 bucket and saves details to database
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
        const { originalname, buffer } = options.body.file;
        const file = await this.fileService.create({
            file: buffer as Buffer,
            newFileName: getUniqueName(originalname),
        });

        return {
            status: HttpCode.OK,
            payload: JSON.stringify(file.id),
        };
    }
}

export { FileController };
