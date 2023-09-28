import {
    Button,
    FormControl,
    Grid,
    RouterOutlet,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { actions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { STEPS_NUMBER, StepsList } from '../../constants/constants.js';
import { formatStepLabels } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    currentStep: number;
    onNextStep: () => void;
    onPreviousStep: () => void;
};

const StepContent: React.FC<Properties> = ({
    currentStep,
    onNextStep,
    onPreviousStep,
}) => {
    const { submitForm } = useFormSubmit();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);

    const handleNextClick = async (): Promise<void> => {
        if (submitForm) {
            const isSuccessful = await submitForm();
            if (isSuccessful) {
                onNextStep();
            }
        }
    };

    const handlePublishNowClick = (): void => {
        if (currentUser) {
            void dispatch(
                actions.updateTalentPublishedDate({ userId: currentUser.id }),
            );
        }
    };

    const handleSaveWithoutPublishing = (): void => {
        navigate('/talent/my/profile');
    };
    return (
        <Grid item className={styles.stepContent}>
            <Grid
                className={getValidClassNames(
                    styles.stepTitle,
                    currentStep === StepsList.ONE && styles.step1,
                    currentStep === StepsList.TWO && styles.step2,
                    currentStep === StepsList.THREE && styles.step3,
                    currentStep === StepsList.FOUR && styles.step4,
                    currentStep === StepsList.FIVE && styles.step5,
                )}
            >
                <Typography variant="body1" className={styles.stepName}>
                    {formatStepLabels(
                        StepsRoute[
                            `STEP_0${currentStep}` as keyof typeof StepsRoute
                        ],
                    )}
                </Typography>
                <Typography variant="caption" className={styles.stepNumber}>
                    Step 0{currentStep}
                </Typography>
            </Grid>
            <Grid className={styles.stepBody}>
                <Grid className={styles.stepOutlet}>
                    <FormControl
                        className={getValidClassNames(
                            styles.form,
                            currentStep === STEPS_NUMBER ? styles.wideForm : '',
                        )}
                    >
                        {<RouterOutlet />}
                    </FormControl>
                </Grid>
                <Grid
                    className={getValidClassNames(
                        currentStep === STEPS_NUMBER
                            ? styles.wideStepButtons
                            : styles.stepButtons,
                    )}
                >
                    {currentStep !== StepsList.ONE && (
                        <Button
                            onClick={
                                currentStep === STEPS_NUMBER
                                    ? handleSaveWithoutPublishing
                                    : onPreviousStep
                            }
                            label={
                                currentStep === STEPS_NUMBER
                                    ? 'Save without publishing'
                                    : 'Back'
                            }
                            variant="outlined"
                            className={getValidClassNames(
                                styles.button,
                                styles.buttonBack,
                            )}
                        />
                    )}
                    {currentStep === StepsList.ONE && (
                        <Grid className={styles.buttonPlaceholder} />
                    )}
                    <Button
                        onClick={
                            currentStep === STEPS_NUMBER
                                ? handlePublishNowClick
                                : handleNextClick
                        }
                        label={
                            currentStep === STEPS_NUMBER
                                ? 'Publish now'
                                : 'Next'
                        }
                        variant="contained"
                        className={getValidClassNames(
                            styles.button,
                            styles.buttonNext,
                        )}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { StepContent };
