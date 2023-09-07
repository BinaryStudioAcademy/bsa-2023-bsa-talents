import { type UserService } from '~/bundles/users/user.service.js';
import { type UserSearchUsersRequestDto } from '~/bundles/users/users.js';
import { ApiPath, ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { UsersApiPath } from './enums/enums.js';

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
            path: UsersApiPath.SEARCH,
            method: 'GET',
            handler: (options) =>
                this.searchUsers(
                    options as ApiHandlerOptions<{
                        query: UserSearchUsersRequestDto;
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

    private async searchUsers(
        options: ApiHandlerOptions<{
            query: UserSearchUsersRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const {
            search,
            jobTitle,
            location,
            isHired,
            hardSkills,
            experienceYears,
            englishLevel,
            employmentType,
            BSABadges,
        } = options.query;
        const searchCriteria: UserSearchUsersRequestDto = {
            ...(search !== undefined && { search }),
            ...(jobTitle !== undefined && { jobTitle }),
            ...(location !== undefined && { location }),
            ...(isHired !== undefined && { isHired }),
            ...(hardSkills !== undefined && { hardSkills }),
            ...(experienceYears !== undefined && { experienceYears }),
            ...(englishLevel !== undefined && { englishLevel }),
            ...(employmentType !== undefined && { employmentType }),
            ...(BSABadges !== undefined && { BSABadges }),
        };

        if (Object.keys(searchCriteria).length === 0) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: ErrorMessages.USER_NOT_FOUND,
            });
        }

        const searchResult = await this.userService.searchUsers(searchCriteria);

        return {
            status: HttpCode.OK,
            payload: searchResult,
        };
    }
}

export { UserController };
