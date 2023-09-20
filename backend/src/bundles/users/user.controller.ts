import { type UserService } from '~/bundles/users/user.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { UsersApiPath } from './enums/enums.js';
import { type UserGetLMSDataById } from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      RoleEnum:
 *        type: string
 *        enum:
 *          - talent
 *          - employer
 *          - admin
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          role:
 *            $ref: '#/components/schemas/RoleEnum'
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

        this.addRoute({
            path: UsersApiPath.LMS_DATA_BY_$ID,
            method: 'GET',
            handler: (options) => {
                return this.getLMSdataById(
                    options as ApiHandlerOptions<{
                        params: UserGetLMSDataById;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /users/:
     *    get:
     *      tags: [Users]
     *      description: Returns an array of users
     *      security:
     *        - bearerAuth: []
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

    private async getLMSdataById(
        options: ApiHandlerOptions<{
            params: UserGetLMSDataById;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.userService.findById(userId), // TODO: replace it with lsm-data service
        };
    }
}

export { UserController };
