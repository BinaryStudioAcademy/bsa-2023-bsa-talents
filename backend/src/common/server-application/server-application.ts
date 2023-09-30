import { authController } from '~/bundles/auth/auth.js';
import { bsaBadgesController } from '~/bundles/bsa-badges/bsa-badges.js';
import { chatMessagesController } from '~/bundles/chat-messages/chat-messages.js';
import { contactsController } from '~/bundles/contacts/contacts.js';
import { fileController } from '~/bundles/files/files.js';
import { hardSkillsController } from '~/bundles/hard-skills/hard-skills.js';
import { hiringInfoController } from '~/bundles/hiring-info/hiring-info.js';
import { proxyLinkPreviewController } from '~/bundles/proxy-link-preview/proxy-link-preview.js';
import { userDetailsController } from '~/bundles/user-details/user-details.js';
import { userController } from '~/bundles/users/users.js';
import { config, database, logger } from '~/common/packages/packages.js';

import { ServerAppApiBase } from './server-app-api-base.js';
import { ServerAppBase } from './server-app-base.js';

const apiV1 = new ServerAppApiBase(
    'v1',
    config,
    ...authController.routes,
    ...userController.routes,
    ...contactsController.routes,
    ...userDetailsController.routes,
    ...fileController.routes,
    ...hardSkillsController.routes,
    ...bsaBadgesController.routes,
    ...hiringInfoController.routes,
    ...chatMessagesController.routes,
    ...proxyLinkPreviewController.routes,
);
const serverApp = new ServerAppBase({
    config,
    logger,
    database,
    apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './types/types.js';
