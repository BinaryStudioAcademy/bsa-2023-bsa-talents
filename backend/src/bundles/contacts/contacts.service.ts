import { ErrorMessage } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type ContactsRepository } from './contacts.repository.js';
import {
    type ContactsCreateRequestDto,
    type ContactsFindRequestDto,
    type ContactsResponseDto,
} from './types/types.js';

class ContactsService implements Service {
    private contactsRepository: ContactsRepository;

    public constructor(contactsRepository: ContactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    public async find(payload: ContactsFindRequestDto): Promise<boolean> {
        const contact = await this.contactsRepository.find({ ...payload });

        return !!contact;
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(
        payload: ContactsCreateRequestDto,
    ): Promise<ContactsResponseDto> {
        const hasSharedContact = await this.contactsRepository.find(payload);

        if (hasSharedContact) {
            throw new HttpError({
                message: ErrorMessage.CONTACT_ALREADY_SHARED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const newContact = await this.contactsRepository.create(payload);

        return {
            ...newContact.toObject(),
        };
    }

    public update(): Promise<ContactsResponseDto> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { ContactsService };
