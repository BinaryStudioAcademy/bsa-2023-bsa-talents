import { UserSortCriteria } from '../enums/enums.js';

const createSortingUsersParameters = (
    value?: (typeof UserSortCriteria)[keyof typeof UserSortCriteria]['label'],
): { column: string; direction: 'asc' | 'desc' } => {
    let selectedSorting:
        | (typeof UserSortCriteria)[keyof typeof UserSortCriteria]
        | undefined;

    for (const key of Object.keys(UserSortCriteria)) {
        const item = UserSortCriteria[key as keyof typeof UserSortCriteria];
        if (item.label === value) {
            selectedSorting = item;
            break;
        }
    }

    return selectedSorting
        ? {
              column: selectedSorting.column,
              direction: selectedSorting.direction,
          }
        : {
              column: UserSortCriteria.NEWEST.column,
              direction: UserSortCriteria.NEWEST.direction,
          };
};

export { createSortingUsersParameters };
