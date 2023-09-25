import { type UserDetailsEntity } from '~/bundles/user-details/user-details.entity.js';

type HiringInfoProperties = {
    id: string | null;
    talentId: string;
    companyId: string;
    hiredTime: Date | null;
    talent?: UserDetailsEntity | null;
    company?: UserDetailsEntity | null;
    talentPhone?: string;
    talentFullName?: string;
    talentEmail?: string;
    employerFullName?: string;
    employerPosition?: string;
    companyName?: string;
    companyEmail?: string;
};

export { type HiringInfoProperties };
