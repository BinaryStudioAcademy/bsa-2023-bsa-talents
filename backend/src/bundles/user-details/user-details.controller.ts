import {
    type UserDetailsApproveRequestDto,
    type UserDetailsUpdateRequestDto,
} from 'shared/build/index.js';
import {
    UserDetailsApiPath,
    userDetailsApproveValidationSchema,
    userDetailsUpdateValidationSchema,
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

    private async approve(
        options: ApiHandlerOptions<{
            body: UserDetailsApproveRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            // payload: await this.userDetailsService.approve(options.body),
            payload: await Promise.resolve(options.body),
        };
    }
}

export { UserDetailsController };
