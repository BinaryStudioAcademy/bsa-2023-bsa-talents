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
 *      HiringInfo:
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
 *          firstContactTime:
 *            type: string
 *            example: '2023-09-12T12:34:56.789Z'
 *          hasSharedInfo:
 *            type: boolean
 *          sharedInfoTime:
 *            type: string
 *            example: '2023-09-12T12:34:56.789Z'
 *            nullable: true
 *          isHired:
 *            type: boolean
 *          hiredTime:
 *            type: string
 *            example: '2023-09-12T12:34:56.789Z'
 *            nullable: true
 *          hiredPosition:
 *            type: string
 *            nullable: true
 *          hiredSalary:
 *            type: number
 *            nullable: true
 *          isApproved:
 *            type: boolean
 *          status:
 *            type: string
 *            nullable: true
 *          fee:
 *            type: number
 *            nullable: true
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
 */
class HiringInfoController extends ControllerBase {
    private hiringInfoService: HiringInfoService;

    public constructor(logger: Logger, hiringInfoService: HiringInfoService) {
        super(logger, ApiPath.HIRING_INFO);

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
            method: 'GET',
            handler: () => {
                return this.findAll();
            },
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
     * /hiring-info:
     *    post:
     *      tags:
     *        - Hiring Info
     *      description: Creates company and talent hiring info
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Hiring info create object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/HiringInfoCreateRequestDto'
     *            examples:
     *              example:
     *                value:
     *                  talentId: '550e8400-e29b-41d4-a716-446655440000'
     *                  companyId: 'd36dfd26-63af-4922-a8cf-04cb939e6d97'
     *      responses:
     *         200:
     *           description: Successful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 $ref: '#/components/schemas/HiringInfo'
     * components:
     *   schemas:
     *      HiringInfoCreateRequestDto:
     *        type: object
     *        properties:
     *          talentId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *            required: true
     *          companyId:
     *            format: uuid #Example: 'd36dfd26-63af-4922-a8cf-04cb939e6d97'
     *            type: string
     *            required: true
     *
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
     * /hiring-info:
     *    get:
     *      tags: [Hiring Info]
     *      description: Returns all hiring info records
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/UserDetails'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.hiringInfoService.findAll(),
        };
    }

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
