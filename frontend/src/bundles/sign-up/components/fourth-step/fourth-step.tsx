type Properties = {
    onSubmit: () => void;
};

const FourthStep: React.FC<Properties> = ({ onSubmit }) => {
    onSubmit();
    return <p>Hey</p>;
};

export { FourthStep };
