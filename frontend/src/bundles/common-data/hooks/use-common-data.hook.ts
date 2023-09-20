import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';

import {
    convertBsaBadgesApiResponseIntoSelectOptions,
    convertHardSkillsApiResponseIntoAutoselectOptions,
} from '../helpers/helpers.js';
import { actions as commonDataActions } from '../store/common-data.js';
import { type AutoselectOptions } from '../types/autoselect-options.js';

type UseCommonDataReturnType = {
    bsaBadgesOptions: AutoselectOptions;
    hardSkillsOptions: AutoselectOptions;
};

const useCommonData = (): UseCommonDataReturnType => {
    const dispatch = useAppDispatch();
    const { bsaBadgesData, hardSkillsData } = useAppSelector(
        (state) => state.commonData,
    );

    useEffect(() => {
        if (!hardSkillsData) {
            void dispatch(commonDataActions.getHardSkillsData());
        }
        if (!bsaBadgesData) {
            void dispatch(commonDataActions.getBsaBadgesData());
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
