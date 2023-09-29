import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { type DocViewerProps } from '@cyntler/react-doc-viewer/dist/esm/DocViewer.js';
import { Article, LinkedIn, Phone } from '@mui/icons-material';

import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useState } from '~/bundles/common/hooks/hooks.js';

import { type UserDetailsFullResponseDto } from '../../types/types.js';
import { mapDocumentForViewer } from './helpers/map-document-for-viewer.helper.js';
import styles from './styles.module.scss';

const DocumentViewer = DocViewer as unknown as React.FC<DocViewerProps>;

type Properties = {
    userDetails?: UserDetailsFullResponseDto;
};

const CVAndContacts: React.FC<Properties> = ({ userDetails }) => {
    const documents = mapDocumentForViewer(userDetails?.cv?.url as string);

    const browserUnsupportedFile =
        'https://bsa-2023-bucket.s3.eu-central-1.amazonaws.com/Unsupported.pdf';

    const [cvUrl, setCvUrl] = useState<string>(userDetails?.cv?.url as string);
    const [extension] = cvUrl.split('.').reverse();

    if (extension !== 'pdf') {
        setCvUrl(browserUnsupportedFile);
    }

    return (
        <Grid container justifyContent="center" className={styles.container}>
            <Grid container item className={styles.data}>
                <Grid container item className={styles.row}>
                    <Phone className={styles.icon} />
                    <Typography className={styles.span} variant="body1">
                        {userDetails?.phone}
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    className={getValidClassNames(styles.row, styles.clickable)}
                >
                    <LinkedIn className={styles.icon} />
                    <Typography className={styles.span} variant="body1">
                        <a
                            className={styles.link}
                            target={'_blank'}
                            href={userDetails?.linkedinLink as string}
                            rel="noreferrer"
                        >
                            LinkedIn Profile
                        </a>
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    className={getValidClassNames(styles.row, styles.clickable)}
                >
                    <Article className={styles.icon} />
                    <Typography
                        className={getValidClassNames(
                            styles.span,
                            styles.clickable,
                        )}
                        variant="body1"
                    >
                        <a
                            target="_blank"
                            className={styles.link}
                            href={cvUrl}
                            rel="noreferrer"
                        >
                            Download CV
                        </a>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={styles.preview}>
                <DocumentViewer
                    className={styles.viewer}
                    documents={documents}
                    pluginRenderers={DocViewerRenderers}
                />
            </Grid>
        </Grid>
    );
};

export { CVAndContacts };
