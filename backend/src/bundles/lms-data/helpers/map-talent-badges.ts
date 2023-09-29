import { BsaBadgesTypeEnum } from 'shared/build/index.js';

import { type ValueOf } from '~/common/types/types.js';

import { defaultShownBadges } from '../constants/constants.js';
import { badgeTypeToLMSProperty } from '../mappers/mappers.js';
import {
    type BadgesItem,
    type BadgesResponseDto,
    type LectureDetail,
    type LMSDataResponseDto,
    type Marks,
    type ProjectCoachesFeedback,
    type TalentBadgeCreateDto,
} from '../types/types.js';
import { getRandomScore, isNumber } from './helpers.js';

const findScoreForCommunicationAndTeam = (
    projectCoachesFeedback: ProjectCoachesFeedback[],
    property: keyof Marks,
): number => {
    let totalScore = 0;
    let totalLenght = 0;

    for (const week of projectCoachesFeedback) {
        if (typeof week.marks[property] === 'number') {
            totalScore += week.marks[property];
            totalLenght++;
        }
    }

    const averageScore = totalScore / totalLenght;

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
        if (Number(lecture.grade) > Number(bestLecture.grade)) {
            bestLecture = lecture;
        }
    }

    return bestLecture.grade;
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

type TalentBadgeCreateBody = Omit<TalentBadgeCreateDto, 'id'>;

const mapTalentBadges = (
    userDetailsId: string,
    lmsData: LMSDataResponseDto,
    bsaBadges: BadgesResponseDto,
): TalentBadgeCreateBody[] => {
    return Object.keys(badgeTypeToLMSProperty).map((badgeType) => {
        const property =
            badgeTypeToLMSProperty[
                badgeType as unknown as keyof typeof badgeTypeToLMSProperty
            ];
        let score = null;
        let level = null;

        switch (badgeType) {
            case BsaBadgesTypeEnum.COMMUNICATION_SCORE:
            case BsaBadgesTypeEnum.TEAM_SCORE: {
                score = findScoreForCommunicationAndTeam(
                    lmsData.projectCoachesFeedback,
                    property as keyof Marks,
                );
                break;
            }
            case BsaBadgesTypeEnum.BEST_LECTURE_SCORE: {
                score = findBestLectureScore(lmsData.lectureDetails);
                break;
            }
            case BsaBadgesTypeEnum.ENGLISH_LEVEL: {
                score = null;
                level = lmsData.talent.english;
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
            userId: lmsData.talent.id,
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
