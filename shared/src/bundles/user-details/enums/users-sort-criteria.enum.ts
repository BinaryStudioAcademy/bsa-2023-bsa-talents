const UserSortCriteria = {
    SALARY_ASCENDING: {
        label: 'Salary | Ascending',
        column: 'salary_expectation',
        direction: 'asc',
    },
    SALARY_DESCENDING: {
        label: 'Salary | Descending',
        column: 'salary_expectation',
        direction: 'desc',
    },
    EXPERIENCE_ASCENDING: {
        label: 'Salary | Ascending',
        column: 'experience_years',
        direction: 'asc',
    },
    EXPERIENCE_DESCENDING: {
        label: 'Salary | Descending',
        column: 'experience_years',
        direction: 'desc',
    },
    NEWEST: { label: 'Newest', column: 'created_at', direction: 'asc' },
    OLDEST: { label: 'Oldest', column: 'created_at', direction: 'desc' },
} as const;

//TODO change labels according to UI requirements

export { UserSortCriteria };
