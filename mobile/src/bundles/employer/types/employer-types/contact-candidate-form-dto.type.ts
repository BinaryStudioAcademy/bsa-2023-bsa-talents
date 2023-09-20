type ContactCandidateFormDto = {
    saveAsTemplate: boolean;
    message: string;
    vacancyLinks: {
        url: string;
    }[];
};

export { type ContactCandidateFormDto };
