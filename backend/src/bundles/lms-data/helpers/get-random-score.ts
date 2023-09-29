const MOCK_SCORE = 3;
const MAX_SCORE = 5;
const DECIMAL_PLACES = 2;

const getRandomScore = (): number => {
    const randomValue = MOCK_SCORE + Math.random() * (MAX_SCORE - MOCK_SCORE);
    return Number(randomValue.toFixed(DECIMAL_PLACES));
};

export { getRandomScore };
