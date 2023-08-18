import { useDispatch } from 'react-redux';

import { type store } from '~/framework/store/store';

const useAppDispatch: () => typeof store.instance.dispatch = () =>
    useDispatch<typeof store.instance.dispatch>();

export { useAppDispatch };
