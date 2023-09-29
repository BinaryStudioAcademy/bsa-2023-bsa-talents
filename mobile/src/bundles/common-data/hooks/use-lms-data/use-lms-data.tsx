import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { loadLMSData } from '~/bundles/common-data/store/actions';
import { type LMSDataResponseDto } from '~/bundles/common-data/types/types';

const useLmsData = (userId = ''): LMSDataResponseDto | null => {
    const { lmsData } = useAppSelector(({ commonData }) => commonData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!lmsData) {
            void dispatch(loadLMSData({ userId }));
        }
    }, [dispatch, lmsData, userId]);

    return lmsData;
};

export { useLmsData };
