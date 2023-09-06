import { Button, Grid } from '~/bundles/common/components/components.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_PAYLOAD_SKILLS_STEP } from './constants/constants.js';
import { SkillsStep } from './skills-step.js';
import styles from './styles.module.scss';
import { type SkillsStepFormValues } from './types/skills-step-form-values.js';
import { SkillsStepValidationSchema } from './types/skills-step-form-values.validation-schema.js';

type Properties = {
    onSubmit: (
        data: SkillsStepFormValues,
        event?: React.BaseSyntheticEvent,
    ) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestStepLayout: React.FC<Properties> = ({ onSubmit }) => {
    const method = useAppForm<SkillsStepFormValues>({
        defaultValues: DEFAULT_PAYLOAD_SKILLS_STEP,
        validationSchema: SkillsStepValidationSchema,
    });

    // const handleFormSubmit = useCallback(
    //     (event_: React.BaseSyntheticEvent): void => {
    //         method.handleSubmit((data) => {
    //             onSubmit(data, event_);
    //         })();
    //     },
    //     [method, onSubmit],
    // );

    return (
        <div>
            <SkillsStep methods={method} />
            <>
                <Grid className={styles.stepButtons}>
                    <Button
                        label="Back"
                        className={styles.buttonBack}
                        disabled
                    />
                    <Button
                        label="Next"
                        className={styles.buttonNext}
                        onClick={handleFormSubmit}
                    />
                </Grid>
            </>
        </div>
    );
};

export { TestStepLayout };
