import { type HeadCell } from '~/bundles/common/components/components.js';

const HiringTableColumnNames = [
    {
        label: 'Talent',
        value: 'talentFullName',
    },
    {
        label: 'Company',
        value: 'companyName',
    },
    {
        label: 'Talent email',
        value: 'talentEmail',
    },
    {
        label: 'Talent phone',
        value: 'talentPhone',
    },
    {
        label: 'Employer',
        value: 'employerFullName',
    },
    {
        label: 'Employer position',
        value: 'employerPosition',
    },
    {
        label: 'Company/Employer email',
        value: 'companyEmail',
    },
    {
        label: 'Date of hiring',
        value: 'hiredTime',
    },
] as HeadCell[];

export { HiringTableColumnNames };
