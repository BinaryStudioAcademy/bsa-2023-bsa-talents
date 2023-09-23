import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { HiringInfoApiPath } from './enums/enums.js';
import { type HiringInfoService } from './hiring-info.service.js';
import {
    type HiringInfoCreateDto,
    type HiringInfoFindRequestDto,
    type HiringInfoUpdateDto,
} from './types/types.js';
import { hiringInfoCreateValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Hiring info:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          talentId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          companyId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          isApproved:
 *            type: boolean
 *          status:
 *            type: string
 *          isHired:
 *            type: boolean
 *          profileName:
 *            type: string
 *          salaryExpectation:
 *            type: number
 *          hiredSalary:
 *            type: number
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

 */
class HiringInfoController extends ControllerBase {
    private hiringInfoService: HiringInfoService;

    public constructor(logger: Logger, hiringInfoService: HiringInfoService) {
        super(logger, ApiPath.USER_DETAILS);

        this.hiringInfoService = hiringInfoService;

        this.addRoute({
            path: HiringInfoApiPath.ROOT,
            method: 'POST',
            validation: {
                body: hiringInfoCreateValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: HiringInfoCreateDto;
                    }>,
                ),
        });

        this.addRoute({
            path: HiringInfoApiPath.ROOT,
            method: 'PATCH',
            validation: {
                body: hiringInfoCreateValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: HiringInfoUpdateDto;
                    }>,
                ),
        });

        this.addRoute({
            path: HiringInfoApiPath.$ID,
            method: 'GET',
            handler: (options) => {
                return this.findByTalentIdCompanyId(
                    options as ApiHandlerOptions<{
                        params: HiringInfoFindRequestDto;
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
            body: HiringInfoCreateDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.hiringInfoService.create(options.body),
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
            body: HiringInfoUpdateDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.hiringInfoService.update(options.body),
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

    private async findByTalentIdCompanyId(
        options: ApiHandlerOptions<{
            params: HiringInfoFindRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { talentId, companyId } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.hiringInfoService.findByTalentIdCompanyId(
                talentId,
                companyId,
            ),
        };
    }
}

export { HiringInfoController };
