type ContactsCVStepDto = {
    photo: File | null;
    fullName: string;
    phone: string;
    linkedinLink: string;
    cv: File | null;
    photoUrl?: string | null;
    cvUrl?: string | null;
    cvName?: string;
};

export { type ContactsCVStepDto };
