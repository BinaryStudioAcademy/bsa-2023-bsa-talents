type EmployerOnboardingDto = {
    photo: File | null;
    fullName: string;
    position: string;
    companyName: string;
    companyWebsite: string;
    location: string;
    description: string;
    linkedInLink: string;
    companyLogo: File | null;
};

export { type EmployerOnboardingDto };