type EmployerOnboardingDto = {
    photo: File | null;
    companyLogo: File | null;
    fullName: string;
    employerPosition: string;
    companyName: string;
    companyWebsite: string;
    location: string;
    description: string;
    linkedinLink: string;
    isApproved: boolean;
};

export { type EmployerOnboardingDto };
