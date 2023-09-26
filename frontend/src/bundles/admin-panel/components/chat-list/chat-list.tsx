import { Grid } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type MockData } from '../../types/types.js';
import { VerificationListItem } from '../verification-list-item/verification-list-item.js';
import styles from './styles.module.scss';

type Properties = {
    items: MockData[];
    selectedId: string;
    isFilterOpen: boolean;
    isScreenMoreMd: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

const ChatList: React.FC<Properties> = ({
    items,
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
                <Grid className={styles.list}>
                    <ul>{list}</ul>
                </Grid>
            </Grid>
        </>
    );
};

export { ChatList };
