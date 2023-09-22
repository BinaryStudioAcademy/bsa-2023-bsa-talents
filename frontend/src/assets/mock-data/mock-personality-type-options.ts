const mockPersonalityTypeOptions = Object.values({
    DOER: 'Doer',
    CONNECTOR: 'Connector',
    THINKER: 'Thinker',
}).map((type) => ({
    value: type,
    label: type,
}));

export { mockPersonalityTypeOptions };
