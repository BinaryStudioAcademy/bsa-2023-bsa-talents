import { LocationOn as LocationIcon } from '@mui/icons-material';

import {
    Avatar,
    Grid,
    Loader,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useParameters,
} from '~/bundles/common/hooks/hooks.js';

import { actions as employersActon } from '../../store/employers.js';
import styles from './styles.module.scss';

const CompanyPage: React.FC = () => {
    const { id } = useParameters();
    const dispatch = useAppDispatch();
    const { employers } = useAppSelector((state) => state.employer);
    const companyData = employers.find((it) => it.userId === id);

    useEffect(() => {
        if (!companyData) {
            void dispatch(employersActon.getEmployerData(id as string));
        }
    }, [companyData, dispatch, id]);

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
