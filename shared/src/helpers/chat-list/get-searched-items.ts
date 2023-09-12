import { type ChatListItemType } from '~/index';

const getSearchedItems = (
    items: ChatListItemType[],
    query: string,
): ChatListItemType[] => {
    return query
        ? items.filter((item) => item.username.includes(query))
        : items;
};

export { getSearchedItems };
