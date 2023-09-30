import previewImage from '~/assets/img/github-preview.jpg';

import { Grid, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    url: string;
};

const GithubLinkPreview: React.FC<Properties> = ({ url }) => {
    const link = url.replace('https://github.com/', '');
    const [firstPart, secondPart] = link.split('/');

    return (
        <Grid container item className={styles.imagePlaceholder}>
            <img
                src={previewImage}
                alt="github-preview"
                className={styles.image}
            />
            <Grid className={styles.link}>
                <Typography variant="h2" className={styles.text}>
                    {firstPart}/
                </Typography>
                <Typography variant="h2" className={styles.text}>
                    {secondPart}
                </Typography>
            </Grid>
        </Grid>
    );
};

export { GithubLinkPreview };
