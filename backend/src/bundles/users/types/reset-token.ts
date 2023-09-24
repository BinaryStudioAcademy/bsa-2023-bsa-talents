type ResetToken = {
    userId: string;
    resetToken: string | null;
    resetTokenExpiry: number | null;
    passwordHash?: string;
};

export { type ResetToken };
