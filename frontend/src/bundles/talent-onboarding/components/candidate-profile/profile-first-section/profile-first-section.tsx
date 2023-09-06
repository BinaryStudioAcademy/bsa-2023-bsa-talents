import mockedProjectPicture from '~/assets/img/mocked-project-picture.png';
import {
    Badge,
    Button,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

const mockedAcademyBadges = [
    {
        primaryText: '4.2',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        description: 'Average project score',
        color: BadgeColors.DARK_BLUE,
    },
    {
        primaryText: '4.2',
        description: 'Average project score',
        color: BadgeColors.RED,
    },
    {
        primaryText: '4.2',
        description: 'Average project score',
        color: BadgeColors.YELLOW,
    },
    {
        primaryText: '4.2',
        description: 'Average project score',
        color: BadgeColors.PURPLE,
    },
    {
        primaryText: '4.2',
        description: 'Average project score',
        color: BadgeColors.GREEN,
    },
];

const mockedSkills = ['Java Script', 'Node.js', 'React', 'GitHub'];
const preferredLanguage = ['Українська', 'English'];

const mockedHRComments = [
    {
        score: '60%',
        description: 'punctuality',
    },
    {
        score: '60%',
        description: 'ownership ',
    },
    {
        score: '70%',
        description: 'initiative',
    },
    {
        score: '70%',
        description: 'teamwork',
    },
    {
        score: '70%',
        description: 'communication',
    },
];

type Properties = {
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
};

const ProfileFirstSection: React.FC<Properties> = ({
    isProfileOpen,
    isFifthStep,
    isProfileCard,
}) => {
    return (
        <Grid
            className={getValidClassNames(
                styles.profileFirstSection,
                isProfileCard ? styles.profileCard : '',
            )}
        >
            <Grid>
                <Typography variant="h5" className={styles.candidatePosition}>
                    Middle Python Developer
                    {isProfileCard && (
                        <Typography variant="input" className={styles.salary}>
                            $1500
                        </Typography>
                    )}
                </Typography>
                {isProfileCard && (
                    <Typography
                        variant="caption"
                        className={styles.candidateParameters}
                    >
                        Ukraine | Lviv |2.5 years of experience |
                        Upper-Intermediate | Publish today
                    </Typography>
                )}
            </Grid>
            <Grid className={styles.academyScore}>
                {!isProfileCard && (
                    <Typography variant="input" className={styles.title}>
                        Academy&apos;s scores
                    </Typography>
                )}
                <ul className={styles.badgeList}>
                    {mockedAcademyBadges.map((badge, index) => (
                        <li key={index}>
                            <Badge
                                isSmall
                                color={badge.color}
                                primaryText={badge.primaryText}
                                description={badge.description}
                                secondText={' / 5'}
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
                    {mockedSkills.map((skill) => (
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
                            {preferredLanguage.map((language) => (
                                <li key={language}>
                                    <Chip label={language} />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Grid>
            {!isProfileCard && (
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
                                    isHRbadge
                                />
                            </li>
                        ))}
                    </ul>
                </Grid>
            )}
            <Grid className={styles.coverLetter}>
                {!isProfileCard && (
                    <Typography variant="input" className={styles.title}>
                        Cover letter
                    </Typography>
                )}
                <Typography
                    variant="body1"
                    className={getValidClassNames(
                        styles.coverLetterText,
                        isProfileCard ? styles.cardCoverLetterText : '',
                    )}
                >
                    Hi! Throughout my time as a Python developer, I&apos;ve
                    developed a strong foundation in Python programming,
                    enabling me to create efficient, modular, and maintainable
                    code. I&apos;ve become adept at leveraging the
                    language&apos;s versatile libraries and frameworks to tackle
                    complex tasks and deliver robust solutions.
                </Typography>
                <Button
                    label="Read more"
                    variant={isProfileCard ? 'contained' : 'text'}
                    className={
                        isProfileCard
                            ? styles.profileCardReadMoreButton
                            : styles.readMoreButton
                    }
                />
            </Grid>
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
                            />
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
                        />
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export { ProfileFirstSection };
