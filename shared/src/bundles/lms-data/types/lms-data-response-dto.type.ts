type LMSDataResponseDto = {
    userId: string;
    english: string;
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
    name: string;
    details: Details | null;
    repositoryUrl: string | null;
};

type Details = {
    en: string;
    ua: string;
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

export {
    type Details,
    type HrFeedback,
    type LectureDetail,
    type LMSDataResponseDto,
    type Marks,
    type Project,
    type ProjectCoachesFeedback,
    type Result,
};