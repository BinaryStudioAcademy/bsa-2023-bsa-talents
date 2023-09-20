type MessageRecord = {
    message: string;
    createdAt?: string;
};

type ChatData = {
    talentId: string;
    talentName: string;
    talentAvatar?: string;
    data: MessageRecord[] | null;
};

export { type ChatData, type MessageRecord };
