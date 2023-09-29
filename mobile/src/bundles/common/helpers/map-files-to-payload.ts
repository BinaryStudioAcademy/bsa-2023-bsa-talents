import { type FileUploadResponse } from 'shared/build/index.js';

import { type UserDetailsGeneralCustom } from '~/bundles/common/types/types';

const mapFilesToPayload = ({
    payload,
    files,
}: {
    payload: UserDetailsGeneralCustom;
    files: FileUploadResponse;
}): UserDetailsGeneralCustom => {
    if (files.companyLogo) {
        payload.companyLogoId = files.companyLogo.id;
    }

    if (files.rn) {
        payload.photoId = files.rn.id;
    }

    if (files.cv) {
        payload.cvId = files.cv.id;
    }

    return payload;
};

export { mapFilesToPayload };
