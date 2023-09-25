import {
    Button,
    Grid,
    Input,
    Loader,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    debounce,
    getValidClassNames,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { CandidateProfile } from '~/bundles/talent-onboarding/components/components.js';

import { EmployeeFilters, SortingDropdown } from '../components/components.js';
import { actions as employerActions } from '../store/employers.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { type UserDetailsSearchUsersRequestDto } from '../types/types.js';
import styles from './styles.module.scss';

const FIELDS: [
    keyof EmployeesFiltersDto,
    keyof EmployeesFiltersDto,
    ...(keyof EmployeesFiltersDto)[],
] = [
    'searchType',
    'searchValue',
    'isSearchActiveCandidatesOnly',
    'jobTitle',
    'yearsOfExperience',
    'hardSkills',
    'userBsaCharacteristics',
    'userBsaProject',
    'location',
    'englishLevel',
    'employmentType',
    'sortBy',
];

const SEND_DELAY = 2000;
const Candidates: React.FC = () => {
    const { dataStatus, filters, filteredCandidates } = useAppSelector(
        ({ employer }) => ({
            dataStatus: employer.dataStatus,
            filters: employer.filters,
            filteredCandidates: employer.filteredCandidates,
        }),
    );

    const { watch, control, getValues, reset } =
        useAppForm<EmployeesFiltersDto>({
            defaultValues: filters,
        });

    const watchedValues = watch(FIELDS);
    const dispatch = useAppDispatch();
    const [isFilterOpened, setIsFilterOpened] = useState(false);

    const searchCandidates = useCallback(
        (resolvedFilters: EmployeesFiltersDto): void => {
            const editedValues: UserDetailsSearchUsersRequestDto = {
                ...resolvedFilters,
                hardSkills: resolvedFilters.hardSkills.map(
                    (skill) => skill.value,
                ),
            };
            void dispatch(employerActions.searchCandidates(editedValues));
        },
        [dispatch],
    );

    const debouncedDispatch = useMemo(
        () => debounce(searchCandidates, SEND_DELAY),
        [searchCandidates],
    );

    useEffect(() => {
        const editedValues: EmployeesFiltersDto = getValues();

        if (JSON.stringify(editedValues) !== JSON.stringify(filters)) {
            void dispatch(employerActions.setFilters(editedValues));
            debouncedDispatch(editedValues, (filters) => filters);
        }
    }, [debouncedDispatch, dispatch, filters, getValues, watchedValues]);

    const handleFiltersClick = useCallback(() => {
        setIsFilterOpened(!isFilterOpened);
    }, [isFilterOpened]);

    useEffect(() => {
        const valuesfromForm: EmployeesFiltersDto = getValues();
        const editedValues: UserDetailsSearchUsersRequestDto = {
            ...valuesfromForm,
            hardSkills: valuesfromForm.hardSkills.map((skill) => skill.value),
        };
        void dispatch(employerActions.searchCandidates(editedValues));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid className={styles.searchPageWrapper}>
            <Grid className={styles.mainContent}>
                <Grid>
                    <Typography variant="h4" className={styles.pageTitle}>
                        Candidates
                    </Typography>
                </Grid>
                <Grid className={styles.searchFilterWrapper}>
                    <Input
                        name="searchValue"
                        control={control}
                        errors={{}}
                        type="search"
                    />
                    <Button
                        className={getValidClassNames(
                            styles.filtersButton,
                            isFilterOpened
                                ? styles.filtersButtonActive
                                : styles.filtersButtonNotActive,
                        )}
                        onClick={handleFiltersClick}
                        label={'Filters'}
                    />
                </Grid>
                <Grid className={styles.optionsWrapper}>
                    <RadioGroup
                        name={'searchType'}
                        control={control}
                        row={true}
                        options={[
                            { value: 'Basic search', label: 'Basic search' },
                            {
                                value: 'Full-text search',
                                label: 'Full-text search',
                            },
                        ]}
                    />
                    <SortingDropdown
                        control={control}
                        reset={reset}
                        name="sortBy"
                        placeholder="Sort results"
                    />
                </Grid>

                {dataStatus == DataStatus.PENDING ? (
                    <Loader />
                ) : (
                    <Grid
                        className={getValidClassNames(
                            styles.searchResults,
                            isFilterOpened ? styles.searchResultsHidden : '',
                        )}
                    >
                        {filteredCandidates.map((candidate) => (
                            <CandidateProfile
                                key={candidate.id}
                                isProfileCard
                                candidateData={candidate}
                            />
                        ))}
                    </Grid>
                )}
            </Grid>
            <Grid
                className={getValidClassNames(
                    styles.filters,
                    isFilterOpened ? styles.filtersActive : '',
                )}
            >
                <EmployeeFilters control={control} reset={reset} />
                <Button
                    className={getValidClassNames(
                        styles.filtersButton,
                        styles.showResultsButton,
                        isFilterOpened
                            ? styles.filtersButtonActive
                            : styles.filtersButtonNotActive,
                    )}
                    onClick={handleFiltersClick}
                    label={'Show results'}
                />
            </Grid>
        </Grid>
    );
};

export { Candidates };
