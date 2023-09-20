type BsaBadgesItem = {
    id: string;
    type: string;
    name: string;
    maxScore: number;
};

type BsaBadgesResponseDto = {
    items: BsaBadgesItem[];
};

export { type BsaBadgesResponseDto };
