import { type ValueOf } from 'shared/build/index.js';

import { AllowedExtensions } from '~/common/plugins/file-upload/enums/file-extension.enum.js';
import { FileGroups } from '~/common/plugins/file-upload/enums/file-group.enum.js';

const ONE = 1;
const AllowedDocumentExtensions = new Set([
    AllowedExtensions.DOC,
    AllowedExtensions.DOCX,
    AllowedExtensions.PDF,
]);

const getFileType = (fileName: string): ValueOf<typeof FileGroups> => {
    const nameChunks = fileName.split('.');
    const extension = nameChunks[nameChunks.length - ONE];

    const isDocument = AllowedDocumentExtensions.has(extension);
    return isDocument ? FileGroups.DOCUMENT : FileGroups.IMAGE;
};

export { getFileType };
