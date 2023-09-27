import { getValidClassNames } from '../../helpers/helpers.js';
import { useEffect, useState } from '../../hooks/hooks.js';
import { Grid, Typography } from '../components.js';
import { fetchLinkPreview } from './fetch-link-preview.helper.js';
import { type LinkPreviewData } from './link-preview-data.type.js';
import styles from './styles.module.scss';

type Properties = { url: string; withHeader?: boolean };

const LinkPreview: React.FC<Properties> = ({ url, withHeader = false }) => {
    const [previewData, setPreviewData] = useState<LinkPreviewData | null>(
        null,
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await fetchLinkPreview(url);
            setPreviewData(data);
            setLoading(false);
        };

        void fetchData();
    }, [url]);

    if (loading) {
        return (
            <Grid
                container
                className={getValidClassNames(
                    styles.container,
                    styles.skeleton,
                )}
            >
                {withHeader && (
                    <>
                        <div
                            className={getValidClassNames(
                                styles.title,
                                styles.skeleton,
                            )}
                        ></div>
                        <div
                            className={getValidClassNames(
                                styles.description,
                                styles.skeleton,
                            )}
                        ></div>
                    </>
                )}
                <Grid
                    container
                    item
                    className={getValidClassNames(
                        styles.imgWrapper,
                        styles.skeleton,
                    )}
                >
                    Loading...
                </Grid>
            </Grid>
        ); // TODO: add loader or skeleton
    }

    // if (!previewData) {
    //     return <p>Failed to fetch link preview.</p>; // TODO: add broken card placeholder
    // }

    return (
        <Grid container className={styles.container}>
            {withHeader && (
                <>
                    <Typography variant="h3" className={styles.title}>
                        {previewData ? previewData.title : 'Bad link'}
                    </Typography>
                    <Typography variant="body1" className={styles.description}>
                        {previewData ? previewData.description : 'Bad link'}
                    </Typography>
                </>
            )}

            <Grid container item className={styles.imgWrapper}>
                {previewData?.image ? (
                    <img
                        src={previewData.image}
                        alt="Link Preview"
                        className={styles.image}
                    />
                ) : (
                    <Grid container item className={styles.imagePlaceholder}>
                        <Typography variant="h3" className={styles.notFound}>
                            Something went wrong...
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export { LinkPreview };
