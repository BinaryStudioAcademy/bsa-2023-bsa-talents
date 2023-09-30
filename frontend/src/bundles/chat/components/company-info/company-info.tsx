import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { Grid, Logo } from '~/bundles/common/components/components.js';
import { UserRole } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as hiringInfoActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { userDetailsApi } from '~/bundles/user-details/user-details.js';

import {
    CompanyEmployer,
    CompanyHeader,
    CompanyTalent,
} from '../components.js';
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
        talent,
        talentIsHired,
        companyId,
        currentChatId,
    } = useAppSelector(({ chat }) => ({
        company: chat.current.employerDetails,
        hasSharedContacts: chat.current.talentHasSharedContacts,
        talentId: chat.current.talentId,
        currentChatId: chat.current.chatId,
        talent: chat.current.userDetails,
        companyId: chat.current.employerDetails.employerId,
        talentIsHired: chat.current.talentIsHired,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (role === UserRole.EMPLOYER) {
            void dispatch(
                talentActions.getTalentDetails({ userId: talentId as string }),
            );
        }
    }, [dispatch, role, talentId]);

    const { about } = company;

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
                    receiverId: companyId as string,
                    chatId: currentChatId as string,
                }),
            );

            void dispatch(candidateActions.shareContactsWithCompany());
        };

        void createNotificationMessage();
    }, [dispatch, currentChatId, companyId, talentId]);

    const { control, watch } = useAppForm<{ hire: 'Yes' | 'No' }>({
        defaultValues: { hire: 'Yes' },
    });

    useEffect(() => {
        if (talentId && companyId) {
            void dispatch(
                hiringInfoActions.getHiringInfo({
                    talentId,
                    companyId,
                }),
            );
        }
    }, [dispatch, companyId, talentId]);

    const handleHireSubmit = useCallback((): void => {
        if (watch('hire') === 'Yes') {
            void dispatch(
                hiringInfoActions.submitHiringInfo({
                    talentId: talentId ?? '',
                    companyId: companyId ?? '',
                }),
            );
        }
    }, [dispatch, companyId, talentId, watch]);

    const aboutInfo = about ?? 'No information provided';
    return currentChatId ? (
        <Grid className={styles.wrapper}>
            <CompanyHeader role={role} company={company} talent={talent} />
            {role === UserRole.EMPLOYER ? (
                <CompanyTalent talent={talent} />
            ) : (
                <CompanyEmployer
                    aboutInfo={aboutInfo}
                    company={company}
                    onHireSubmit={handleHireSubmit}
                    onShareCVButtonClick={handleShareCVButtonClick}
                    talentIsHired={talentIsHired}
                    control={control}
                    hasSharedContacts={hasSharedContacts}
                />
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
