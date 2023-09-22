import {
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { PREVIEW_CHAR_LIMIT } from '~/bundles/talent-onboarding/constants/constants.js';
import { ProfileStepValidationRule } from '~/bundles/talent-onboarding/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
    description: string;
    isProfileCard: boolean | undefined;
    isExpanded: boolean;
    handleSummaryClick: () => void;
};

const SummaryPreview: React.FC<Properties> = ({
    description,
    isProfileCard,
    isExpanded,
    handleSummaryClick,
}) => {
    return (
        <Grid className={styles.summary}>
            {!isProfileCard && (
                <Typography variant="input" className={styles.title}>
                    Summary
                </Typography>
            )}
            {description.length ===
            ProfileStepValidationRule.MIN_EXPERIENCE_DESCRIPTION_LENGTH ? (
                <Typography
                    variant="body1"
                    className={getValidClassNames(
                        styles.summaryText,
                        isProfileCard ? styles.cardSummaryText : '',
                    )}
                >
                    {description}
                </Typography>
            ) : (
                <>
                    <Typography
                        variant="body1"
                        className={getValidClassNames(
                            styles.summaryText,
                            isProfileCard ? styles.cardSummaryText : '',
                        )}
                    >
                        {isExpanded
                            ? `${description.slice(0, PREVIEW_CHAR_LIMIT)}...`
                            : description}
                    </Typography>
                    <Button
                        label={isExpanded ? 'Read more' : 'Read less'}
                        variant={isProfileCard ? 'contained' : 'text'}
                        className={
                            isProfileCard
                                ? styles.profileCardReadMoreButton
                                : styles.readMoreButton
                        }
                        onClick={handleSummaryClick}
                    />
                </>
            )}
        </Grid>
    );
};

export { SummaryPreview };
