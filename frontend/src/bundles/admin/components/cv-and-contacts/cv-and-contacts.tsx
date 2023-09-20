import { Article, LinkedIn } from '@mui/icons-material';

import { Grid, Typography } from '~/bundles/common/components/components.js';
import { useState } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const CVAndContacts: React.FC = () => {
    // TODO: Change with actual selected candidate's data:
    const mockCandidate = {
        phone: '+63-970-998-0196',
        linkedInLink: 'https://www.linkedin.com/in/josuer-bague/',
        // cvLink: "https://bsa-2023-bucket.s3.eu-central-1.amazonaws.com/josuer-bague-cv.pdf",
        cvLink: 'https://bsa-2023-bucket.s3.eu-central-1.amazonaws.com/file_0f89hzllhwlk.docx',
    };

    const browserUnsopportedFile =
        'https://bsa-2023-bucket.s3.eu-central-1.amazonaws.com/Unsupported.pdf';

    const [cvUrl, setCvUrl] = useState<string>(mockCandidate.cvLink);
    const [extension] = cvUrl.split('.').reverse();

    if (extension !== 'pdf') {
        setCvUrl(browserUnsopportedFile);
    }

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
                            href={cvUrl}
                            rel="noreferrer"
                        >
                            Curriculum Vitae
                        </a>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={styles.preview}>
                <iframe
                    title="Curriculum Vitae"
                    className={styles.iframe}
                    src={cvUrl}
                ></iframe>
            </Grid>
        </Grid>
    );
};

export { CVAndContacts };
