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
 *      ChatMessage:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *            description: The unique identifier for the chat message.
 *          senderId:
 *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *            description: The ID of the message sender.
 *          receiverId:
 *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *            description: The ID of the message receiver.
 *          chatId:
 *            format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *            description: The ID of the chat to which the message belongs.
 *          message:
 *            type: string
 *            description: The content of the chat message.
 *          isRead:
 *            type: boolean
 *            description: Indicates whether the message has been read (true) or not (false).
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

    /**
     * @swagger
     * /chat-messages/:
     *   get:
     *     tags:
     *       - "Chat Message"
     *     description: Retrieves all chat messages
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 $ref: '#/components/schemas/ChatMessage'
     */
    private async getAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.findAll(),
        };
    }

    /**
     * @swagger
     * /chat-messages/{chatId}:
     *   get:
     *     tags:
     *       - "Chat Message"
     *     description: Retrieves all chat messages for a specific chat by chatId
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: chatId
     *         in: path
     *         description: The ID of the chat to retrieve messages for.
     *         required: true
     *         schema:
     *           format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *           type: string
     *     responses:
     *       200:
     *         description: Successful retrieval of chat messages
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 $ref: '#/components/schemas/ChatMessage'
     */
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

    /**
     * @swagger
     * /chat-messages/:
     *   post:
     *     tags:
     *       - "Chat Message"
     *     description: Creates a new chat message
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: Chat message creation object
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ChatMessagesCreateRequestDto'
     *     responses:
     *       200:
     *         description: Successful creation of a chat message
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ChatMessage'
     * components:
     *   schemas:
     *     ChatMessagesCreateRequestDto:
     *       type: object
     *       properties:
     *         senderId:
     *           format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *           type: string
     *           description: The ID of the sender.
     *         receiverId:
     *           format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *           type: string
     *           description: The ID of the receiver.
     *         chatId:
     *           format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *           type: string
     *           description: The ID of the chat.
     *         message:
     *           type: string
     *           description: The message content.
     *
     */
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

    /**
     * @swagger
     * /chat-messages/{messageId}:
     *   patch:
     *     tags:
     *       - "Chat Message"
     *     description: Marks a chat message as read by messageId
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: messageId
     *         in: path
     *         description: The ID of the chat message to mark as read.
     *         required: true
     *         schema:
     *           format: uuid # Example: '550e8400-e29b-41d4-a716-446655440000'
     *           type: string
     *     responses:
     *       200:
     *         description: Successful marking of a chat message as read
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ChatMessage'
     */
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
