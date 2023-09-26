import { ErrorMessage } from 'shared/build/index.js';

import { type Repository } from '~/common/types/types.js';

import { ContactsEntity } from './contacts.entity.js';
import { type ContactsModel } from './contacts.model.js';
import {
    type ContactsCreateRequestDto,
    type ContactsFindRequestDto,
} from './types/types.js';

class ContactsRepository implements Repository {
    private contactsModel: typeof ContactsModel;

    public constructor(contactsModel: typeof ContactsModel) {
        this.contactsModel = contactsModel;
    }

    public async find(
        payload: ContactsFindRequestDto,
    ): Promise<ContactsEntity | null> {
        const contact = await this.contactsModel
            .query()
            .findOne({ ...payload });

        if (!contact) {
            return null;
        }

        return ContactsEntity.initialize({
            id: contact.id,
            talentId: contact.talentId,
            companyId: contact.companyId,
        });
    }

    public findAll(): Promise<ContactsEntity[]> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(
        payload: ContactsCreateRequestDto,
    ): Promise<ContactsEntity> {
        const details = await this.contactsModel
            .query()
            .insert({
                ...payload,
            })
            .returning('*')
            .execute();

        return ContactsEntity.initialize({
            id: details.id,
            talentId: details.talentId,
            companyId: details.companyId,
        });
    }

    public update(): Promise<ContactsEntity> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { ContactsRepository };
