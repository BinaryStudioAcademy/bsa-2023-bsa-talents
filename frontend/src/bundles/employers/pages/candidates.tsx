import {
    Button,
    Grid,
    Input,
    Loader,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { EmployeeFilters } from '../components/components.js';
import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { debounce } from '../helpers/helpers.js';
import { actions as employerActions } from '../store/employers.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import styles from './styles.module.scss';

const FIELDS: [
    keyof EmployeesFiltersDto,
    keyof EmployeesFiltersDto,
    ...(keyof EmployeesFiltersDto)[],
] = [
    'searchType',
    'searchValue',
    'activeSearchingOnly',
    'jobTitles',
    'userYearsOfExperience',
    'hardSkills',
    'userBsaCharacteristics',
    'userBsaBadges',
    'userBsaProject',
    'userLocation',
    'levelOfEnglish',
    'employmentType',
];
const SEND_DELAY = 2000;
const Candidates: React.FC = () => {
    const { watch, control, getValues, reset } =
        useAppForm<EmployeesFiltersDto>({
            defaultValues: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
        });
    const { dataStatus, filters } = useAppSelector(({ employer }) => ({
        dataStatus: employer.dataStatus,
        filters: employer.filters,
    }));
    const watchedValues = watch(FIELDS);
    const dispatch = useAppDispatch();
    const [isFilterOpened, setIsFilterOpened] = useState(false);

    const dispatchAction = useCallback(
        (resolvedFilters: EmployeesFiltersDto): void => {
            void dispatch(employerActions.searchCandidates(resolvedFilters));
        },
        [dispatch],
    );

    const debouncedDispatch = useMemo(
        () => debounce(dispatchAction, SEND_DELAY),
        [dispatchAction],
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
                {dataStatus == DataStatus.PENDING ? (
                    <Loader />
                ) : (
                    <Grid
                        className={getValidClassNames(
                            styles.searchResults,
                            isFilterOpened ? styles.searchResultsHidden : '',
                        )}
                    >
                        Search results
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