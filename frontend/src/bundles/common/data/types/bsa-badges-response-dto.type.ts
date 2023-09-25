type BsaBadgesItem = {
    id: string;
    type: string;
    name: string;
    maxScore: number | null;
};

type BsaBadgesResponseDto = {
    items: BsaBadgesItem[];
};

export { type BsaBadgesResponseDto };
