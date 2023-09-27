import { type FormattedHardSkillsItem } from '~/bundles/common-data/types/types';

const getHardSkillByValue = (
    data: FormattedHardSkillsItem[],
    id: string,
): FormattedHardSkillsItem => {
    return data.find(({ value }) => value === id) as FormattedHardSkillsItem;
};

export { getHardSkillByValue };
