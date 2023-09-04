import {
    Avatar,
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

type Properties = {
    companyData: {
        logoUrl: string;
        name: string;
        employerName: string;
        employerPosition: string;
        info: string;
        companyWebsite: string;
    };
};

import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const CompanyInfo: React.FC<Properties> = ({
    companyData: {
        logoUrl,
        name,
        employerName,
        employerPosition,
        info,
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
                <Avatar userFullName={name} url={logoUrl} size="small" />
                <Grid className={styles.headerInfo}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="body1">
                        {employerName}, {employerPosition}
                    </Typography>
                </Grid>
            </Grid>
            <div className={styles.divider}></div>
            <Grid className={styles.content}>
                <Typography variant="h6">About {name}</Typography>
                <Typography variant="body1">{info}</Typography>
                <Typography variant="h6">Company Website</Typography>
                <p className={styles.linkWrapper}>
                    <a
                        href={companyWebsite}
                        rel="noreferrer"
                        target="_blank"
                        className={styles.companyLink}
                    >
                        {companyWebsite}
                    </a>
                </p>
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
