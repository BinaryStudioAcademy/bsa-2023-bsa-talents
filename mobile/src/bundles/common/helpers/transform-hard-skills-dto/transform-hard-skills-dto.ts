import {
    type AutocompleteMultiSelectorValue,
    type HardSkillsResponseDto,
} from '~/bundles/common/types/types';

const transformHardSkillsDto = (
    payload: HardSkillsResponseDto | null,
): AutocompleteMultiSelectorValue[] => {
    return payload
        ? payload.items.map((skills) => ({
              label: skills.name,
              value: skills.name,
          }))
        : [];
};

export { transformHardSkillsDto };
