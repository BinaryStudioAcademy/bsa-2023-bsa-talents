import {
    type Control,
    Controller,
    type ControllerRenderProps,
    type UseFormReset,
} from 'react-hook-form';

import {
    Autocomplete,
    Button,
    Checkbox,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { useCommonData } from '~/bundles/common/data/hooks/use-common-data.hook.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { DEFAULT_EMPLOYEES_FILTERS_PAYLOAD } from '../../constants/constants.js';
import {
    BsaCharacteristics,
    BsaProject,
    CheckboxesFields,
    Country,
    EmploymentType,
    EnglishLevel,
    JobTitle,
    YearsOfExperience,
} from '../../enums/enums.js';
import { type EmployeesFiltersDto } from '../../types/employees-filters-dto.js';
import styles from './styles.module.scss';

const jobTitleOptions = Object.values(JobTitle).map((title) => ({
    value: title,
    label: title,
}));

const yearsOfExperience = Object.values(YearsOfExperience).map(
    (experience) => ({
        value: experience,
        label: String(experience),
    }),
);

const bsaCharacteristics = Object.values(BsaCharacteristics).map(
    (characteristic) => ({
        value: characteristic,
        label: characteristic,
    }),
);

const bsaProject = Object.values(BsaProject).map((project) => ({
    value: project,
    label: project,
}));

const locationOptions = Object.values(Country).map((country) => ({
    value: country,
    label: country,
}));

const englishLevelOptions = Object.values(EnglishLevel).map((level) => ({
    value: level,
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
    const errors = {};

    const { hardSkillsOptions } = useCommonData();

    const handleCheckboxOnChange = useCallback(
        <Field extends ValueOf<typeof CheckboxesFields>>(
            field: ControllerRenderProps<EmployeesFiltersDto, Field>,
            selectedValue?: string,
        ) =>
            (): void => {
                if ('boolean' === typeof field.value) {
                    field.onChange(!field.value);
                    return;
                }

                if (
                    !Array.isArray(field.value) ||
                    !(
                        englishLevelOptions.some(
                            (option) => option.value === selectedValue,
                        ) ||
                        employmentTypeOptions.some(
                            (option) => option.value === selectedValue,
                        )
                    )
                ) {
                    return;
                }

                const updatedValue = field.value.includes(
                    selectedValue as string,
                )
                    ? field.value.filter((item) => item !== selectedValue)
                    : [...field.value, selectedValue];
                field.onChange(updatedValue);
            },
        [],
    );

    const renderCheckboxes = useCallback(
        <Field extends ValueOf<typeof CheckboxesFields>>({
            field,
        }: {
            field: ControllerRenderProps<EmployeesFiltersDto, Field>;
        }): React.ReactElement => {
            const fieldValue = field.value;
            const optionsToRender =
                field.name === CheckboxesFields.EMPLOYMENT_TYPE
                    ? employmentTypeOptions
                    : englishLevelOptions;
            return field.name === CheckboxesFields.ACTIVE_SEARCHING_ONLY ? (
                <Checkbox
                    onChange={handleCheckboxOnChange(field, field.name)}
                    isChecked={fieldValue as boolean}
                    className={styles.checkbox}
                />
            ) : (
                <Grid container className={styles.checkboxContainer}>
                    {optionsToRender.map((option) => (
                        <Grid
                            item
                            key={option.value}
                            className={styles['MuiGrid-item']}
                        >
                            <Checkbox
                                onBlur={field.onBlur}
                                name={field.name}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isChecked={
                                    Array.isArray(fieldValue) &&
                                    fieldValue.includes(option.value)
                                }
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

    const handleFiltersClear = useCallback((): void => {
        reset(DEFAULT_EMPLOYEES_FILTERS_PAYLOAD);
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
                        name="isSearchActiveCandidatesOnly"
                        control={control}
                        render={renderCheckboxes}
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
                            errors={errors}
                            name="jobTitle"
                            isMulti={true}
                            placeholder="Options"
                        />
                    </FormLabel>
                </Grid>
                <Grid>
                    <FormLabel className={styles.labels}>
                        {'Hard Skills'}
                        <Autocomplete
                            isFilter={true}
                            name="hardSkills"
                            control={control}
                            options={hardSkillsOptions}
                            placeholder="Start typing and select skills"
                        />
                    </FormLabel>
                </Grid>
                <Grid className={styles.filtersMultiSelect}>
                    <FormLabel className={styles.labels}>
                        {'Years of experience'}
                        <Select
                            options={yearsOfExperience}
                            control={control}
                            errors={errors}
                            name="yearsOfExperience"
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
                            errors={errors}
                            name="userBsaCharacteristics"
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
                            errors={errors}
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
                            errors={errors}
                            name="location"
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
                            name="englishLevel"
                            render={renderCheckboxes}
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
