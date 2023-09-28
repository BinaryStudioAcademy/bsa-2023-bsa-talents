import { type FileModel } from '~/bundles/files/file.model.js';

import { type UserDetailsModel } from '../user-details.model.js';

type UserDetailsWithFiles = UserDetailsModel & {
    cv?: FileModel | null;
    photo?: FileModel | null;
    companyLogo?: FileModel | null;
};

export { type UserDetailsWithFiles };
