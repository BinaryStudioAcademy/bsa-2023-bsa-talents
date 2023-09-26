import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import {
    Avatar,
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const CompanyInfo: React.FC = () => {
    const { company } = useAppSelector(({ chat }) => ({
        company: chat.current.employerDetails,
    }));
    const dispatch = useAppDispatch();

    const {
        logoUrl,
        companyName,
        employerName,
        employerPosition,
        about,
        companyWebsite,
    } = company;

    const handleShareCVButtonClick = useCallback(() => {
        void dispatch(candidateActions.shareContactsWithCompany());
    }, [dispatch]);

    const handleAlreadyHiredButtonClick = useCallback(() => {
        //TODO: Implement button click handler
    }, []);

    const aboutInfo = about ?? 'No information provided';

    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.header}>
                <Avatar
                    alt={companyName ?? 'company name'}
                    src={logoUrl ?? ''}
                    isSmall
                />
                <Grid className={styles.headerInfo}>
                    <Typography className={styles.companyName} variant="h3">
                        {companyName}
                    </Typography>
                    <Typography
                        className={styles.companyRepresentative}
                        variant="body1"
                    >
                        {employerName}, {employerPosition}
                    </Typography>
                </Grid>
            </Grid>

            <Grid className={styles.contentWrapper}>
                <Grid className={styles.content}>
                    <Typography className={styles.contentHeading} variant="h6">
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
                                        companyWebsite.startsWith('http://') ||
                                        companyWebsite.startsWith('https://')
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
                        isDisabled={false}
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
        </Grid>
    );
};

export { CompanyInfo };
