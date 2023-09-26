import { type BadgesItem } from '~/bundles/common/types/types';

const getBadgeById = (data: BadgesItem[], id: string): BadgesItem => {
    return data.find((value) => value.id === id) as BadgesItem;
};

export { getBadgeById };
