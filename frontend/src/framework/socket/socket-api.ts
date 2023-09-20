import { type Socket as SocketClient } from 'socket.io-client';
import { io } from 'socket.io-client';

import { type SocketNamespace } from './enums/enums.js';
import { type ValueOf } from './types/types.js';

class Socket {
    public getInstance(
        namespace: ValueOf<typeof SocketNamespace>,
    ): SocketClient {
        return io(`http://localhost:3001${namespace}`);
    }
}

export { Socket };
