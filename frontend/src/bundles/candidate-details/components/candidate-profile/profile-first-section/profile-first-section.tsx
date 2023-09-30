import {
    Badge,
    Button,
    Chip,
    GithubLinkPreview,
    Grid,
    Link,
    Tooltip,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
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
    isFifthStep,
    isProfileCard,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleLinkClick = useCallback((): void => {
        if (!candidateParameters.lmsProject?.repositoryUrl) {
            return;
        }
        window.open(candidateParameters.lmsProject.repositoryUrl, '_blank');
    }, [candidateParameters]);

    const navigate = useNavigate();
    const handleReadMoreButton = useCallback((): void => {
        navigate(AppRoute.CANDIDATES + `/${candidateParameters.userId}`);
    }, [candidateParameters.userId, navigate]);

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
                <Grid className={styles.candidatePosition}>
                    <Link
                        to={`/candidates/${candidateParameters.userId}`}
                        className={styles.candidateLink}
                    >
                        {candidateParameters.profileName}
                    </Link>
                    {isProfileCard && (
                        <Typography variant="input" className={styles.salary}>
                            ${candidateParameters.salaryExpectation}
                        </Typography>
                    )}
                </Grid>
                {isProfileCard && (
                    <Typography
                        variant="caption"
                        className={styles.candidateParameters}
                    >
                        {candidateParameters.location} |{' '}
                        {candidateParameters.experienceYears} years of
                        experience | {candidateParameters.englishLevel} |
                        Published{' '}
                        {new Date(
                            candidateParameters.date,
                        ).toLocaleDateString()}
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
                    {candidateParameters.badges?.map((badge, index) => {
                        const showScore = Boolean(badge.maxScore);
                        const secondText = showScore
                            ? ` / ${badge.maxScore}`
                            : '';

                        return (
                            <li key={index}>
                                <Badge
                                    isSmall
                                    isFifthStep={isFifthStep}
                                    color={badge.color}
                                    primaryText={
                                        (badge.score ?? badge.level) as string
                                    }
                                    description={badge.name}
                                    secondText={secondText}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Grid>
            <Grid className={isProfileCard ? styles.skillsWrapper : ''}>
                <Typography variant="input" className={styles.title}>
                    Skills
                </Typography>
                <ul className={styles.skills}>
                    {candidateParameters.talentHardSkills?.map((skill) => (
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
            {
                //TODO: not implemented
                /* {!isProfileCard && !isFifthStep && (
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
            )} */
            }
            {isProfileCard ? (
                <Grid className={styles.summaryText}>
                    <Typography
                        variant="body1"
                        className={getValidClassNames(
                            styles.summaryText,
                            styles.cardsummaryText,
                        )}
                    >
                        {candidateParameters.description}
                    </Typography>
                    <Button
                        label="Read more"
                        variant={'contained'}
                        className={styles.profileCardReadMoreButton}
                        onClick={handleReadMoreButton}
                    />
                </Grid>
            ) : (
                <SummaryPreview
                    description={candidateParameters.description}
                    isExpanded={isExpanded}
                    handleSummaryClick={handleSummaryClick}
                />
            )}

            {!isProfileCard && (
                <Grid className={styles.project}>
                    <Typography variant="input" className={styles.title}>
                        {candidateParameters.lmsProject?.name ?? 'Project'}
                    </Typography>
                    <Typography
                        variant="body1"
                        className={styles.projectDescription}
                    >
                        {candidateParameters.lmsProject?.details?.en ??
                            'Description...'}
                    </Typography>

                    <Link
                        to={candidateParameters.lmsProject?.repositoryUrl ?? ''}
                        className={styles.linkWrapper}
                    >
                        <GithubLinkPreview
                            url={
                                candidateParameters.lmsProject?.repositoryUrl ??
                                ''
                            }
                        />
                    </Link>

                    {isFifthStep && candidateParameters.projectLinks && (
                        <Tooltip
                            title={
                                candidateParameters.lmsProject?.repositoryUrl ??
                                'Broken link'
                            }
                            arrow
                        >
                            <div className={styles.tooltipWrapper}>
                                <Button
                                    label="Repository link"
                                    variant="outlined"
                                    className={styles.projectButton}
                                    onClick={handleLinkClick}
                                />
                            </div>
                        </Tooltip>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export { ProfileFirstSection };
