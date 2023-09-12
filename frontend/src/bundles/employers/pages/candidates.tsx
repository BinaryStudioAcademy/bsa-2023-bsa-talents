import {
    Grid,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useEffect,
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

    useEffect(() => {
        const editedValues = getValues();
        void dispatch(employerActions.searchCandidates(editedValues));
    }, [dispatch, getValues, watchedValues]);

    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.mainContent}>
                <Grid>
                    <Typography variant="h4" className={styles.pageTitle}>
                        Candidates
                    </Typography>
                </Grid>
                <Input
                    name="searchValue"
                    control={control}
                    errors={{}}
                    type="search"
                />
                Search results
            </Grid>
            <EmployeeFilters control={control} />
        </Grid>
    );
};

export { Candidates };
