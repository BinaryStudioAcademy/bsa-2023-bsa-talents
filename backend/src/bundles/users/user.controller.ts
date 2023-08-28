import { type UserService } from '~/bundles/users/user.service.js';
import { type UserGetCurrentUserRequestDto } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { ControllerBase } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

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

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.getCurrentUser(
                    options as ApiHandlerOptions<{
                        body: UserGetCurrentUserRequestDto;
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

    private async getCurrentUser(
        options: ApiHandlerOptions<{
            body: UserGetCurrentUserRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findByToken(options.body.token),
        };
    }
}

export { UserController };
