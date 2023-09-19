// import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Article, LinkedIn } from '@mui/icons-material';

import { Grid, Typography } from '~/bundles/common/components/components.js';

import styles from './styles.module.scss';

const CVAndContacts: React.FC = () => {
    // const documents = [
    //     {
    //         uri: 'https://s3.console.aws.amazon.com/s3/object/bsa-2023-bucket?region=eu-central-1&prefix=file_67lr88hj3jl.pdf'
    //     }
    // ];
    return (
        <Grid container className={styles.container}>
            <Grid container item className={styles.data}>
                <Grid container item className={styles.row}>
                    <Typography variant="body1">Phone Number: </Typography>
                    <Typography variant="body1">+63-970-998-0196</Typography>
                </Grid>
                <Grid container item className={styles.row}>
                    <LinkedIn />
                    <Typography variant="body1">
                        <a
                            className={styles.link}
                            target={'_blank'}
                            href={'https://www.linkedin.com/in/josuer-bague/'}
                            rel="noreferrer"
                        >
                            LinkedIn Profile
                        </a>
                    </Typography>
                </Grid>
                <Grid container item className={styles.row}>
                    <Article />
                    <Typography variant="body1">
                        <a
                            target="_blank"
                            className={styles.link}
                            href="https://bsa-2023-bucket.s3.eu-central-1.amazonaws.com/file_67lr88hj3jl.pdf"
                            rel="noreferrer"
                        >
                            Curriculum Vitae
                        </a>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={styles.preview}>
                {/* <DocViewer className={styles.docViewer}documents={docs} pluginRenderers={DocViewerRenderers}/> */}
            </Grid>
        </Grid>
    );
};

export { CVAndContacts };
