import { type ShowMessageArguments } from '~/framework/notifications/types/show-message-arguments';

type Notification = {
    showError: (message: ShowMessageArguments) => void;
    showSuccess: (message: ShowMessageArguments) => void;
};
export { type Notification };
