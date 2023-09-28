type UserLMSDataDto = {
    userId: string; // JSON
    talent: string; // JSON
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: string; // JSON
    projectCoachesFeedback: string; // JSON
    hrFeedback: string; // JSON
    project: string; // JSON
};

export { type UserLMSDataDto };
