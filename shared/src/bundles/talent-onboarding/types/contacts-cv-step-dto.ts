type ContactsCVStepDto = {
    photoId?: {
        size: number;
        uri: string;
    };
    fullName: string;
    phoneNumber: string;
    linkedinLink: string;
    cv: {
        name: string;
        size: number;
        uri?: string;
    };
};

export { type ContactsCVStepDto };
