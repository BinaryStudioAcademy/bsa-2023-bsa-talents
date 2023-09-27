import joi from 'joi';

import { type ContactsCreateRequestDto } from '../types/types.js';

const contactsCreateValidationSchema = joi.object<
    ContactsCreateRequestDto,
    true
>({
    talentId: joi.string().trim().required(),
    companyId: joi.string().trim().required(),
});

export { contactsCreateValidationSchema };
