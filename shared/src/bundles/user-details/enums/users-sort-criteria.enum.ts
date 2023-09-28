const UserSortCriteria = {
    SALARY_ASCENDING: {
        label: 'salary ↑',
        value: 'salary_asc',
        column: 'salary_expectation',
        direction: 'asc',
    },
    SALARY_DESCENDING: {
        label: 'salary ↓',
        value: 'salary_desc',
        column: 'salary_expectation',
        direction: 'desc',
    },
    EXPERIENCE_ASCENDING: {
        label: 'experience ↑',
        value: 'experience_asc',
        column: 'experience_years',
        direction: 'asc',
    },
    EXPERIENCE_DESCENDING: {
        label: 'experience ↓',
        value: 'experience_desc',
        column: 'experience_years',
        direction: 'desc',
    },
    NEWEST: {
        label: 'newest',
        value: 'newest',
        column: 'published_at',
        direction: 'asc',
    },
    OLDEST: {
        label: 'oldest',
        value: 'oldest',
        column: 'published_at',
        direction: 'desc',
    },
} as const;

export { UserSortCriteria };
