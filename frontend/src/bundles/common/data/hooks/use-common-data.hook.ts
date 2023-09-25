import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';

import { actions as bsaBadgesActions } from '../bsa-badges/store/bsa-badges.js';
import { actions as hardSkillsActions } from '../hard-skills/store/hard-skills.js';
import {
    convertBsaBadgesApiResponseIntoSelectOptions,
    convertHardSkillsApiResponseIntoAutoselectOptions,
} from '../helpers/helpers.js';
import { type AutoselectOptions } from '../types/autoselect-options.js';

type UseCommonDataReturnType = {
    bsaBadgesOptions: AutoselectOptions;
    hardSkillsOptions: AutoselectOptions;
};

const useCommonData = (): UseCommonDataReturnType => {
    const dispatch = useAppDispatch();
    const { hardSkillsData } = useAppSelector((state) => state.hardSkills);
    const { bsaBadgesData } = useAppSelector((state) => state.bsaBadges);

    useEffect(() => {
        if (!hardSkillsData) {
            void dispatch(hardSkillsActions.getHardSkillsData());
        }
        if (!bsaBadgesData) {
            void dispatch(bsaBadgesActions.getBsaBadgesData());
        }
    }, [dispatch, bsaBadgesData, hardSkillsData]);

    const hardSkillsOptions = useMemo(() => {
        return convertHardSkillsApiResponseIntoAutoselectOptions(
            hardSkillsData,
        );
    }, [hardSkillsData]);

    const bsaBadgesOptions = useMemo(() => {
        return convertBsaBadgesApiResponseIntoSelectOptions(bsaBadgesData);
    }, [bsaBadgesData]);

    return {
        bsaBadgesOptions,
        hardSkillsOptions,
    };
};

export { useCommonData };
