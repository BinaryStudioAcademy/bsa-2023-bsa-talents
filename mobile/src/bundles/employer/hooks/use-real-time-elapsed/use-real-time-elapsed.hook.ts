import { useEffect, useState } from '~/bundles/common/hooks/hooks';
import { getElapsedTime } from '~/bundles/employer/helpers/helpers';

import { UPDATE_INTERVAL } from './constants/constants';

const useRealTimeElapsed = (startDate: string): string => {
    const [elapsedTime, setElapsedTime] = useState<string>(
        getElapsedTime(startDate),
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newElapsedTime = getElapsedTime(startDate);
            setElapsedTime(newElapsedTime);
        }, UPDATE_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };
    }, [startDate]);

    return elapsedTime;
};

export { useRealTimeElapsed };
