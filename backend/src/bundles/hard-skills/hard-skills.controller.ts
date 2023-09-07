import { type HardSkillsService } from '~/bundles/hard-skills/hard-skills.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ApiHandlerResponse } from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { HardSkillsApiPath } from './enums/enums.js';

class HardSkillsController extends ControllerBase {
    private hardSkillsService: HardSkillsService;

    public constructor(logger: Logger, hardSkillsService: HardSkillsService) {
        super(logger, ApiPath.HARD_SKILLS);

        this.hardSkillsService = hardSkillsService;

        this.addRoute({
            path: HardSkillsApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.hardSkillsService.findAll(),
        };
    }
}

export { HardSkillsController };
