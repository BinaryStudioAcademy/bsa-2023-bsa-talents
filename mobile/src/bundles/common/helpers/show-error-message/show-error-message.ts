import { notifications } from '~/framework/notifications/notifications';

const showErrorMessage = (error: Error): void => {
    notifications.showError(error.message);
};

export { showErrorMessage };
