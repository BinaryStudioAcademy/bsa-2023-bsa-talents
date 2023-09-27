import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import {
    getBadgesData,
    getHardSkillsData,
} from '~/bundles/common-data/store/actions';
import { type UseCommonDataReturn } from '~/bundles/common-data/types/types';

const useCommonData = (): UseCommonDataReturn => {
    const dispatch = useAppDispatch();
    const { badgesData, dataStatus, hardSkillsData } = useAppSelector(
        ({ commonData }) => commonData,
    );

    useEffect(() => {
        if (!badgesData) {
            void dispatch(getBadgesData());
        }
        if (!hardSkillsData) {
            void dispatch(getHardSkillsData());
        }
    }, [hardSkillsData, badgesData, dispatch]);

    return { dataStatus, badgesData, hardSkillsData };
};

export { useCommonData };
