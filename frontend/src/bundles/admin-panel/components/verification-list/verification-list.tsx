import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import {
    type FilterValues,
    type UserDetailsShortResponseDto,
} from '../../types/types.js';
import { VerificationListItem } from '../verification-list-item/verification-list-item.js';
import styles from './styles.module.scss';

type Properties = {
    items: UserDetailsShortResponseDto[];
    filter: string;
    selectedId: string | null;
    isFilterOpen: boolean;
    isScreenMoreMd: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
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
            setSelectedId('');
        },
        [setFilter, setSelectedId],
    );

    const list = items.map((it) => (
        <VerificationListItem
            id={it.userId}
            isSelected={it.userId === selectedId}
            onSelect={handleListSelect}
            key={it.userId}
            name={it.fullName}
            imageSrc={it.photoUrl}
        />
    ));

    return (
        <>
            <Grid className={styles.wrapper}>
                <Grid className={styles.filters}>
                    <Button
                        id={'talent'}
                        onClick={handleFilterChange}
                        label="Talents"
                        className={getValidClassNames(
                            styles.button,
                            styles.talents,
                            filter === 'talent' && styles.active,
                        )}
                    />
                    <Button
                        id={'employer'}
                        onClick={handleFilterChange}
                        label="Employers"
                        className={getValidClassNames(
                            styles.button,
                            styles.employers,
                            filter === 'employer' && styles.active,
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
