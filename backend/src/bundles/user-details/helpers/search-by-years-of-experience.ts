import { type QueryBuilder } from 'objection';

import { type ValueOf } from '~/common/types/types.js';

import { YearsOfExperience } from '../enums/enums.js';
import { type UserDetailsModel } from '../user-details.model.js';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FIVE = 5;

const searchByYearsOfExperience = (
    subquery: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    yearsOfExperience: ValueOf<typeof YearsOfExperience>[] | undefined,
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
                        void subquery.orWhere('experienceYears', '<', ONE);
                        break;
                    }
                    case YearsOfExperience.FROM_1_TO_2: {
                        void subquery.orWhereBetween('experienceYears', [
                            ONE,
                            TWO,
                        ]);
                        break;
                    }
                    case YearsOfExperience.FROM_2_TO_3: {
                        void subquery.orWhereBetween('experienceYears', [
                            TWO,
                            THREE,
                        ]);
                        break;
                    }
                    case YearsOfExperience.FROM_3_TO_5: {
                        void subquery.orWhereBetween('experienceYears', [
                            THREE,
                            FIVE,
                        ]);
                        break;
                    }
                    case YearsOfExperience.MORE_THAN_5: {
                        void subquery.orWhere('experienceYears', '>', FIVE);
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
