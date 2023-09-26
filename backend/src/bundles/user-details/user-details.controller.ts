import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { UserDetailsApiPath } from './enums/enums.js';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsDenyRequestDto,
    type UserDetailsFindByUserIdRequestDto,
    type UserDetailsFindShortByRoleRequestDto,
    type UserDetailsSearchUsersRequestDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsService } from './user-details.service.js';
import {
    userDetailsCreateValidationSchema,
    userDetailsDenyValidationSchema,
    userDetailsSearchValidationSchema,
    userDetailsUpdateValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      UserDetails:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          userId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          isApproved:
 *            type: boolean
 *          deniedReason:
 *            type: string
 *          isHired:
 *            type: boolean
 *          profileName:
 *            type: string
 *          salaryExpectation:
 *            type: number
 *          hiredSalary:
 *            type: number
 *          jobTitle:
 *            type: string
 *          location:
 *            type: string
 *          experienceYears:
 *            type: number
 *          employmentType:
 *            type: array
 *            items:
 *              type: string
 *          description:
 *            type: string
 *          englishLevel:
 *            type: string
 *          notConsidered:
 *            type: array
 *            items:
 *              type: string
 *          preferredLanguages:
 *            type: array
 *            items:
 *              type: string
 *          projectLinks:
 *            type: array
 *            items:
 *              type: string
 *          photoId:
 *            type: string
 *          fullName:
 *            type: string
 *          phone:
 *            type: string
 *          linkedinLink:
 *            type: string
 *          companyName:
 *            type: string
 *          companyLogoId:
 *            type: string
 *          companyWebsite:
 *            type: string
 *          employerPosition:
 *            type: string
 *          cvId:
 *            type: string
 *          talentBadges:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *                score:
 *                  type: number
 *                level:
 *                  type: string
 *                isShown:
 *                  type: boolean
 *                badgeId:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *                userDetailsId:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *                userId:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *          talentHardSkills:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *                hardSkillId:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *                userDetailsId:
 *                  format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *                  type: string
 *      ShortUserDetails:
 *        type: object
 *        properties:
 *          userId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          photoUrl:
 *            type: string
 *          fullName:
 *            type: string
 */
class UserDetailsController extends ControllerBase {
    private userDetailsService: UserDetailsService;

    public constructor(logger: Logger, userDetailsService: UserDetailsService) {
        super(logger, ApiPath.USER_DETAILS);

        this.userDetailsService = userDetailsService;

        this.addRoute({
            path: UserDetailsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: userDetailsCreateValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: UserDetailsCreateRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.ROOT,
            method: 'PATCH',
            validation: {
                body: userDetailsUpdateValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: UserDetailsUpdateRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.APPROVE,
            method: 'PATCH',
            handler: (options) =>
                this.approve(
                    options as ApiHandlerOptions<{
                        params: UserDetailsFindByUserIdRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.DENY,
            method: 'PATCH',
            validation: {
                body: userDetailsDenyValidationSchema,
            },
            handler: (options) =>
                this.deny(
                    options as ApiHandlerOptions<{
                        params: UserDetailsFindByUserIdRequestDto;
                        body: UserDetailsDenyRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.ROOT,
            method: 'GET',
            validation: {
                query: userDetailsSearchValidationSchema,
            },
            handler: (options) =>
                this.searchUsers(
                    options as ApiHandlerOptions<{
                        query: UserDetailsSearchUsersRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.$ID,
            method: 'GET',
            handler: (options) => {
                return this.findByUserId(
                    options as ApiHandlerOptions<{
                        params: UserDetailsFindByUserIdRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: UserDetailsApiPath.SHORT,
            method: 'GET',
            handler: (options) => {
                return this.findShort(
                    options as ApiHandlerOptions<{
                        query: UserDetailsFindShortByRoleRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: UserDetailsApiPath.FULL,
            method: 'GET',
            handler: (options) => {
                return this.findFull(
                    options as ApiHandlerOptions<{
                        params: UserDetailsFindByUserIdRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: UserDetailsApiPath.PUBLISH,
            method: 'PATCH',
            handler: (options) => {
                return this.publish(
                    options as ApiHandlerOptions<{
                        params: UserDetailsFindByUserIdRequestDto;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /user-details:
     *    post:
     *      tags:
     *        - User Details
     *      description: Updates a user's details
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: User detail update object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/UserDetailsCreateRequestDto'
     *            examples:
     *              example:
     *                value:
     *                  userId: '550e8400-e29b-41d4-a716-446655440000'
     *                  profileName: 'Lee Swagger'
     *                  fullName: 'qwerty'
     *      responses:
     *         200:
     *           description: Successful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 $ref: '#/components/schemas/UserDetails'
     * components:
     *   schemas:
     *      UserDetailsCreateRequestDto:
     *        type: object
     *        properties:
     *          userId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *            required: true
     *          profileName:
     *            type: string
     *          salaryExpectation:
     *            type: number
     *          hiredSalary:
     *            type: number
     *          jobTitle:
     *            type: string
     *          location:
     *            type: string
     *          experienceYears:
     *            type: number
     *          employmentType:
     *            type: array
     *            items:
     *              type: string
     *          description:
     *            type: string
     *          englishLevel:
     *            type: string
     *          notConsidered:
     *            type: array
     *            items:
     *              type: string
     *          preferredLanguages:
     *            type: array
     *            items:
     *              type: string
     *          projectLinks:
     *            type: array
     *            items:
     *              type: string
     *          photoId:
     *            type: string
     *          fullName:
     *            type: string
     *            required: true
     *          phone:
     *            type: string
     *          linkedinLink:
     *            type: string
     *          companyName:
     *            type: string
     *          companyLogoId:
     *            type: string
     *          companyWebsite:
     *            type: string
     *          employerPosition:
     *            type: string
     *          cvId:
     *            type: string
     *          talentBadges:
     *            type: array
     *            items:
     *              type: string
     *          talentHardSkills:
     *            type: array
     *            items:
     *              type: string
     */
    private async create(
        options: ApiHandlerOptions<{
            body: UserDetailsCreateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.create(options.body),
        };
    }

    /**
     * @swagger
     * /user-details:
     *    patch:
     *      tags:
     *        - User Details
     *      description: Updates a user's details
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: User detail update object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/UserDetailsUpdateRequestDto'
     *            examples:
     *              example-step-1:
     *                value:
     *                  userId: '550e8400-e29b-41d4-a716-446655440000'
     *                  profileName: 'Lee Swagger'
     *                  salaryExpectation: 6500
     *                  jobTitle: 'JS Developer'
     *                  location: 'Guam'
     *                  experienceYears: 5
     *                  employmentType: ['Freelance/Projects']
     *                  description: 'description'
     *              example-step-3:
     *                value:
     *                  userId: '550e8400-e29b-41d4-a716-446655440000'
     *                  englishLevel: ''
     *                  notConsidered: ''
     *                  preferredLanguages: ''
     *                  projectLinks: ''
     *              example-step-4:
     *                value:
     *                  userId: '550e8400-e29b-41d4-a716-446655440000'
     *                  photoId: ''
     *                  fullName: ''
     *                  phone: ''
     *                  linkedinLink: ''
     *                  cvId: ''
     *      responses:
     *         200:
     *           description: Successful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 $ref: '#/components/schemas/UserDetails'
     * components:
     *   schemas:
     *      UserDetailsUpdateRequestDto:
     *        type: object
     *        properties:
     *          id:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *          userId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *          isHired:
     *            type: boolean
     *          profileName:
     *            type: string
     *          salaryExpectation:
     *            type: number
     *          hiredSalary:
     *            type: number
     *          jobTitle:
     *            type: string
     *          location:
     *            type: string
     *          experienceYears:
     *            type: number
     *          employmentType:
     *            type: array
     *            items:
     *              type: string
     *          description:
     *            type: string
     *          englishLevel:
     *            type: string
     *          notConsidered:
     *            type: array
     *            items:
     *              type: string
     *          preferredLanguages:
     *            type: array
     *            items:
     *              type: string
     *          projectLinks:
     *            type: array
     *            items:
     *              type: string
     *          photoId:
     *            type: string
     *          fullName:
     *            type: string
     *          phone:
     *            type: string
     *          linkedinLink:
     *            type: string
     *          companyName:
     *            type: string
     *          companyLogoId:
     *            type: string
     *          companyWebsite:
     *            type: string
     *          employerPosition:
     *            type: string
     *          cvId:
     *            type: string
     *          talentBadges:
     *            type: array
     *            items:
     *              type: string
     *          talentHardSkills:
     *            type: array
     *            items:
     *              type: string
     */
    private async update(
        options: ApiHandlerOptions<{
            body: UserDetailsUpdateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.update(options.body),
        };
    }

    /**
     * @swagger
     * /user-details:
     *    get:
     *      tags:
     *        - User Details
     *      description: Search for user details based on criteria
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: query
     *          name: sortBy
     *          schema:
     *            type: string
     *          description: Search query to sort users (optional)
     *        - in: query
     *          name: searchValue
     *          schema:
     *            type: string
     *          description: Search query to filter by user's full name (optional)
     *        - in: query
     *          name: isBaseSearch
     *          schema:
     *            type: boolean
     *          description: Determines whether search type is base or extended
     *        - in: query
     *          name: isSearchActiveCandidatesOnly
     *          schema:
     *            type: boolean
     *          description: Filter by active status (optional)
     *        - in: query
     *          name: jobTitle
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          description: Filter by job title (optional)
     *        - in: query
     *          name: yearsOfExperience
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          description: Filter by years of experience (optional)
     *        - in: query
     *          name: hardSkills
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          style: form
     *          explode: true
     *          description: Filter by hard skills (optional)
     *        - in: query
     *          name: BSABadges
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          style: form
     *          explode: true
     *          description: Filter by BSA badges (optional)
     *        - in: query
     *          name: location
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          description: Filter by location (optional)
     *        - in: query
     *          name: englishLevel
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          description: Filter by English level (optional)
     *        - in: query
     *          name: employmentType
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          style: form
     *          explode: true
     *          description: Filter by employment type (optional)
     *        - in: query
     *          name: userBsaCharacteristics
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          style: form
     *          explode: true
     *          description: Filter by userBsaCharacteristics (optional)
     *        - in: query
     *          name: userBsaProject
     *          schema:
     *            type: array
     *            items:
     *              type: string
     *          style: form
     *          explode: true
     *          description: Filter by userBsaProject (optional)
     *      responses:
     *         200:
     *           description: Successful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/UserDetails'
     */

    private async searchUsers(
        options: ApiHandlerOptions<{
            query: UserDetailsSearchUsersRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const searchResult = await this.userDetailsService.searchUsers(
            options.query,
        );

        return {
            status: HttpCode.OK,
            payload: searchResult,
        };
    }

    /**
     * @swagger
     * /user-details/short:
     *    get:
     *      tags: [User Details]
     *      description: Returns short users details by user role
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: query
     *          name: userType
     *          required: true
     *          description: The role to filter users by.
     *          schema:
     *            type: string
     *            enum:
     *              - talent
     *              - employer
     *          example: talent
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                   $ref: '#/components/schemas/ShortUserDetails'
     */

    private async findShort(
        options: ApiHandlerOptions<{
            query: UserDetailsFindShortByRoleRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userType } = options.query;

        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.findShortByRole(userType),
        };
    }

    private async findFull(
        options: ApiHandlerOptions<{
            params: UserDetailsFindByUserIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.findFullInfoByUserId(userId),
        };
    }

    /**
     * @swagger
     * /user-details/{userId}:
     *    get:
     *      tags: [User Details]
     *      description: Returns user details by user ID
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: User ID to fetch details for
     *          schema:
     *            type: string
     *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/UserDetails'
     */

    private async findByUserId(
        options: ApiHandlerOptions<{
            params: UserDetailsFindByUserIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.findByUserId(userId),
        };
    }

    /**
     * @swagger
     * /user-details/{userId}/deny:
     *   patch:
     *     tags:
     *       - User Details
     *     description: Deny user's details
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: User ID to fetch details for
     *          schema:
     *            type: string
     *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *     requestBody:
     *       description: User detail deny object
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserDetailsDenyRequestDto'
     *           examples:
     *             default:
     *               value:
     *                 deniedReason: 'Write here reasons'
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: boolean
     * components:
     *   schemas:
     *     UserDetailsDenyRequestDto:
     *       type: object
     *       properties:
     *         deniedReason:
     *           type: string
     */

    private async deny(
        options: ApiHandlerOptions<{
            params: UserDetailsFindByUserIdRequestDto;
            body: UserDetailsDenyRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.deny(userId, options.body),
        };
    }

    /**
     * @swagger
     * /user-details/{userId}/approve:
     *    patch:
     *      tags: [User Details]
     *      description: Approve user's details
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: User ID to fetch details for
     *          schema:
     *            type: string
     *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *               type: boolean
     */

    private async approve(
        options: ApiHandlerOptions<{
            params: UserDetailsFindByUserIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.approve(userId),
        };
    }

    /**
     * @swagger
     * /user-details/{userId}/publish:
     *    patch:
     *      tags: [User Details]
     *      description: Publishes users data and returns publish time
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: User ID to publish data
     *          schema:
     *            type: string
     *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: string
     *                example: '2023-09-12T12:34:56.789Z'
     */

    private async publish(
        options: ApiHandlerOptions<{
            params: UserDetailsFindByUserIdRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { userId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.publish({ userId }),
        };
    }
}

export { UserDetailsController };
