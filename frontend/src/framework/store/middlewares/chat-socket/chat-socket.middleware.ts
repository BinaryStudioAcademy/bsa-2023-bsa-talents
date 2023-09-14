// import { type Middleware } from '@reduxjs/toolkit';

// import {
//     socket,
//     SocketEvent,
//     SocketNamespace,
// } from '~/framework/socket/socket.js';
// import { type store } from '~/framework/store/store.js';

// type SocketMiddlewareParameters = {
//     dispatch: typeof store.instance.dispatch;
// };

// const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

// const chatSocket: Middleware = ({ dispatch }: SocketMiddlewareParameters) => {
//     chatSocketInstance.on(SocketEvent.CHAT_ADD_MESSAGE, (message) => {
//         dispatch(chatActions.addMessage(message));
//     });

//     return (next) => (action) => {
//         return next(action);
//     };
// };

const chatSocket = (n: number): number => n;

export { chatSocket };
