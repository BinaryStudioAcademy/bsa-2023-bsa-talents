import { type ShowMessageArguments } from '~/framework/notifications/types/show-message-arguments';

type Notification = {
    showError: (message: string) => void;
    showMessage: (message: ShowMessageArguments) => void;
};
export { type Notification };
