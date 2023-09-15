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
            preHandler: uploadFile.fields([
                { name: FileGroups.DOCUMENT, maxCount: 1 },
                { name: FileGroups.IMAGE, maxCount: 1 },
            ]),
            method: 'POST',
            handler: (options) => {
                return this.upload(
                    options as ApiHandlerOptions<{
                        body: {
                            files: {
                                document: MulterFile[];
                                image: MulterFile[];
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
                    document: MulterFile[];
                    image: MulterFile[];
                };
            };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { document, image } = options.body.files;
        const INDEX_ZERO = 0;

        const file = await this.fileService.upload({
            document: document[INDEX_ZERO],
            image: image[INDEX_ZERO],
        });

        return {
            status: HttpCode.OK,
            payload: file,
        };
    }
}

export { FileController };
