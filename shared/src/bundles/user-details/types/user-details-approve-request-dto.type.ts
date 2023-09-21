type UserDetailsApproveRequestDto = {
    userId: string;
    isApproved: boolean;
    deniedReason?: string;
};

export { type UserDetailsApproveRequestDto };
