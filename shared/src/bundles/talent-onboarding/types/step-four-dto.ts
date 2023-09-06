type StepFourDto = {
    photoId?: {
        size: number;
        uri: string;
    };
    fullName: string;
    phoneNumber: string;
    linkedinProfile: string;
    cv: {
        name: string;
        size: number;
        uri?: string;
    };
};

export { type StepFourDto };
