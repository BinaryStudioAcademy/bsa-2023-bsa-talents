// import mockedProjectPicture from '~/assets/img/mocked-project-picture.png';
import { mockedHRComments } from '~/assets/mock-data/mock-data.js';
import {
    Badge,
    Button,
    Chip,
    Grid,
    Link,
    LinkPreview,
    Tooltip,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute, BadgeColors } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type FirstSectionDetails } from '~/bundles/talent-onboarding/types/types.js';

import { SummaryPreview } from '../summary-preview/summary-preview.js';
import styles from './styles.module.scss';

// TODO: connect lms
const project = {
    name: 'EasyMeets',
    details: {
        en: 'EasyMeets A planning platform for individual users. Includes a user room and integration with multiple calendars. There is a possibility to add a place for an event and has integration with Zoom as well as GMeet. Group collaboration is available (with the possibility to distribute time frames among different people in the organization) and the possibility to send a link with a choice of a convenient time.',
        ua: 'EasyMeets Платформа планування для окремих користувачів. Включає кімнату користувача та інтеграцію з кількома календарями. Є можливість додати місце для події та має інтеграцію 3 Zoom, а також GMeet. Доступна групова співпраця (з можливістю розподілу часових рамок між різними людьми в організації) і можливість відправити посилання з вибором зручного часу.',
    },
    repositoryUrl:
        'https://github.com/BinaryStudioAcademy/bsa-2022-easymeets.git',
};

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
        window.open(project.repositoryUrl, '_blank');
    }, []);

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
                        {project.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        className={styles.projectDescription}
                    >
                        {project.details.en}
                    </Typography>

                    <Link
                        to={project.repositoryUrl}
                        className={styles.linkWrapper}
                    >
                        <LinkPreview url={project.repositoryUrl} />
                    </Link>

                    {isFifthStep && candidateParameters.projectLinks && (
                        <Tooltip title={project.repositoryUrl} arrow>
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
