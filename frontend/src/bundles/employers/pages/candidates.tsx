import {
    Button,
    Grid,
    Input,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { EmployeeFilters } from '../components/components.js';
import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
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

const Candidates: React.FC = () => {
    const { watch, control, getValues } = useAppForm<EmployeesFiltersDto>({
        defaultValues: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
    });

    const watchedValues = watch(FIELDS);
    const dispatch = useAppDispatch();
    const [isFilterOpened, setIsFilterOpened] = useState(false);
    useEffect(() => {
        const editedValues = getValues();
        void dispatch(employerActions.searchCandidates(editedValues));
    }, [dispatch, getValues, watchedValues]);

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
                <Grid
                    className={getValidClassNames(
                        styles.searchResults,
                        isFilterOpened ? styles.searchResultsHidden : '',
                    )}
                >
                    Search results
                </Grid>
            </Grid>
            <Grid
                className={getValidClassNames(
                    styles.filters,
                    isFilterOpened ? styles.filtersActive : '',
                )}
            >
                <EmployeeFilters control={control} />
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
