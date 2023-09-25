type UserLMSDataDto = {
    userId: string;
    english: string;
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: string;
    projectCoachesFeedback: string;
    hrFeedback: string;
    project: string;
};

export { type UserLMSDataDto };
