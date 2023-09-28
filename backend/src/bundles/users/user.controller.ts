import { type LMSDataService } from '~/bundles/lms-data/lms-data.service.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type TalentBadgeService } from '../talent-badges/talent-badge.service.js';
import { UsersApiPath } from './enums/enums.js';
import {
    type UserGetLMSDataById,
    type UserGetTalentBadgesById,
} from './types/types.js';

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
 *      Result:
 *        type: object
 *        properties:
 *          points:
 *            type: string
 *          comment:
 *            type: string
 *
 *      HrFeedback:
 *        type: object
 *        properties:
 *          result:
 *            $ref: '#/components/schemas/Result'
 *          comments:
 *            type: string
 *
 *      LectureDetail:
 *        type: object
 *        properties:
 *          grade:
 *            type: number
 *            nullable: true
 *          name:
 *            type: string
 *          lectureId:
 *            type: string
 *
 *      Details:
 *        type: object
 *        properties:
 *          en:
 *            type: string
 *          ua:
 *            type: string
 *
 *      Project:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          details:
 *            $ref: '#/components/schemas/Details'
 *          repositoryUrl:
 *            type: string
 *            nullable: true
 *
 *      Marks:
 *        type: object
 *        properties:
 *          code_quality:
 *            type: number
 *          result_of_work:
 *            type: number
 *          result_quality:
 *            type: number
 *          team_interaction:
 *            type: number
 *          communication_result:
 *            type: number
 *
 *      ProjectCoachesFeedback:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          marks:
 *            $ref: '#/components/schemas/Marks'
 *          feedback:
 *            type: string
 *            nullable: true
 *
 *      LMSDataResponseDto:
 *        type: object
 *        properties:
 *          userId:
 *            type: string
 *          english:
 *            type: string
 *          averageProjectScore:
 *            type: number
 *            nullable: true
 *          averageLectureScore:
 *            type: number
 *            nullable: true
 *          lectureDetails:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/LectureDetail'
 *          projectCoachesFeedback:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ProjectCoachesFeedback'
 *          hrFeedback:
 *            $ref: '#/components/schemas/HrFeedback'
 *          project:
 *            $ref: '#/components/schemas/Project'
 */
class UserController extends ControllerBase {
    private userService: UserService;
    private lmsDataService: LMSDataService;
    private talentBadgeService: TalentBadgeService;

    public constructor({
        logger,
        userService,
        lmsDataService,
        talentBadgeService,
    }: {
        logger: Logger;
        userService: UserService;
        lmsDataService: LMSDataService;
        talentBadgeService: TalentBadgeService;
    }) {
        super(logger, ApiPath.USERS);

        this.userService = userService;
        this.lmsDataService = lmsDataService;
        this.talentBadgeService = talentBadgeService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            handler: () => {
                return this.findAll();
            },
        });

        this.addRoute({
            path: UsersApiPath.LMS_DATA_BY_$ID,
            method: 'GET',
            handler: (options) => {
                return this.getLMSDataById(
                    options as ApiHandlerOptions<{
                        params: UserGetLMSDataById;
                    }>,
                );
            },
        });

        this.addRoute({
            path: UsersApiPath.BSA_BADGES_BY_$ID,
            method: 'GET',
            handler: (options) => {
                return this.getTalentBadges(
                    options as ApiHandlerOptions<{
                        params: UserGetLMSDataById;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /users:
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

    /**
     * @swagger
     * /users/{userId}/lms-data:
     *    get:
     *      tags: [Users]
     *      description: Returns user LMS Data by user ID
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: User ID to fetch LMS data for
     *          schema:
     *            type: string
     *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                items:
     *                  $ref: '#/components/schemas/LMSDataResponseDto'
     */
    private async getLMSDataById(
        options: ApiHandlerOptions<{
            params: UserGetLMSDataById;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.lmsDataService.findByUserId(userId),
        };
    }

    private async getTalentBadges(
        options: ApiHandlerOptions<{
            params: UserGetTalentBadgesById;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.talentBadgeService.findAllByUserId(userId),
        };
    }
}

export { UserController };
