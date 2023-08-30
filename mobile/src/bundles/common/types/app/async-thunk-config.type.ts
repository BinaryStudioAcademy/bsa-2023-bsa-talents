import { type store } from '~/framework/store/store';

type AsyncThunkConfig = {
    rejectValue: string;
    state: ReturnType<typeof store.instance.getState>;
    dispatch: typeof store.instance.dispatch;
    extra: typeof store.extraArguments;
};

export { type AsyncThunkConfig };
