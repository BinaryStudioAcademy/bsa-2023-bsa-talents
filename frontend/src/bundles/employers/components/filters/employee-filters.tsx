/* eslint-disable no-console */
import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Checkbox,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppForm,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import {
    CountryList,
    EmploymentType,
    ExperienceYears,
    JobTitle,
} from '~/bundles/talent-onboarding/enums/enums.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../../constants/constants.js';
import {
    BsaBadges,
    BsaCharacteristics,
    BsaProject,
} from '../../enums/enums.js';
import { type EmployeesFiltersDto } from '../../types/employees-filters-dto.js';
import { SkillsAutocomplete } from '../autocomplete/skills-autocomplete.js';
import styles from './styles.module.scss';

const jobTitleOptions = Object.values(JobTitle).map((title) => ({
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

const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type,
    label: type,
}));

const EmployeeFilters: React.FC = () => {
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
    ]);

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<EmployeesFiltersDto, 'employmentType'>,
            selectedValue: string,
        ) =>
            (): void => {
                const updatedValue = field.value.includes(selectedValue)
                    ? field.value.filter((item) => item !== selectedValue)
                    : [...field.value, selectedValue];
                field.onChange(updatedValue);
            },
        [],
    );

    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<EmployeesFiltersDto, 'employmentType'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<EmployeesFiltersDto>;
        }): React.ReactElement => {
            return (
                <Grid
                    container
                    spacing={2}
                    className={styles.checkboxContainer}
                >
                    {employmentTypeOptions.map((option) => (
                        <Grid
                            item
                            xs={6}
                            key={option.value}
                            className={styles['MuiGrid-item']}
                        >
                            <Checkbox
                                {...{
                                    onChange: field.onChange,
                                    onBlur: field.onBlur,
                                    name: field.name,
                                    value: field.value,
                                }}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isChecked={field.value.includes(option.value)}
                                onChange={handleCheckboxOnChange(
                                    field,
                                    option.value,
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        },
        [handleCheckboxOnChange],
    );

    const renderSingleCheckbox = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<
                EmployeesFiltersDto,
                'activeSearchingOnly'
            >;
        }): React.ReactElement => (
            <Checkbox
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(event): void => {
                    field.onChange(event.target.checked);
                }}
                checked={field.value}
            />
        ),
        [],
    );

    return (
        <Grid container className={styles.wrapper}>
            <Grid item>
                <Typography variant={'h6'} className={styles.title}>
                    Filters
                </Typography>
            </Grid>
            <Grid item>
                <FormLabel className={styles.labels}>
                    <Controller
                        name="activeSearchingOnly"
                        control={control}
                        render={renderSingleCheckbox}
                    />
                    {'Active searching talents only'}
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Job Title'}
                    <Select
                        options={jobTitleOptions}
                        control={control}
                        name="jobTitles"
                        isMulti={true}
                        placeholder="Options"
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Hard Skills'}
                    <SkillsAutocomplete name="hardSkills" control={control} />
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
                        placeholder="Options"
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
                        placeholder="Options"
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
                        placeholder="Options"
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
                        placeholder="Options"
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
                        placeholder="Options"
                    />
                </FormLabel>
            </Grid>
            <Grid>
                <FormLabel className={styles.labels}>
                    {'Employment Type'}
                    <Controller
                        control={control}
                        name="employmentType"
                        render={renderCheckboxes}
                    />
                </FormLabel>
            </Grid>
        </Grid>
    );
};

export { EmployeeFilters };
