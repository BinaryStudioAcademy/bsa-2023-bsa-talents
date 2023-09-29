import { getValidClassNames } from '../../helpers/helpers.js';
import { useCallback, useState } from '../../hooks/hooks.js';
import { Button, Grid, Typography } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    rows: {
        title: string;
        text: string;
    }[];
};

const MultiRead: React.FC<Properties> = ({ rows = [] }) => {
    const [selectedId, setSelectedId] = useState(0);

    const handleSelect = useCallback(
        (index: number) => (): void => {
            setSelectedId(index);
        },
        [setSelectedId],
    );

    const html = {
        __html: rows[selectedId].text,
    };

    return (
        <Grid container className={styles.container}>
            <Grid container item className={styles.list}>
                {rows.map((row, index) => (
                    <Button
                        key={index}
                        variant="text"
                        type="button"
                        label={row.title}
                        className={getValidClassNames(
                            styles.title,
                            selectedId === index && styles.selected,
                        )}
                        onClick={handleSelect(index)}
                    />
                ))}
            </Grid>

            <Grid container item className={styles.textWrapper}>
                <Typography variant="input" className={styles.text}>
                    <div dangerouslySetInnerHTML={html}></div>
                    {/* {rows[selectedId].text} */}
                </Typography>
            </Grid>
        </Grid>
    );
};

export { MultiRead };
