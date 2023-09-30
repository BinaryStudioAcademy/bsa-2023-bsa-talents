import { Tooltip } from '~/bundles/common/components/components.js';

const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|localhost:)?(localhost|[\da-z]+([.-][\da-z]+)*\.[a-z]{2,5}(:\d{1,5})?(\/.*)?)$/gm;

// TODO: LOCALHOST SHOULD BE REMOVED FOR PROD
const LOCALHOST_URL_REGEX = /^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/gm;

const GENERAL_LINK_REGEX = /^http:\/\/.*$/gm;

const parseMessage = (message: string): JSX.Element => {
    const words = message.split(' ');
    return (
        <span>
            {words.map((word) => {
                const [link, specialPrefix] = word.split('_&_').reverse();
                const isLink =
                    URL_REGEX.test(link) ||
                    LOCALHOST_URL_REGEX.test(link) ||
                    GENERAL_LINK_REGEX.test(link);

                const isCVLink = isLink && specialPrefix === 'CV';
                const isProfileLink = isLink && specialPrefix === 'Profile';
                const isVacancyPosition =
                    isLink && specialPrefix.includes('Vacancy');

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
                    case isVacancyPosition: {
                        linkTo = link;
                        label = 'Vacancy Information';
                        break;
                    }
                    default: {
                        linkTo = link;
                        label = link;
                        break;
                    }
                }

                return isLink ? (
                    <Tooltip title={linkTo}>
                        <div>
                            <a
                                className={'message-link'}
                                href={linkTo}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {label}
                            </a>
                            {'\n'}
                        </div>
                    </Tooltip>
                ) : (
                    label + ' '
                );
            })}
        </span>
    );
};

export { parseMessage };
