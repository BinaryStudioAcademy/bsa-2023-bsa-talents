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
    type UserDetailsApproveRequestDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsService } from './user-details.service.js';
import {
    userDetailsApproveValidationSchema,
    userDetailsUpdateValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
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
            path: UserDetailsApiPath.UPDATE,
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
            validation: {
                body: userDetailsApproveValidationSchema,
            },
            handler: (options) =>
                this.approve(
                    options as ApiHandlerOptions<{
                        body: UserDetailsApproveRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /user-details/update:
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
     *              $ref: '#/components/schemas/UserDetailsRequestDto'
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
     *      UserDetailsRequestDto:
     *        type: object
     *        properties:
     *          userId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *            required: true
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
     *   securitySchemes:
     *     bearerAuth: # Define the JWT security scheme
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
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
     * /user-details/approve:
     *    patch:
     *      tags:
     *        - User Details
     *      description: Approves a user's details
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: User detail update object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/UserDetailsApproveRequestDto'
     *            examples:
     *              example-approve:
     *                value:
     *                  userId: '550e8400-e29b-41d4-a716-446655440000'
     *                  isApproved: true
     *              example-denied:
     *                value:
     *                  userId: '5a4b4ee2-7089-4c27-88d0-9e5e60ccf0dd'
     *                  isApproved: false
     *                  deniedReason: 'Incomplete information'
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
     *      UserDetailsApproveRequestDto:
     *        type: object
     *        properties:
     *          userId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *            required: true
     *          isApproved:
     *            type: boolean
     *            required: true
     *          deniedReason:
     *            type: string
     *   securitySchemes:
     *     bearerAuth: # Define the JWT security scheme
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     */
    private async approve(
        options: ApiHandlerOptions<{
            body: UserDetailsApproveRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.approve(options.body),
        };
    }
}

export { UserDetailsController };
