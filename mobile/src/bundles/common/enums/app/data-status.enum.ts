const DataStatus = {
    IDLE: 'idle',
    CHECK_TOKEN: 'checkToken',
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
} as const;

export { DataStatus };
