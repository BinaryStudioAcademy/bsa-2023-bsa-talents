import 'react-toastify/dist/ReactToastify.css';

import { type ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

const Notifications = (): ReactElement => {
    return <ToastContainer theme="colored" />;
};

export { Notifications };
