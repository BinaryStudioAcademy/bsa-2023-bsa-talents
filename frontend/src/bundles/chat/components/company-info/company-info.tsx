import {
    Avatar,
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type CompanyInfoDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    companyData: CompanyInfoDto;
};

const CompanyInfo: React.FC<Properties> = ({
    companyData: {
        logoUrl,
        companyName,
        employerName,
        employerPosition,
        about = 'No information provided.',
        companyWebsite,
    },
}) => {
    const handleShareCVButtonClick = useCallback(() => {
        //TODO: Implement button click handler
    }, []);

    const handleAlreadyHiredButtonClick = useCallback(() => {
        //TODO: Implement button click handler
    }, []);

    return (
        <Grid className={styles.wrapper}>
            <Grid className={styles.header}>
                <Avatar alt={companyName} src={logoUrl} isSmall />
                <Grid className={styles.headerInfo}>
                    <Typography className={styles.companyName} variant="h3">
                        {companyName}
                    </Typography>
                    <Typography
                        className={styles.companyRepresentative}
                        variant="body1"
                    >
                        {employerName}, {employerPosition ?? employerPosition}
                    </Typography>
                </Grid>
            </Grid>
            <div className={styles.divider}></div>
            <Grid className={styles.content}>
                <Typography className={styles.contentHeading} variant="h6">
                    About {companyName}
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {about}
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
                                href={companyWebsite}
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
                />
                <Button
                    className={styles.btnSecondary}
                    variant="text"
                    label="The company already hired me"
                    onClick={handleAlreadyHiredButtonClick}
                />
            </Grid>
        </Grid>
    );
};

export { CompanyInfo };
