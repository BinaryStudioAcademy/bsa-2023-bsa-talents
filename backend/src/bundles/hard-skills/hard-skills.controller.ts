import { type HardSkillsService } from '~/bundles/hard-skills/hard-skills.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ApiHandlerResponse } from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { HardSkillsApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      HardSkill:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          name:
 *            type: string
 */
class HardSkillsController extends ControllerBase {
    private hardSkillsService: HardSkillsService;

    public constructor(logger: Logger, hardSkillsService: HardSkillsService) {
        super(logger, ApiPath.HARD_SKILLS);

        this.hardSkillsService = hardSkillsService;

        this.addRoute({
            path: HardSkillsApiPath.ROOT,
            method: 'GET',
            handler: () => {
                return this.findAll();
            },
        });
    }

    /**
     * @swagger
     * /hard-skills:
     *    get:
     *      tags: [Hard Skills]
     *      description: Returns an array of Hard Skills
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
     *                  $ref: '#/components/schemas/HardSkill'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        const skills = await this.hardSkillsService.findAll();

        return {
            status: HttpCode.OK,
            payload: skills,
        };
    }
}

export { HardSkillsController };
