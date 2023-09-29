import { type Company } from '~/bundles/chat/types/types.js';
import { type UserDetails } from '~/bundles/chat/types/user-details/user-details.js';
import {
    Avatar,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { UserRole } from '~/bundles/common/enums/enums.js';

import styles from '../styles.module.scss';

type Properties = {
    role: string;
    talent?: UserDetails | null;
    company?: Company | Record<string, never>;
};

const CompanyHeader: React.FC<Properties> = ({ company, role, talent }) => {
    return (
        <Grid className={styles.header}>
            <Avatar
                alt={
                    (role === UserRole.TALENT
                        ? company?.companyName
                        : talent?.fullName) ?? ''
                }
                src={
                    (role === UserRole.TALENT
                        ? company?.logoUrl
                        : talent?.photoId) ?? ''
                }
                isSmall
            />

            <Grid className={styles.headerInfo}>
                <Typography className={styles.companyName} variant="h3">
                    {role === UserRole.TALENT
                        ? company?.companyName
                        : talent?.profileName}
                </Typography>
                {role === UserRole.TALENT ? (
                    <Typography
                        className={styles.companyRepresentative}
                        variant="body1"
                    >
                        ({company?.employerName}, {company?.employerPosition})
                    </Typography>
                ) : (
                    <Typography
                        className={styles.companyRepresentative}
                        variant="body1"
                    >
                        Job title: {talent?.jobTitle}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export { CompanyHeader };
