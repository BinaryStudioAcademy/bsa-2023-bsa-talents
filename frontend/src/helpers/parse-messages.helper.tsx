const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|localhost:)?(localhost|[\da-z]+([.-][\da-z]+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?)$/gm;

// TODO: LOCALHOST SHOULD BE REMOVED FOR PROD
const LOCALHOST_URL_REGEX = /^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/gm;

const parseMessage = (message: string): JSX.Element => {
    const words = message.split(' ');

    return (
        <span>
            {words.map((word) => {
                return URL_REGEX.test(word) ||
                    LOCALHOST_URL_REGEX.test(word) ? (
                    <>
                        <a
                            className={'message-link'}
                            href={word}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {word}
                        </a>{' '}
                    </>
                ) : (
                    word + ' '
                );
            })}
        </span>
    );
};

export { parseMessage };
