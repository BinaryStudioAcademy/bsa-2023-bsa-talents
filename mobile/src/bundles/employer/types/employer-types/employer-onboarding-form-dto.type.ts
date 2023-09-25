type EmployerOnboardingFormDto = {
    photo: File | null;
    companyLogo: File | null;
    fullName: string;
    employerPosition: string;
    linkedinLink: string;
    companyName: string;
    companyWebsite: string;
    location: string;
    description: string;
};

export { type EmployerOnboardingFormDto };
