import { useForm } from 'react-hook-form';

import {
    Checkbox,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    CountryList,
    ExperienceYears,
    JobTitle,
} from '~/bundles/talent-onboarding/enums/enums.js';

import {
    BsaBadges,
    BsaCharacteristics,
    BsaProject,
} from '../../enums/enums.js';
import { type SelectOption } from '../../types/select-option.js';
import styles from './styles.module.scss';

const jobTitleOptions: SelectOption<string | number>[] = Object.values(
    JobTitle,
).map((title) => ({
    value: title,
    label: title,
}));

const yearsOfExperience = Object.values(ExperienceYears).map((experience) => ({
    value: experience,
    label: String(experience),
}));

const bsaCharacteristics = Object.values(BsaCharacteristics).map(
    (characteristic) => ({
        value: characteristic,
        label: characteristic,
    }),
);

const bsaBadges = Object.values(BsaBadges).map((characteristic) => ({
    value: characteristic,
    label: characteristic,
}));

const bsaProject = Object.values(BsaProject).map((project) => ({
    value: project,
    label: project,
}));

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));

const EmployeeFilters: React.FC = () => {
    const { control } = useForm({
        defaultValues: {
            jobTitles: [],
            userYearsOfExperience: [],
            userBsaCharacteristics: [],
            userBsaBadges: [],
            userBsaProject: [],
            userLocation: [],
        },
    });

    return (
        <Grid container className={styles.wrapper}>
            <Grid item>
                <Typography variant={'h6'} className={styles.title}>
                    Filters
                </Typography>
            </Grid>
            <Grid item>
                <Checkbox label="Active searching takents only" />
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Job Title'}
                    <Select
                        options={jobTitleOptions}
                        control={control}
                        name="jobTitles"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Years of experience'}
                    <Select
                        options={yearsOfExperience}
                        control={control}
                        name="userYearsOfExperience"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'BSA Characteristics'}
                    <Select
                        options={bsaCharacteristics}
                        control={control}
                        name="userBsaCharacteristics"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'BSA Badges'}
                    <Select
                        options={bsaBadges}
                        control={control}
                        name="userBsaBadges"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'BSA Project'}
                    <Select
                        options={bsaProject}
                        control={control}
                        name="userBsaProject"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Location'}
                    <Select
                        options={locationOptions}
                        control={control}
                        name="userLocation"
                        isMulti={true}
                    />
                </FormLabel>
            </Grid>
        </Grid>
    );
};

export { EmployeeFilters };
