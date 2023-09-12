import { type ChatListItemType } from '~/index';

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
