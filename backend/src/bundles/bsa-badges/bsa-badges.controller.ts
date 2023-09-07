import { type BSABadgesService } from '~/bundles/bsa-badges/bsa-badges.service.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ApiHandlerResponse } from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { BSABadgesApiPath } from './enums/enums.js';

class BSABadgesController extends ControllerBase {
    private bsaBadgesService: BSABadgesService;

    public constructor(logger: Logger, bsaBadgesService: BSABadgesService) {
        super(logger, ApiPath.BSA_BADGES);

        this.bsaBadgesService = bsaBadgesService;

        this.addRoute({
            path: BSABadgesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.bsaBadgesService.findAll(),
        };
    }
}

export { BSABadgesController };
