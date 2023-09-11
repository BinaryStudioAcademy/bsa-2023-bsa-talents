import { type BSABadgesService } from '~/bundles/bsa-badges/bsa-badges.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ApiHandlerResponse } from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { BSABadgeApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      BSABadge:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          type:
 *            type: string
 *          name:
 *            type: string
 *          maxScore:
 *            type: number
 */
class BSABadgesController extends ControllerBase {
    private bsaBadgesService: BSABadgesService;

    public constructor(logger: Logger, bsaBadgesService: BSABadgesService) {
        super(logger, ApiPath.BSA_BADGES);

        this.bsaBadgesService = bsaBadgesService;

        this.addRoute({
            path: BSABadgeApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
    }

    /**
     * @swagger
     * /bsa-badges/:
     *    get:
     *      tags: [BSA Badges]
     *      description: Returns an array of BSA Badges
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
     *                  $ref: '#/components/schemas/BSABadge'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        const badges = await this.bsaBadgesService.findAll();

        return {
            status: HttpCode.OK,
            payload: badges,
        };
    }
}

export { BSABadgesController };
