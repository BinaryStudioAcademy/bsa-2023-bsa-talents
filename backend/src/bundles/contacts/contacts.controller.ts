import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type ContactsService } from './contacts.service.js';
import { ContactsApiPath } from './enums/enums.js';
import {
    type ContactsCreateRequestDto,
    type ContactsFindRequestDto,
} from './types/types.js';
import { contactsCreateValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Contacts:
 *        type: object
 *        properties:
 *          id:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          talentId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          companyId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 */
class ContactsController extends ControllerBase {
    private contactsService: ContactsService;

    public constructor(logger: Logger, contactsService: ContactsService) {
        super(logger, ApiPath.CONTACTS);

        this.contactsService = contactsService;

        this.addRoute({
            path: ContactsApiPath.ROOT,
            method: 'POST',
            validation: {
                body: contactsCreateValidationSchema,
            },
            handler: (options) => {
                return this.create(
                    options as ApiHandlerOptions<{
                        body: ContactsCreateRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: ContactsApiPath.ROOT,
            method: 'GET',
            handler: (options) => {
                return this.findContact(
                    options as ApiHandlerOptions<{
                        query: ContactsFindRequestDto;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /contacts:
     *    post:
     *      tags:
     *        - Contacts
     *      description: Creates company and talent contact relation
     *      security:
     *        - bearerAuth: []
     *      requestBody:
     *        description: Contact create object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/ContactsCreateRequestDto'
     *            examples:
     *              example:
     *                value:
     *                  talentId: '550e8400-e29b-41d4-a716-446655440000'
     *                  companyId: 'd36dfd26-63af-4922-a8cf-04cb939e6d97'
     *      responses:
     *         200:
     *           description: Successful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Contacts'
     * components:
     *   schemas:
     *      ContactsCreateRequestDto:
     *        type: object
     *        properties:
     *          talentId:
     *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
     *            type: string
     *            required: true
     *          companyId:
     *            format: uuid #Example: 'd36dfd26-63af-4922-a8cf-04cb939e6d97'
     *            type: string
     *            required: true
     *
     */
    private async create(
        options: ApiHandlerOptions<{
            body: ContactsCreateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.contactsService.create(options.body),
        };
    }

    /**
     * @swagger
     * /contacts:
     *    get:
     *      tags: [Contacts]
     *      description: Returns true if contact is shared
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - in: query
     *          name: talentId
     *          schema:
     *            type: uuid
     *        - in: query
     *          name: companyId
     *          schema:
     *            type: uuid
     *      responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: boolean
     *
     */
    private async findContact(
        options: ApiHandlerOptions<{
            query: ContactsFindRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.contactsService.find(options.query),
        };
    }
}

export { ContactsController };
