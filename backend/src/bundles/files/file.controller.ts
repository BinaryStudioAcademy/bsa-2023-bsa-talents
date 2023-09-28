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
 *      FileUploadResponse:
 *        type: object
 *        properties:
 *          document:
 *            type: object
 *            properties:
 *               id:
 *                  type: string
 *                  format: uuid
 *               url:
 *                  type: string
 *          image:
 *            type: object
 *            properties:
 *               id:
 *                  type: string
 *                  format: uuid
 *               url:
 *                  type: string
 * */
class FileController extends ControllerBase {
    private fileService: FileService;

    public constructor(logger: Logger, fileService: FileService) {
        super(logger, ApiPath.FILES);

        this.fileService = fileService;

        this.addRoute({
            path: FileApiPath.UPLOAD,
            preHandler: uploadFile.fields([{ name: 'files' }]),
            method: 'POST',
            handler: (options) => {
                return this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            files: {
                                files: MulterFile[];
                            };
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
     *          multipart/form-data:
     *            schema:
     *              type: object
     *              properties:
     *                document:
     *                  type: string
     *                  format: binary
     *                image:
     *                  type: string
     *                  format: binary
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/FileUploadResponse'
     */
    private async upload(
        options: ApiHandlerOptions<{
            body: {
                files: {
                    files: MulterFile[];
                };
            };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { files } = options.body.files;

        const uploadResponse = await this.fileService.upload({
            files,
        });

        return {
            status: HttpCode.OK,
            payload: uploadResponse,
        };
    }
}

export { FileController };
