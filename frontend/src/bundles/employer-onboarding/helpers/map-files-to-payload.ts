import { type FileUploadResponse } from 'shared/build/index.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';

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

    if (files.employerPhoto) {
        payload.photoId = files.employerPhoto.id;
    }

    if (files.cv) {
        payload.cvId = files.cv.id;
    }

    if (files.talentPhoto) {
        payload.photoId = files.talentPhoto.id;
    }

    return payload;
};

export { mapFilesToPayload };
