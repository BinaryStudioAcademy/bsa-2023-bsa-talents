import { type UserService } from '~/bundles/users/user.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ControllerBase,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import { uploadFile } from '~/common/plugins/plugins.js';

import { UsersApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 */
class UserController extends ControllerBase {
    private userService: UserService;

    public constructor(logger: Logger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        //test file upload
        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'POST',
            preHandler: uploadFile.single('file'),
            handler: (options) =>
                this.upload(
                    options as ApiHandlerOptions<{
                        body: unknown;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /users/:
     *    get:
     *      tags: [Users]
     *      description: Returns an array of users
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    private upload(
        options: ApiHandlerOptions<{
            body: unknown;
        }>,
    ): ApiHandlerResponse {
        const uploadedFile = options.body;
        //options body returns undefined

        if (!uploadedFile) {
            return {
                status: 201,
                payload: {},
            };
        }
        return {
            status: 200,
            payload: {},
        };
    }
}

export { UserController };
