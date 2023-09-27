type HiringInfoFindResponseDto = {
    id: string | null;
    talentId: string;
    companyId: string;
    hiredTime: Date;
    talentPhone?: string;
    talentFullName?: string;
    talentEmail?: string;
    employerFullName?: string;
    employerPosition?: string;
    companyName?: string;
    companyEmail?: string;
};

export { type HiringInfoFindResponseDto };
