import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    Button,
    Grid,
    Logo,
    Typography,
} from '~/bundles/common/components/components.js';
import { UserRole } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { userDetailsApi } from '~/bundles/user-details/user-details.js';

import { CompanyHeader } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    role: string;
    className?: string;
};

const CompanyInfo: React.FC<Properties> = ({ className, role }) => {
    const {
        company,
        hasSharedContacts,
        talentId,
        employerId,
        currentChatId,
        talent,
    } = useAppSelector(({ chat }) => ({
        company: chat.current.employerDetails,
        hasSharedContacts: chat.current.talentHasSharedContacts,
        talentId: chat.current.talentId,
        employerId: chat.current.employerDetails.employerId,
        currentChatId: chat.current.chatId,
        talent: chat.current.userDetails,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (role === UserRole.EMPLOYER) {
            void dispatch(
                talentActions.getTalentDetails({ userId: talentId as string }),
            );
        }
    }, [dispatch, role, talentId]);

    const { companyName, about, companyWebsite } = company;

    const handleShareCVButtonClick = useCallback(() => {
        const createNotificationMessage = async (): Promise<void> => {
            const userDetails = await userDetailsApi.getFullUserDetailsById({
                userId: talentId as string,
            });

            const cvUrl = userDetails.cv?.url;
            const baseUrl = window.location.toString().replace('/chats', '');

            void dispatch(
                chatActions.createMessage({
                    message:
                        'Hello!\n I have shared my CV and information with you.\n\n ' +
                        `CV_&_${cvUrl} ` +
                        `Profile_&_${baseUrl}/candidates/${talentId} `,
                    senderId: talentId as string,
                    receiverId: employerId as string,
                    chatId: currentChatId as string,
                }),
            );

            void dispatch(candidateActions.shareContactsWithCompany());
        };

        void createNotificationMessage();
    }, [dispatch, currentChatId, employerId, talentId]);

    const handleAlreadyHiredButtonClick = useCallback(() => {
        //TODO: Implement button click handler
    }, []);

    const aboutInfo = about ?? 'No information provided';
    return currentChatId ? (
        <Grid className={styles.wrapper}>
            <CompanyHeader role={role} company={company} talent={talent} />
            {role === UserRole.EMPLOYER ? (
                <Grid className={styles.contentWrapper}>
                    <Grid className={styles.content}>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            English level
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.englishLevel}
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Experience
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.experienceYears} years
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Location
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.location}
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Salary expectation
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.salaryExpectation} $
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Preferred languages
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.preferredLanguages?.toString()}
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Employment types
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.employmentType?.toString()}
                        </Typography>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            Not considered
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {talent?.notConsidered?.toString()}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                <Grid className={styles.contentWrapper}>
                    <Grid className={styles.content}>
                        <Typography
                            className={styles.contentHeading}
                            variant="h6"
                        >
                            About {companyName}
                        </Typography>
                        <Typography className={styles.about} variant="body1">
                            {aboutInfo}
                        </Typography>
                        {companyWebsite && (
                            <>
                                <Typography
                                    className={styles.contentHeading}
                                    variant="h6"
                                >
                                    Company Website
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.linkWrapper}
                                >
                                    <a
                                        href={
                                            companyWebsite.startsWith(
                                                'http://',
                                            ) ||
                                            companyWebsite.startsWith(
                                                'https://',
                                            )
                                                ? companyWebsite
                                                : `http://${companyWebsite}`
                                        }
                                        rel="noreferrer"
                                        target="_blank"
                                        className={styles.companyLink}
                                    >
                                        {companyWebsite}
                                    </a>
                                </Typography>
                            </>
                        )}
                    </Grid>
                    <Grid className={styles.buttons}>
                        <Button
                            className={styles.mainBtn}
                            label="Share your contact and CV"
                            onClick={handleShareCVButtonClick}
                            isDisabled={hasSharedContacts}
                        />
                        <Button
                            className={styles.btnSecondary}
                            variant="text"
                            label="The company already hired me"
                            onClick={handleAlreadyHiredButtonClick}
                            isDisabled={false}
                        />
                    </Grid>
                </Grid>
            )}
        </Grid>
    ) : (
        <Grid className={className}>
            <Logo isCollapsed />
            <span className={styles.hire}>
                Where great talent meets great opportunities
            </span>
        </Grid>
    );
};

export { CompanyInfo };
