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
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsService } from './user-details.service.js';
import {
    userDetailsCreateValidationSchema,
    userDetailsUpdateValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth: # Define the JWT security scheme
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
    }

    /**
     * @swagger
     * /user-details/:
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
     * /user-details/:
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
}

export { UserDetailsController };
