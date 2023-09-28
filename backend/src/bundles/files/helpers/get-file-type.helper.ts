import { type ValueOf } from 'shared/build/index.js';

import { AllowedExtensions } from '~/common/plugins/file-upload/enums/file-extension.enum.js';
import { FileGroups } from '~/common/plugins/file-upload/enums/file-group.enum.js';

const allowedDocumentExtensions = new Set<ValueOf<typeof AllowedExtensions>>([
    AllowedExtensions.DOC,
    AllowedExtensions.DOCX,
    AllowedExtensions.PDF,
]);

const getFileType = (fileName: string): ValueOf<typeof FileGroups> => {
    const [extension]: [ValueOf<typeof AllowedExtensions>] = fileName
        .split('.')
        .reverse() as [ValueOf<typeof AllowedExtensions>];

    const isDocument = allowedDocumentExtensions.has(extension);
    return isDocument ? FileGroups.DOCUMENT : FileGroups.IMAGE;
};

export { getFileType };
