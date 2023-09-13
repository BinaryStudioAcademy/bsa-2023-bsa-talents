import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormReset,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Button,
    Checkbox,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import {
    BsaBadges,
    BsaCharacteristics,
    BsaProject,
    CountryList,
    EmploymentType,
    EnglishLevel,
    ExperienceYears,
    JobTitle,
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

const englishLevelOptions = Object.values(EnglishLevel).map((level) => ({
    value: level.split(' ')[0],
    label: level,
}));

const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type,
    label: type,
}));

type Properties = {
    control: Control<EmployeesFiltersDto>;
    reset: UseFormReset<EmployeesFiltersDto>;
};
const EmployeeFilters: React.FC<Properties> = ({ control, reset }) => {
    const handleCheckboxOnChange = useCallback(
        <
            Field extends
                | 'employmentType'
                | 'levelOfEnglish'
                | 'activeSearchingOnly',
        >(
            field: ControllerRenderProps<EmployeesFiltersDto, Field>,
            selectedValue?: Field extends 'activeSearchingOnly'
                ? boolean
                : string,
            event?: React.ChangeEvent<HTMLInputElement>,
        ) =>
            (): void => {
                if (field.name === 'activeSearchingOnly') {
                    field.onChange(event?.target.checked);
                } else if (
                    field.name === 'levelOfEnglish' ||
                    field.name === 'employmentType'
                ) {
                    if (Array.isArray(field.value)) {
                        const updatedValue = field.value.includes(
                            selectedValue as string,
                        )
                            ? field.value.filter(
                                  (item) => item !== selectedValue,
                              )
                            : [...field.value, selectedValue];
                        field.onChange(updatedValue);
                    } else {
                        return;
                    }
                }
            },
        [],
    );

    const renderEnglishLevelCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<EmployeesFiltersDto, 'levelOfEnglish'>;
            formState: UseFormStateReturn<EmployeesFiltersDto>;
        }): React.ReactElement => {
            return (
                <Grid container className={styles.checkboxContainer}>
                    {englishLevelOptions.map((option) => (
                        <Grid
                            item
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
    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<EmployeesFiltersDto, 'employmentType'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<EmployeesFiltersDto>;
        }): React.ReactElement => {
            return (
                <Grid container className={styles.checkboxContainer}>
                    {employmentTypeOptions.map((option) => (
                        <Grid
                            item
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
    const renderActiveSearchingOnlyCheckbox = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<
                EmployeesFiltersDto,
                'activeSearchingOnly'
            >;
        }): React.ReactElement => (
            <Checkbox
                onChange={handleCheckboxOnChange(field)}
                isChecked={field.value}
                className={styles.checkbox}
            />
        ),
        [handleCheckboxOnChange],
    );

    const handleFiltersClear = useCallback(() => {
        reset();
    }, [reset]);

    return (
        <Grid container className={styles.filtersSidebar}>
            <Grid className={styles.header}>
                <Typography variant={'h6'} className={styles.title}>
                    {'Filters'}
                </Typography>
                <Button
                    onClick={handleFiltersClear}
                    label="Clear filters"
                    variant="text"
                    className={styles.clearFiltersBtn}
                />
            </Grid>
            <Grid container className={styles.filtersWrapper}>
                <Grid>
                    <Controller
                        name="activeSearchingOnly"
                        control={control}
                        render={renderActiveSearchingOnlyCheckbox}
                    />
                    <FormLabel className={styles.labels}>
                        {'Active searching talents only'}
                    </FormLabel>
                </Grid>
                <Grid className={styles.filtersMultiSelect}>
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
                        <SkillsAutocomplete
                            name="hardSkills"
                            control={control}
                        />
                    </FormLabel>
                </Grid>
                <Grid className={styles.filtersMultiSelect}>
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
                <Grid className={styles.filtersMultiSelect}>
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
                <Grid className={styles.filtersMultiSelect}>
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
                <Grid className={styles.filtersMultiSelect}>
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
                <Grid className={styles.filtersMultiSelect}>
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
                        {'Level of English'}
                        <Controller
                            control={control}
                            name="levelOfEnglish"
                            render={renderEnglishLevelCheckboxes}
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
        </Grid>
    );
};

export { EmployeeFilters };
