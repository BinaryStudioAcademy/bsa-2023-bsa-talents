const getAvatarInitials = (fullName: string): string => {
    const [name, secondName] = fullName.split(' ');
    const firstCharIndex = 0;
    return `${name[firstCharIndex].toUpperCase()}${secondName[
        firstCharIndex
    ].toUpperCase()}`;
};

export { getAvatarInitials };
