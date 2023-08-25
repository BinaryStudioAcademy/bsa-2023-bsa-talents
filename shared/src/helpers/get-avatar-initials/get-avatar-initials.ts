const getAvatarInitials = (fullName: string): string => {
    const [name, secondName] = fullName;
    const firstCharIndex = 0;
    return `${name[firstCharIndex].toUpperCase()}${secondName[
        firstCharIndex
    ].toUpperCase()}`;
};

export { getAvatarInitials };
