import { type Entity } from '~/common/types/types.js';

import { type ContactsProperties } from './types/types.js';

class ContactsEntity implements Entity {
    private 'id': string | null;

    private 'talentId': string;

    private 'companyId': string;

    private constructor({ id, talentId, companyId }: ContactsProperties) {
        this.id = id;
        this.talentId = talentId;
        this.companyId = companyId;
    }

    public static initialize({
        id,
        talentId,
        companyId,
    }: ContactsProperties): ContactsEntity {
        return new ContactsEntity({
            id,
            talentId,
            companyId,
        });
    }

    public static initializeNew({
        talentId,
        companyId,
    }: ContactsProperties): ContactsEntity {
        return new ContactsEntity({
            id: null,
            talentId,
            companyId,
        });
    }

    public toObject(): ContactsProperties {
        return {
            id: this.id as string,
            talentId: this.talentId,
            companyId: this.companyId,
        };
    }

    public toNewObject(): ContactsProperties {
        return {
            id: null,
            talentId: this.talentId,
            companyId: this.companyId,
        };
    }
}

export { ContactsEntity };
