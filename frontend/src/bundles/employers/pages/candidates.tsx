import { useForm } from 'react-hook-form';

import {
    Grid,
    Input,
    PageLayout,
    Typography,
} from '~/bundles/common/components/components.js';

import { EmployeeFilters } from '../components/components.js';
import styles from './styles.module.scss';

const Candidates: React.FC = () => {
    const { control } = useForm({
        defaultValues: {
            searchValue: '',
        },
    });
    return (
        <PageLayout
            isOnline={true}
            avatarUrl="https://static.vecteezy.com/system/resources/previews/016/274/193/large_2x/eurasian-lynx-in-winter-free-photo.jpg"
        >
            <Grid className={styles.wrapper}>
                <Grid className={styles.mainContent}>
                    <Grid>
                        <Typography variant="h4" className={styles.pageTitle}>
                            Candidates
                        </Typography>
                    </Grid>
                    <Input
                        name="searchValue"
                        control={control}
                        errors={{}}
                        type="search"
                    />
                    Search results
                </Grid>
                <EmployeeFilters />
            </Grid>
        </PageLayout>
    );
};

export { Candidates };
