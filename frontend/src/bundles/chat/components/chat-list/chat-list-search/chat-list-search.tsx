import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const ChatListSearch: React.FC<Properties> = ({
    searchValue,
    setSearchValue,
}) => {
    const handleChange = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            setSearchValue(event.currentTarget.value);
        },
        [setSearchValue],
    );

    return (
        <input
            className={styles.search}
            onKeyUpCapture={handleChange}
            defaultValue={searchValue}
            placeholder="Search messages"
        />
    );
};

export { type Properties as ChatListSearchProperties };
export { ChatListSearch };
