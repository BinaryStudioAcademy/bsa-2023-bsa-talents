import {
    UserDetailsApiPath,
    type UserDetailsRequestDto,
} from 'shared/build/index.js';

import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type UserDetailsService } from './user-details.service.js';

class UserDetailsController extends ControllerBase {
    private userDetailsService: UserDetailsService;

    public constructor(logger: Logger, userDetailsService: UserDetailsService) {
        super(logger, ApiPath.USER_DETAILS);

        this.userDetailsService = userDetailsService;

        this.addRoute({
            path: UserDetailsApiPath.UPDATE,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: UserDetailsRequestDto;
                    }>,
                ),
        });
    }

    private async update(
        options: ApiHandlerOptions<{
            body: UserDetailsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.update(options.body),
        };
    }
}

export { UserDetailsController };
