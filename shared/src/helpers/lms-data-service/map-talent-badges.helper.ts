import { BsaBadgesTypeEnum } from '../../bundles/common-data/badges/enums/bsa-badges-type.enum.js';
import { type BadgesItem } from '../../bundles/common-data/badges/types/badges-item.js';
import { type BadgesResponseDto } from '../../bundles/common-data/badges/types/badges-response-dto.js';
import {
    type LectureDetail,
    type LMSDataResponseDto,
    type Marks,
    type ProjectCoachesFeedback,
} from '../../bundles/lms-data/types/lms-data-response-dto.type.js';
import { type TalentBadgeCreate } from '../../bundles/talent-badges/types/talent-badge-create.js';
import { type ValueOf } from '../../types/value-of.type.js';

const MOCK_SCORE = 4;
const MAX_SCORE = 5;
const DECIMAL_PLACES = 2;

const getRandomScore = (): number => {
    const randomValue = MOCK_SCORE + Math.random() * (MAX_SCORE - MOCK_SCORE);
    return Number(randomValue.toFixed(DECIMAL_PLACES));
};

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number' && !Number.isNaN(value);
};

const findScoreForCommunicationAndTeam = (
    projectCoachesFeedback: ProjectCoachesFeedback[],
    property: keyof Marks,
): number => {
    let totalScore = 0;

    for (const week of projectCoachesFeedback) {
        totalScore += week.marks[property];
    }

    const averageScore = totalScore / projectCoachesFeedback.length;

    return isNumber(averageScore) ? averageScore : getRandomScore();
};

const findBestLectureScore = (
    lectureDetails: LectureDetail[],
): number | null => {
    if (lectureDetails.length === 0) {
        return null;
    }

    let bestLecture = lectureDetails[0];

    for (const lecture of lectureDetails) {
        if (lecture.grade > bestLecture.grade) {
            bestLecture = lecture;
        }
    }

    return bestLecture.grade;
};

const defaultShownBadges = {
    [BsaBadgesTypeEnum.ENGLISH_LEVEL]: true,
    [BsaBadgesTypeEnum.LECTURE_SCORE]: true,
    [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: false,
    [BsaBadgesTypeEnum.PROJECT_SCORE]: true,
    [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: false,
    [BsaBadgesTypeEnum.TEAM_SCORE]: false,
};

const isShown = (type: ValueOf<typeof BsaBadgesTypeEnum>): boolean => {
    return defaultShownBadges[type];
};

const getBadgeId = (
    bsaBadges: BadgesItem[],
    badgeType: ValueOf<typeof BsaBadgesTypeEnum>,
): string => {
    const badge = bsaBadges.find((badge) => badge.type === badgeType);
    return badge?.id ?? '';
};

const badgeTypeToLMSProperty = {
    [BsaBadgesTypeEnum.ENGLISH_LEVEL]: 'english',
    [BsaBadgesTypeEnum.LECTURE_SCORE]: 'averageLectureScore',
    [BsaBadgesTypeEnum.BEST_LECTURE_SCORE]: 'grade',
    [BsaBadgesTypeEnum.PROJECT_SCORE]: 'averageProjectScore',
    [BsaBadgesTypeEnum.COMMUNICATION_SCORE]: 'communication_result',
    [BsaBadgesTypeEnum.TEAM_SCORE]: 'team_interaction',
};

const mapTalentBadges = (
    userDetailsId: string,
    lmsData: LMSDataResponseDto,
    bsaBadges: BadgesResponseDto,
): TalentBadgeCreate[] => {
    return Object.keys(badgeTypeToLMSProperty).map((badgeType) => {
        const property =
            badgeTypeToLMSProperty[
                badgeType as keyof typeof badgeTypeToLMSProperty
            ];
        let score = null;
        let level = null;

        switch (badgeType) {
            case BsaBadgesTypeEnum.COMMUNICATION_SCORE:
            case BsaBadgesTypeEnum.TEAM_SCORE: {
                const averageScore = findScoreForCommunicationAndTeam(
                    lmsData.projectCoachesFeedback,
                    property as keyof Marks,
                );
                score = Number.isNaN(averageScore)
                    ? getRandomScore()
                    : averageScore;
                break;
            }
            case BsaBadgesTypeEnum.BEST_LECTURE_SCORE: {
                score = findBestLectureScore(lmsData.lectureDetails);
                break;
            }
            case BsaBadgesTypeEnum.ENGLISH_LEVEL: {
                score = null;
                level = lmsData[property as keyof LMSDataResponseDto] as string;
                break;
            }
            case BsaBadgesTypeEnum.LECTURE_SCORE:
            case BsaBadgesTypeEnum.PROJECT_SCORE: {
                score = lmsData[property as keyof LMSDataResponseDto] as number;
                isNumber(score) || (score = getRandomScore());
                break;
            }
        }

        return {
            userId: lmsData.userId,
            badgeId: getBadgeId(
                bsaBadges.items,
                badgeType as ValueOf<typeof BsaBadgesTypeEnum>,
            ),
            score,
            level,
            isShown: isShown(badgeType as ValueOf<typeof BsaBadgesTypeEnum>),
            userDetailsId,
        };
    });
};

export { mapTalentBadges };
