import { type BsaBadgeStepBadgesTitle } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserDetailsCreateRequestDto } from '~/bundles/employer/types/types';

type BadgeName = ValueOf<typeof BsaBadgeStepBadgesTitle>;

type PikedTypes = Pick<
    UserDetailsCreateRequestDto, //TODO replace with user details type from shared
    | 'userId'
    | 'salaryExpectation'
    | 'jobTitle'
    | 'location'
    | 'experienceYears'
    | 'description'
    | 'englishLevel'
>;

type Data = {
    published: string;
    hardSkills: string[];
    badges: {
        label: BadgeName;
        value: string | number;
    }[];
};

type Candidate = PikedTypes & Data;

export { type Candidate };
