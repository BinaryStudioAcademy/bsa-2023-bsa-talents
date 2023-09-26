type EmployerOnboardingDto = {
    photo: File | null;
    companyLogo: File | null;
    photoUrl: string | null;
    companyLogoUrl: string | null;
    fullName: string;
    employerPosition: string;
    companyName: string;
    companyWebsite: string;
    location: string;
    description: string;
    linkedinLink: string;
};

export { type EmployerOnboardingDto };
