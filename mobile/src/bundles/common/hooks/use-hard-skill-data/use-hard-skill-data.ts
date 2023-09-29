import { useMemo } from '~/bundles/common/hooks/hooks';
import { type HardSkillItemResponse } from '~/bundles/common/types/types';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import { type FormattedHardSkillsItem } from '~/bundles/common-data/types/types';

const useHardSkillData = (
    hardSkillsResponse?: HardSkillItemResponse[],
): FormattedHardSkillsItem[] => {
    const { hardSkillsData } = useCommonData();

    return useMemo(() => {
        if (!hardSkillsResponse || !hardSkillsData) {
            return [];
        }

        return hardSkillsResponse.map(
            (hardSkill) =>
                hardSkillsData.items.find(
                    (item) => item.value === hardSkill.hardSkillId,
                ) as FormattedHardSkillsItem,
        );
    }, [hardSkillsResponse, hardSkillsData]);
};

export { useHardSkillData };
