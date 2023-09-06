import { Button, Grid } from '~/bundles/common/components/components.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { type SkillsStepDto } from '../../../../../../shared/src/bundles/talent-onboarding/types/skills-step/skills-step-dto.js';
import { SkillsStepValidationSchema } from '../../../../../../shared/src/bundles/talent-onboarding/validation-schemas/skills-step/skills-step.validation-schema.js';
import { DEFAULT_PAYLOAD_SKILLS_STEP } from './constants/constants.js';
import { SkillsStep } from './skills-step.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (data: SkillsStepDto, event?: React.BaseSyntheticEvent) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestStepLayout: React.FC<Properties> = ({ onSubmit }) => {
    const method = useAppForm<SkillsStepDto>({
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
