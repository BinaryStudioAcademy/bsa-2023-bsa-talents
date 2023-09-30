const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|localhost:)?(localhost|[\da-z]+([.-][\da-z]+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?)$/gm;

const parseMessage = (message: string): JSX.Element => {
    const words = message.split(' ');

    return (
        <span>
            {words.map((word) => {
                const [link, specialPrefix] = word.split('_&_').reverse();
                const isLink = URL_REGEX.test(link);
                const isCVLink = isLink && specialPrefix === 'CV';
                const isProfileLink = isLink && specialPrefix === 'Profile';

                let linkTo: string;
                let label: string;

                switch (true) {
                    case isCVLink: {
                        linkTo = link;
                        label = 'Candidate CV';
                        break;
                    }
                    case isProfileLink: {
                        linkTo = link;
                        label = 'Profile Information';
                        break;
                    }
                    default: {
                        linkTo = link;
                        label = link;
                        break;
                    }
                }

                return isLink ? (
                    <>
                        <a
                            className={'message-link'}
                            href={linkTo}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {label}
                        </a>{' '}
                    </>
                ) : (
                    label + ' '
                );
            })}
        </span>
    );
};

export { parseMessage };
