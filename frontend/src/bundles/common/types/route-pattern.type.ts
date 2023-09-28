type RoutePattern<T extends string> = T extends `${infer Start}:${string}`
    ? `${Start}${string}`
    : T;

export { type RoutePattern };
