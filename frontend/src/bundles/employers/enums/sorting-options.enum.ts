const SortingOptions = {
    SALARY_ASC: { value: 'Salary | Ascending', label: 'salary ↑' },
    SALARY_DESC: { value: 'Salary | Descending', label: 'salary ↓' },
    EXPERIENCE_ASC: { value: 'Experience | Ascending', label: 'experience ↑' },
    EXPERIENCE_DESC: { value: 'Salary | Descending', label: 'experience ↓' },
    NEWEST: { value: 'Newest', label: 'newes' },
    OLDEST: { value: 'Oldest', label: 'oldest' },
} as const;

export { SortingOptions };
