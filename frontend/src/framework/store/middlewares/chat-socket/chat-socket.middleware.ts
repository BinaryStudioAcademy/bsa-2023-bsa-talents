// import { type Middleware } from '@reduxjs/toolkit';

// import { socket, SocketNamespace } from '~/framework/socket/socket.js';
// import { type store } from '~/framework/store/store.js';

// type SocketMiddlewareParameters = {
//     dispatch: typeof store.instance.dispatch;
// };

// const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

// const chatSocket: Middleware = ({ dispatch }: SocketMiddlewareParameters) => {
//     return (next) => (action) => {
//         return next(action);
//     };
// };

const chatSocket = (n: number): number => n;

export { chatSocket };
