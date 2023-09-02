import {
    Avatar,
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

type Properties = {
    companyData: {
        logoUrl: string;
        name: string;
        contactPerson: string;
        info: string;
        url: string;
    };
};

const CompanyInfo: React.FC<Properties> = ({
    companyData: { logoUrl, name, contactPerson, info, url },
}) => {
    return (
        <Grid>
            <Grid>
                <Avatar userFullName={name} url={logoUrl} />
                <Grid>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="body1">{contactPerson}</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography variant="body1">About {name}</Typography>
                <p>{info}</p>
                <Typography variant="body1">Company Website</Typography>
                <a href={url} rel="noreferrer" target="_blank">
                    {url}
                </a>
            </Grid>
            <Grid>
                <Button label="Share your contact and CV" />
                <Button label="The company already hired me" />
            </Grid>
        </Grid>
    );
};

export { CompanyInfo };
