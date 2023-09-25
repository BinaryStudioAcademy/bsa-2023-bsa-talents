import { type ValueOf } from 'shared/build/index.js';

import { AllowedExtensions } from '~/common/plugins/file-upload/enums/file-extension.enum.js';
import { FileGroups } from '~/common/plugins/file-upload/enums/file-group.enum.js';

const AllowedDocumentExtensions = new Set([
    AllowedExtensions.DOC,
    AllowedExtensions.DOCX,
    AllowedExtensions.PDF,
]);

const getFileType = (fileName: string): ValueOf<typeof FileGroups> => {
    const [extension] = fileName.split('.').reverse();

    const isDocument = AllowedDocumentExtensions.has(
        extension as 'pdf' | 'docx' | 'doc',
    );
    return isDocument ? FileGroups.DOCUMENT : FileGroups.IMAGE;
};

export { getFileType };
