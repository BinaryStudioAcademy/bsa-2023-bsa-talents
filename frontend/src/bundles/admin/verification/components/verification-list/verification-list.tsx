import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type FilterValues, type MockData } from '../../types/types.js';
import { VerificationListItem } from '../verification-list-item/verification-list-item.js';
import { employers, talents } from './../../mock-data/mock-data.js';
import styles from './styles.module.scss';

type Properties = {
    items: MockData[];
    filter: string;
    selectedId: string;
    isFilterOpen: boolean;
    isScreenMoreMd: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>;
    setFilter: React.Dispatch<React.SetStateAction<FilterValues>>;
};

const VerificationList: React.FC<Properties> = ({
    items,
    filter,
    setFilter,
    selectedId,
    isFilterOpen,
    isScreenMoreMd,
    setSelectedId,
    setIsFilterOpen,
}) => {
    const handleListSelect = useCallback(
        (id: string): void => {
            setSelectedId(id);

            if (!isScreenMoreMd && isFilterOpen) {
                setIsFilterOpen(false);
            }
        },
        [isFilterOpen, isScreenMoreMd, setIsFilterOpen, setSelectedId],
    );

    const handleFilterChange = useCallback(
        (_event: React.MouseEvent<HTMLButtonElement>): void => {
            const button = _event.target as HTMLButtonElement;
            setFilter(button.id as FilterValues);
        },
        [setFilter],
    );

    const list = items.map((it) => (
        <VerificationListItem
            id={it.userId}
            isSelected={it.userId === selectedId}
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
                    <ul>{list}</ul>
                </Grid>
            </Grid>
        </>
    );
};

export { VerificationList };
