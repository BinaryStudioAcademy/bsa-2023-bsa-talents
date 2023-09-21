import {
    type AutoselectOptions,
    type HardSkillsResponseDto,
} from '~/bundles/common-data/types/types.js';

const convertHardSkillsApiResponseIntoAutoselectOptions = (
    hardSkillsApiResponse: HardSkillsResponseDto | null,
): AutoselectOptions => {
    return hardSkillsApiResponse
        ? hardSkillsApiResponse.items.map((skills) => ({
              label: skills.name,
              value: skills.id,
          }))
        : [];
};

export { convertHardSkillsApiResponseIntoAutoselectOptions };
