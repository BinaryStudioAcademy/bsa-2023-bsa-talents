import {
    type AutoselectOptions,
    type BsaBadgesResponseDto,
} from '~/bundles/common-data/types/types.js';

const convertBsaBadgesApiResponseIntoSelectOptions = (
    bsaBadgesApiResponse: BsaBadgesResponseDto | null,
): AutoselectOptions => {
    return bsaBadgesApiResponse
        ? bsaBadgesApiResponse.items.map((badge) => ({
              label: badge.name,
              value: badge.id,
          }))
        : [];
};

export { convertBsaBadgesApiResponseIntoSelectOptions };
