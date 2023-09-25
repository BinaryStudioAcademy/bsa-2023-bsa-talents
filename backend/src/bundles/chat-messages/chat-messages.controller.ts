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
import { chatMessagesCreateValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      MessageResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid
 *            type: string
 *            description: The unique identifier for the chat message.
 *            example: '550e8400-e29b-41d4-a716-446655440000'
 *          senderId:
 *            format: uuid
 *            type: string
 *            description: The ID of the message sender.
 *            example: '550e8400-e29b-41d4-a716-446655440000'
 *          receiverId:
 *            format: uuid
 *            type: string
 *            description: The ID of the message receiver.
 *            example: '550e8400-e29b-41d4-a716-446655440000'
 *          chatId:
 *            format: uuid
 *            type: string
 *            description: The ID of the chat to which the message belongs.
 *            example: '550e8400-e29b-41d4-a716-446655440000'
 *          message:
 *            type: string
 *            description: The content of the chat message.
 *            example: 'Hello, how are you?'
 *          isRead:
 *            type: boolean
 *            description: Indicates whether the message has been read (true) or not (false).
 *            example: true
 *      ChatResponseDto:
 *        type: object
 *        properties:
 *          chatId:
 *            format: uuid
 *            type: string
 *            description: The unique identifier for the chat.
 *            example: '550e8400-e29b-41d4-a716-446655440000'
 *          lastMessageCreatedAt:
 *            type: string
 *            description: The timestamp of the last message in the chat.
 *            example: '2023-09-19T12:34:56Z'
 *          lastMessage:
 *            type: string
 *            description: The content of the last message in the chat.
 *            example: 'This is the last message in the chat.'
 *          partner:
 *            type: object
 *            $ref: '#/components/schemas/PartnerDto'
 *      PartnerDto:
 *        type: "object"
 *        properties:
 *          id:
 *            format: uuid
 *            type: string
 *            description: "The ID of the chat partner."
 *            example: "550e8400-e29b-41d4-a716-446655440000"
 *          profileName:
 *            type: string
 *            description: "The profile name of the chat partner (nullable)."
 *            example: "lee_swagger"
 *            nullable: true
 *          companyName:
 *            type: string
 *            description: "The company name of the chat partner (nullable)."
 *            example: "Lee Corp"
 *            nullable: true
 *          avatarUrl:
 *            type: string
 *            description: "The URL of the avatar image."
 *            example: "https://www.awss3.com/avatar/avatar.jpg"
 *            nullable: true
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
                this.getAllMessagesByChatId(
                    options as ApiHandlerOptions<{
                        params: { chatId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: ChatMessagesApiPath.CHATS_$USER_ID,
            method: 'GET',
            handler: (options) =>
                this.getAllChatsByUserId(
                    options as ApiHandlerOptions<{
                        params: { userId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: ChatMessagesApiPath.ROOT,
            method: 'POST',
            validation: {
                body: chatMessagesCreateValidationSchema,
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
     *     summary: Retrieve all chat messages
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
     *                 $ref: '#/components/schemas/MessageResponseDto'
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
     *     summary: Retrieves all chat messages for a specific chat by chatId
     *     description: Retrieves all chat messages for a specific chat by chatId
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: chatId
     *         in: path
     *         description: The ID of the chat to retrieve messages for.
     *         required: true
     *         schema:
     *           format: uuid
     *           type: string
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *     responses:
     *       200:
     *         description: Successful retrieval of chat messages
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 $ref: '#/components/schemas/MessageResponseDto'
     */
    private async getAllMessagesByChatId(
        options: ApiHandlerOptions<{
            params: { chatId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.findAllMessagesByChatId(
                options.params.chatId,
            ),
        };
    }

    /**
     * @swagger
     * /chat-messages/chats/{userId}:
     *   get:
     *     tags:
     *       - "Chat Message"
     *     summary: Retrieves all chats for a specific user by userId
     *     description: Retrieves all chats for a specific user by userId
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: userId
     *         in: path
     *         description: The ID of the user to retrieve chats for.
     *         required: true
     *         schema:
     *           format: uuid
     *           type: string
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *     responses:
     *       200:
     *         description: Successful retrieval of chats
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 $ref: '#/components/schemas/ChatResponseDto'
     */
    private async getAllChatsByUserId(
        options: ApiHandlerOptions<{
            params: { userId: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.chatMessagesService.findAllChatsByUserId(
                options.params.userId,
            ),
        };
    }

    /**
     * @swagger
     * /chat-messages/:
     *   post:
     *     tags:
     *       - "Chat Message"
     *     summary: Creates a new chat message
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
     *               $ref: '#/components/schemas/MessageResponseDto'
     *       409:
     *         description: Conflict - You already have this conversation
     *         content:
     *           application/json:
     *             example:
     *               errorType: COMMON
     *               message: You already have this conversation.
     *             schema:
     *               type: object
     *               properties:
     *                 errorType:
     *                   type: string
     *                   description: The type of error.
     *                 message:
     *                   type: string
     *                   description: The error message.
     * components:
     *   schemas:
     *     ChatMessagesCreateRequestDto:
     *       type: object
     *       properties:
     *         senderId:
     *           format: uuid
     *           type: string
     *           description: The ID of the message sender.
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *         receiverId:
     *           format: uuid
     *           type: string
     *           description: The ID of the message receiver.
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *         chatId:
     *           format: uuid
     *           type: string
     *           description: (Optional) The ID of the chat to which the message belongs.
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *         message:
     *           type: string
     *           description: The content of the chat message.
     *           example: 'Hello, how are you?'
     *       required:
     *         - senderId
     *         - receiverId
     *         - message
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
     * /chat-messages/read/{messageId}:
     *   patch:
     *     tags:
     *       - "Chat Message"
     *     summary: Marks a chat message as read by messageId
     *     description: Marks a chat message as read by specifying its unique messageId.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: messageId
     *         in: path
     *         description: The ID of the chat message to mark as read.
     *         required: true
     *         schema:
     *           format: uuid
     *           type: string
     *           example: '550e8400-e29b-41d4-a716-446655440000'
     *     responses:
     *       200:
     *         description: Successful marking of a chat message as read
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MessageResponseDto'
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
