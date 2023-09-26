type HiringInfoProperties = {
    id: string | null;
    talentId: string;
    companyId: string;
    hiredTime: Date | null;
    talentPhone?: string;
    talentFullName?: string;
    talentEmail?: string;
    employerFullName?: string;
    employerPosition?: string;
    companyName?: string;
    companyEmail?: string;
};

export { type HiringInfoProperties };
