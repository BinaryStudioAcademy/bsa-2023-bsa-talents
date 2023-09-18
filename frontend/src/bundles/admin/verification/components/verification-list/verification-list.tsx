import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { VerificationListItem } from '../verification-list-item/verification-list-item.js';
import { employers, talents } from './../../mock-data/mock-data.js';
import styles from './styles.module.scss';

type Properties = {
    isFilterOpen: boolean;
    isScreenMoreMd: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FilterValues = 'talents' | 'employers';

const VerificationList: React.FC<Properties> = ({
    isFilterOpen,
    setIsFilterOpen,
    isScreenMoreMd,
}) => {
    const [selected, setSelected] = useState<string>('');
    const [filter, setFilter] = useState<FilterValues>('talents');

    const handleListSelect = useCallback(
        (id: string): void => {
            setSelected(id);

            if (!isScreenMoreMd && isFilterOpen) {
                setIsFilterOpen(false);
            }
        },
        [isFilterOpen, isScreenMoreMd, setIsFilterOpen],
    );

    const handleFilterChange = useCallback(
        (_event: React.MouseEvent<HTMLButtonElement>): void => {
            const button = _event.target as HTMLButtonElement;
            setFilter(button.id as FilterValues);
        },
        [],
    );

    const items = filter === 'talents' ? talents : employers;

    const lists = items.map((it) => (
        <VerificationListItem
            id={it.userId}
            isSelected={it.userId === selected}
            onSelect={handleListSelect}
            key={it.userId}
            name={it.username}
            imageSrc={it.avatar}
        />
    ));

    return (
        <>
            <Grid className={styles.wrapper}>
                <Grid className={styles.filters}>
                    <Button
                        id={'talents'}
                        onClick={handleFilterChange}
                        label={`Talents (${talents.length})`}
                        className={getValidClassNames(
                            styles.button,
                            styles.talents,
                            filter === 'talents' && styles.active,
                        )}
                    />
                    <Button
                        id={'employers'}
                        onClick={handleFilterChange}
                        label={`Employers (${employers.length})`}
                        className={getValidClassNames(
                            styles.button,
                            styles.employers,
                            filter === 'employers' && styles.active,
                        )}
                    />
                </Grid>
                <Grid className={styles.list}>
                    <ul>{lists}</ul>
                </Grid>
            </Grid>
        </>
    );
};

export { VerificationList };
