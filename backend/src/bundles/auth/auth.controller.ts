import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

class AuthController extends ControllerBase {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      tags: [Auth]
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  token:
     *                    type: string
     */
    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(options.body),
        };
    }
    /**
     * @swagger
     * /auth/sign-in:
     *    post:
     *      tags: [Auth]
     *      description: Sign in user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  token:
     *                    type: string
     */
    private async signIn(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.authService.signIn(options.body),
        };
    }
}

export { AuthController };
