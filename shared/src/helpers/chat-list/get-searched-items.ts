import { type ChatListItemType } from '~/index.js';

const getSearchedItems = (
    items: ChatListItemType[],
    query: string,
): ChatListItemType[] => {
    return query
        ? items.filter((item) => item.username.includes(query))
        : items;
};

export { getSearchedItems };
