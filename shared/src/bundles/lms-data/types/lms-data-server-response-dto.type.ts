type LMSDataServerResponseDto = {
    talent: Talent;
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: LectureDetail[];
    projectCoachesFeedback: ProjectCoachesFeedback[];
    hrFeedback: HrFeedback;
    project: Project;
};

type HrFeedback = {
    result: Result;
    comments: string;
};

type Result = {
    points: string;
    comment: string;
};

type LectureDetail = {
    grade: number | null;
    name: string;
    lectureId: string;
};

type Project = {
    name: string | null;
    details: Details | null;
    repositoryUrl: string | null;
};

type Details = {
    en: string | null;
    ua: string | null;
};

type ProjectCoachesFeedback = {
    id: string;
    marks: Marks | Record<string, never>;
    feedback: string | null;
};

type Marks = {
    code_quality: number;
    result_of_work: number;
    result_quality: number;
    team_interaction: number;
    communication_result: number;
};

type Talent = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    english: string;
};

export { type LMSDataServerResponseDto };
