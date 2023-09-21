import { LocationOn as LocationIcon } from '@mui/icons-material';

import {
    Avatar,
    Grid,
    Loader,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useEffect,
    useParameters,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { employersApi } from '~/bundles/employers/employers.js';

import { type EmployerDataDto } from '../../types/employers-data-dto.js';
import styles from './styles.module.scss';

const CompanyPage: React.FC = () => {
    const { id } = useParameters();

    const [companyData, setCompanyData] = useState<EmployerDataDto>();

    useEffect(() => {
        async function fetchCompanyData(): Promise<void> {
            const data = await employersApi.getEmployerDetails(id as string);
            setCompanyData(data);
        }
        void fetchCompanyData();
    }, [id]);

    return companyData ? (
        <Grid container className={styles.container}>
            <Grid container className={styles.representor}>
                <Avatar
                    src={companyData.companyLogo.url}
                    className={styles.logo}
                />
                <Grid>
                    <Typography variant="h3">
                        {companyData.companyName}
                    </Typography>

                    <Typography
                        variant="body1"
                        className={styles.secondaryText}
                    >
                        {companyData.location}
                        <LocationIcon className={styles.locationIcon} />
                    </Typography>
                    <Typography
                        variant="body1"
                        className={styles.secondaryText}
                    >
                        {companyData.fullName}, {companyData.employerPosition}
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" className={styles.description}>
                About {companyData.companyName}
            </Typography>
            <Typography variant="body1" className={styles.descriptionBody}>
                {companyData.description}
            </Typography>
            <Typography variant="h5" className={styles.websiteLabel}>
                Company website
                <a
                    className={styles.websiteUrl}
                    href={companyData.companyWebsite}
                >
                    {companyData.companyWebsite}
                </a>
            </Typography>
        </Grid>
    ) : (
        <Loader />
    );
};

export { CompanyPage };
