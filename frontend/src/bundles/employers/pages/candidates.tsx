/* eslint-disable no-console */
import {
    Grid,
    Input,
    PageLayout,
    Typography,
} from '~/bundles/common/components/components.js';
import { useAppForm, useEffect } from '~/bundles/common/hooks/hooks.js';

import { EmployeeFilters } from '../components/components.js';
import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../constants/constants.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import styles from './styles.module.scss';

const Candidates: React.FC = () => {
    const { control, watch } = useAppForm<EmployeesFiltersDto>({
        defaultValues: DEFAULT_EMPLOYEES_FILTERS_PAYLOAD,
    });

    const [
        activeSearchingOnly,
        jobTitles,
        userYearsOfExperience,
        hardSkills,
        userBsaCharacteristics,
        userBsaBadges,
        userBsaProject,
        userLocation,
        levelOfEnglish,
        employmentType,
        searchValue,
    ] = watch([
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
        'searchValue',
    ]);

    useEffect(() => {
        console.log(activeSearchingOnly);
        console.log(jobTitles);
        console.log(userYearsOfExperience);
        console.log(hardSkills);
        console.log(userBsaCharacteristics);
        console.log(userBsaBadges);
        console.log(userBsaProject);
        console.log(userLocation);
        console.log(levelOfEnglish);
        console.log(employmentType);
        console.log(searchValue);

        //TODO: call here dispatch method for filtering candidates with passing all those fields
    }, [
        jobTitles,
        hardSkills,
        activeSearchingOnly,
        userYearsOfExperience,
        userBsaCharacteristics,
        userBsaBadges,
        userBsaProject,
        userLocation,
        levelOfEnglish,
        employmentType,
        searchValue,
    ]);

    return (
        <PageLayout isOnline={true} avatarUrl="">
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
        </PageLayout>
    );
};

export { Candidates };
