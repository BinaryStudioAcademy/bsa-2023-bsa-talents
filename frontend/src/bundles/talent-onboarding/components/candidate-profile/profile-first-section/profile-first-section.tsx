import mockedProjectPicture from '~/assets/img/mocked-project-picture.png';
import {
    Badge,
    Button,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';

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

const ProfileFirstSection: React.FC = () => {
    return (
        <Grid className={styles.profileFirstSection}>
            <Typography variant="h5" className={styles.candidatePosition}>
                Middle Python Developer
            </Typography>
            <Grid className={styles.academyScore}>
                <Typography variant="input" className={styles.title}>
                    Academy&apos;s scores
                </Typography>
                <ul className={styles.badgeList}>
                    {mockedAcademyBadges.map((badge, index) => (
                        <li key={index}>
                            <Badge
                                small
                                color={badge.color}
                                primaryText={badge.primaryText}
                                description={badge.description}
                                secondText={' / 5'}
                            />
                        </li>
                    ))}
                </ul>
            </Grid>
            <Grid>
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
            </Grid>
            <Grid>
                <Typography variant="input" className={styles.title}>
                    HR comments
                </Typography>
                <ul className={styles.badgeList}>
                    {mockedHRComments.map((badge, index) => (
                        <li key={index}>
                            <Badge
                                small
                                color={BadgeColors.YELLOW}
                                primaryText={badge.score}
                                description={badge.description}
                                HRbadge
                            />
                        </li>
                    ))}
                </ul>
            </Grid>
            <Grid className={styles.coverLetter}>
                <Typography variant="input" className={styles.title}>
                    Cover letter
                </Typography>
                <Typography variant="body1" className={styles.coverLetterText}>
                    Hi! Throughout my time as a Python developer, I&apos;ve
                    developed a strong foundation in Python programming,
                    enabling me to create efficient, modular, and maintainable
                    code. I&apos;ve become adept at leveraging the
                    language&apos;s versatile libraries and frameworks to tackle
                    complex tasks and deliver robust solutions.
                </Typography>
                <Button
                    label="Read more"
                    variant="text"
                    className={styles.readMoreButton}
                />
            </Grid>
            <Grid className={styles.project}>
                <Typography variant="input" className={styles.title}>
                    Project
                </Typography>
                <Typography
                    variant="body1"
                    className={styles.projectDescription}
                >
                    6 weeks / 6 engineers, 2 QA / JS / Healthtech industry
                    <Button label="Repository link" variant="outlined" />
                </Typography>
                <img
                    src={mockedProjectPicture}
                    className={styles.projectPicture}
                    alt="project"
                />
            </Grid>
        </Grid>
    );
};

export { ProfileFirstSection };
