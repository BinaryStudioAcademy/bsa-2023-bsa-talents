import { logger } from '~/common/packages/packages.js';

import { ProxyLinkPreviewController } from './proxy-link-preview.controller.js';
import { ProxyLinkPreviewService } from './proxy-link-preview.service.js';

const proxyLinkPreviewService = new ProxyLinkPreviewService();
const proxyLinkPreviewController = new ProxyLinkPreviewController(
    logger,
    proxyLinkPreviewService,
);

export { proxyLinkPreviewController, proxyLinkPreviewService };
