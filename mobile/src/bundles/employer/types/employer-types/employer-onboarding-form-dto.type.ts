type EmployerOnboardingFormDto = {
    profilePhoto?: File | null;
    companyLogo?: File | null;
    fullName: string;
    position: string;
    linkedinLink?: string;
    companyName: string;
    companyWebsite: string;
    location: string;
    description: string;
};

export { type EmployerOnboardingFormDto };
