const getAvatarInitials = (fullName: string): string => {
    const [name, secondName] = fullName.split(' ');
    const firstCharIndex = 0;

    return secondName
        ? `${name[firstCharIndex].toUpperCase()}${secondName[
              firstCharIndex
          ].toUpperCase()}`
        : `${name[firstCharIndex].toUpperCase()}`;
};

export { getAvatarInitials };
