import { type ImageFile } from './types.js';

type EmployerDataDto = {
    userId: string;
    companyWebsite: string;
    fullName: string;
    companyLogo: ImageFile;
    photo: ImageFile;
    employerPosition: string;
    companyName: string;
    location: string;
    description: string;
};

export { type EmployerDataDto };
