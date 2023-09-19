import mockedProjectPicture from '~/assets/img/mocked-project-picture.png';
import { mockedHRComments } from '~/assets/mock-data/mock-data.js';
import {
    Badge,
    Button,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { BadgeColors } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type FirstSectionDetails } from '~/bundles/talent-onboarding/types/types.js';

import { SummaryPreview } from '../summary-preview/summary-preview.js';
import styles from './styles.module.scss';

type Properties = {
    candidateParameters: FirstSectionDetails;
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
};

const ProfileFirstSection: React.FC<Properties> = ({
    candidateParameters,
    isProfileOpen,
    isFifthStep,
    isProfileCard,
}) => {
    const handleLinkClick = useCallback((): void => {
        window.open(
            candidateParameters.projectLinks
                ? candidateParameters.projectLinks[0]
                : '',
            '_blank',
        );
    }, [candidateParameters.projectLinks]);

    const [isExpanded, setIsExpanded] = useState(true);

    const handleSummaryClick = useCallback((): void => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    return (
        <Grid
            className={getValidClassNames(
                styles.profileFirstSection,
                isProfileCard ? styles.profileCard : '',
                isFifthStep ? styles.profileStepFirstSection : '',
            )}
        >
            <Grid>
                <Typography variant="h5" className={styles.candidatePosition}>
                    {candidateParameters.profileName}
                    {isProfileCard && (
                        <Typography variant="input" className={styles.salary}>
                            ${candidateParameters.salaryExpectation}
                        </Typography>
                    )}
                </Typography>
                {isProfileCard && (
                    <Typography
                        variant="caption"
                        className={styles.candidateParameters}
                    >
                        {candidateParameters.location} |{' '}
                        {candidateParameters.experienceYears} years of
                        experience |{candidateParameters.englishLevel} | Publish
                        today
                    </Typography>
                )}
            </Grid>
            <Grid className={styles.academyScore}>
                {!isProfileCard && (
                    <Typography variant="input" className={styles.title}>
                        Academy&apos;s scores
                    </Typography>
                )}
                <ul
                    className={getValidClassNames(
                        styles.badgeList,
                        isFifthStep ? styles.bigBadgeList : '',
                    )}
                >
                    {candidateParameters.badges.map((badge, index) => (
                        <li key={index}>
                            <Badge
                                isSmall
                                isFifthStep={isFifthStep}
                                color={badge.color}
                                primaryText={
                                    (badge.score ?? badge.level) as string
                                }
                                description={badge.description}
                                secondText={
                                    badge.maxScore ? ` / ${badge.maxScore}` : ''
                                }
                            />
                        </li>
                    ))}
                </ul>
            </Grid>
            <Grid className={isProfileCard ? styles.skillsWrapper : ''}>
                <Typography variant="input" className={styles.title}>
                    Skills
                </Typography>
                <ul className={styles.skills}>
                    {candidateParameters.hardSkills.map((skill) => (
                        <li key={skill}>
                            <Chip label={skill} />
                        </li>
                    ))}
                </ul>
                {isFifthStep && (
                    <>
                        <Typography variant="input" className={styles.title}>
                            Preferred language
                        </Typography>
                        <ul className={styles.preferredLanguage}>
                            {candidateParameters.preferredLanguages.map(
                                (language) => (
                                    <li key={language}>
                                        <Chip label={language} />
                                    </li>
                                ),
                            )}
                        </ul>
                    </>
                )}
            </Grid>
            {!isProfileCard && !isFifthStep && (
                <Grid>
                    <Typography variant="input" className={styles.title}>
                        HR comments
                    </Typography>
                    <ul className={styles.badgeList}>
                        {mockedHRComments.map((badge, index) => (
                            <li key={index}>
                                <Badge
                                    isSmall
                                    color={BadgeColors.YELLOW}
                                    primaryText={badge.score}
                                    description={badge.description}
                                    isRoundedIcon
                                />
                            </li>
                        ))}
                    </ul>
                </Grid>
            )}
            <SummaryPreview
                description={candidateParameters.description}
                isExpanded={isExpanded}
                handleSummaryClick={handleSummaryClick}
                isProfileCard={isProfileCard}
            />
            {!isProfileCard && (
                <Grid className={styles.project}>
                    <Typography variant="input" className={styles.title}>
                        Project
                    </Typography>
                    <Typography
                        variant="body1"
                        className={styles.projectDescription}
                    >
                        6 weeks / 6 engineers, 2 QA / JS / Healthtech industry
                        {isProfileOpen && (
                            <Button
                                label="Repository link"
                                variant="outlined"
                                className={styles.projectButton}
                                onClick={handleLinkClick}
                            ></Button>
                        )}
                    </Typography>
                    <img
                        src={mockedProjectPicture}
                        className={styles.projectPicture}
                        alt="project"
                    />
                    {isFifthStep && (
                        <Button
                            label="Repository link"
                            variant="outlined"
                            className={styles.projectButton}
                            onClick={handleLinkClick}
                        />
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export { ProfileFirstSection };
