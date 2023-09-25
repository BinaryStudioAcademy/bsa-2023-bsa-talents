import { type QueryBuilder } from 'objection';

import { type ValueOf } from '~/common/types/types.js';

import { YearsOfExperience } from '../enums/enums.js';
import { type UserDetailsModel } from '../user-details.model.js';

const YEARS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FIVE: 5,
};

const searchByYearsOfExperience = (
    subquery: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    yearsOfExperience?: ValueOf<typeof YearsOfExperience>[],
): void => {
    if (yearsOfExperience) {
        void subquery.where((subquery) => {
            for (const years of yearsOfExperience) {
                switch (years) {
                    case YearsOfExperience.ANY: {
                        void subquery.orWhere('experienceYears', '>=', 0);
                        break;
                    }
                    case YearsOfExperience.LESS_THAN_1: {
                        void subquery.orWhere(
                            'experienceYears',
                            '<',
                            YEARS.ONE,
                        );
                        break;
                    }
                    case YearsOfExperience.FROM_1_TO_2: {
                        void subquery.orWhereBetween('experienceYears', [
                            YEARS.ONE,
                            YEARS.TWO,
                        ]);
                        break;
                    }
                    case YearsOfExperience.FROM_2_TO_3: {
                        void subquery.orWhereBetween('experienceYears', [
                            YEARS.TWO,
                            YEARS.THREE,
                        ]);
                        break;
                    }
                    case YearsOfExperience.FROM_3_TO_5: {
                        void subquery.orWhereBetween('experienceYears', [
                            YEARS.THREE,
                            YEARS.FIVE,
                        ]);
                        break;
                    }
                    case YearsOfExperience.MORE_THAN_5: {
                        void subquery.orWhere(
                            'experienceYears',
                            '>',
                            YEARS.FIVE,
                        );
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });
    }
};

export { searchByYearsOfExperience };
