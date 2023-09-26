import { type DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type BadgesResponseDto,
    type FormattedHardSkills,
} from '~/bundles/common-data/types/types';

type UseCommonDataReturn = {
    dataStatus: ValueOf<typeof DataStatus>;
    badgesData: BadgesResponseDto | null;
    hardSkillsData: FormattedHardSkills | null;
};

export { type UseCommonDataReturn };
