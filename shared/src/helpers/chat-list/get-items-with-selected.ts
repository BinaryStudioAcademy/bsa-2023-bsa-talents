import { type ChatListItemType } from '~/index.js';

const getItemsWithSelected = (
    items: ChatListItemType[],
    id: string,
): ChatListItemType[] => {
    return items.map((item) => ({
        ...item,
        isSelected: item.userId === id,
    }));
};

export { getItemsWithSelected };
