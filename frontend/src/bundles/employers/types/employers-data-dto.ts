import { type CompanyLogo } from './types.js';

type EmployerDataDto = {
    userId: string;
    companyWebsite: string;
    fullName: string;
    companyLogo: CompanyLogo;
    employerPosition: string;
    companyName: string;
    location: string;
    description: string;
};

export { type EmployerDataDto };
