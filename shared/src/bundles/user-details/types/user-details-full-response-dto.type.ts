import { type UserDetailsResponseDto } from './types.js';

type File = {
    id: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    fileName: string;
    etag: string;
};

type UserDetailsFullResponseDto = UserDetailsResponseDto & {
    photo: File | null;
    companyLogo: File | null;
    cv: File | null;
};

export { type UserDetailsFullResponseDto };
