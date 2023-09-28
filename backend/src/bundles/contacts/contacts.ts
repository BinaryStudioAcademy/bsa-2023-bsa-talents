import { logger } from '~/common/packages/packages.js';

import { ContactsController } from './contacts.controller.js';
import { ContactsModel } from './contacts.model.js';
import { ContactsRepository } from './contacts.repository.js';
import { ContactsService } from './contacts.service.js';

const contactsRepository = new ContactsRepository(ContactsModel);
const contactsService = new ContactsService(contactsRepository);
const contactsController = new ContactsController(logger, contactsService);

export { contactsController, contactsRepository, contactsService };
export { ContactsModel } from './contacts.model.js';
