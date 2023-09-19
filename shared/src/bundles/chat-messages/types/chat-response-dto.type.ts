type ChatResponseDto = {
    chatId: string;
    lastMessageCreatedAt: string;
    lastMessage: string;
    partner: {
        id: string;
        profileName: string | null;
        fullName: string | null;
        linkedinLink: string | null;
        companyName: string | null;
        companyLogoId: string | null;
        companyWebsite: string | null;
        avatar: {
            url: string;
            fileName: string;
            etag: string;
        } | null; // TODO: change to real photo url after testing file uploading
    };
};

export { type ChatResponseDto };
