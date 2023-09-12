import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type ChatMessagesService } from './chat-messages.service.js';
import { ChatMessagesApiPath } from './enums/enums.js';
import { type ChatMessagesCreateRequestDto } from './types/types.js';
import { ChatMessagesCreateValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
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
 */
class ChatMessagesController extends ControllerBase {
    private chatMessagesService: ChatMessagesService;

    public constructor(
        logger: Logger,
        chatMessagesService: ChatMessagesService,
    ) {
        super(logger, ApiPath.CHAT_MESSAGES);

        this.chatMessagesService = chatMessagesService;

        this.addRoute({
            path: ChatMessagesApiPath.ROOT,
            method: 'GET',
            handler: () => this.getAll(),
        });

        this.addRoute({
            path: ChatMessagesApiPath.ROOT,
            method: 'POST',
            validation: {
                body: ChatMessagesCreateValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: ChatMessagesCreateRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatMessagesApiPath.$CHAT_ID,
            method: 'GET',
            handler: (options) =>
                this.getAllByChatId(
                    options as ApiHandlerOptions<{
                        params: { chatId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: ChatMessagesApiPath.READ_$MESSAGE_ID,
            method: 'PATCH',
            handler: (options) =>
                this.read(
                    options as ApiHandlerOptions<{
                        params: { messageId: string };
                    }>,
                ),
        });
    }

    private async getAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.findAll(),
        };
    }

    private async create(
        options: ApiHandlerOptions<{
            body: ChatMessagesCreateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.create(options.body),
        };
    }

    private async getAllByChatId(
        options: ApiHandlerOptions<{
            params: { chatId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.findAllByChatId(
                options.params.chatId,
            ),
        };
    }

    private async read(
        options: ApiHandlerOptions<{
            params: { messageId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.read(
                options.params.messageId,
            ),
        };
    }
}

export { ChatMessagesController };
