import { ManageSearch } from '@mui/icons-material';

import {
    Avatar,
    Button,
    Grid,
    IconButton,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useMediaQuery,
    useState,
    useTheme,
} from '~/bundles/common/hooks/hooks.js';

import { VerificationList } from './components/components.js';
import { PreviewTabs } from './constants/constants.js';
import { employers, talents } from './mock-data/mock-data.js';
import styles from './styles.module.scss';
import { type FilterValues, type ValueOf } from './types/types.js';

const AdminPanel: React.FC = () => {
    const [filter, setFilter] = useState<FilterValues>('talents');
    type TabValues = ValueOf<typeof PreviewTabs>;
    const items = filter === 'talents' ? talents : employers;
    const FIRST_INDEX = 0;
    const theme = useTheme();

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>(
        items[FIRST_INDEX]?.userId,
    );
    const [selectedTab, setSelectedTab] = useState<TabValues>(
        PreviewTabs.PROFILE,
    );

    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isTogglePreviewAllowed = !isScreenMoreMD && isFilterOpen;

    // TODO: Change mock data to data from DB.
    const selected = items.find((it) => it.userId === selectedId);

    const handleSelectTab = useCallback(
        (_event: React.MouseEvent<HTMLSpanElement>): void => {
            const button = _event.target as HTMLSpanElement;
            setSelectedTab(button.textContent as TabValues);
        },
        [],
    );

    const previewTabs = Object.values(PreviewTabs).map((tab) => (
        <Button
            key={tab}
            onClick={handleSelectTab}
            className={getValidClassNames(
                styles.tab,
                selectedTab === tab ? 'selected' : '',
            )}
            disableRipple={true}
        >
            {tab}
        </Button>
    ));

    const handleFilterShow = useCallback((): void => {
        setIsFilterOpen((previous) => !previous);
    }, []);

    useEffect(() => {
        if (isScreenMoreMD) {
            setIsFilterOpen(true);
        }
    }, [isScreenMoreMD]);

    return (
        <Grid container className={styles.pageWrapper}>
            <Grid item className={styles.pageTitle}>
                <Typography className={styles.headerText} variant="h1">
                    Verifications
                </Typography>
                <Grid item className={styles.mobileFilter} tabIndex={0}>
                    {!isScreenMoreMD && (
                        <IconButton onClick={handleFilterShow}>
                            <ManageSearch fontSize="large" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid container item className={styles.pageContent}>
                <Grid
                    item
                    className={getValidClassNames(
                        styles.filterWrapper,
                        isFilterOpen ? '' : 'hidden',
                    )}
                >
                    <VerificationList
                        items={items}
                        filter={filter}
                        setFilter={setFilter}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        isScreenMoreMd={isScreenMoreMD}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                    />
                </Grid>
                {
                    <Grid
                        container
                        item
                        className={getValidClassNames(
                            styles.previewWrapper,
                            isTogglePreviewAllowed ? 'hidden' : '',
                        )}
                    >
                        <Grid className={styles.previewHeader}>
                            <Avatar
                                className={styles.avatar}
                                src={selected?.avatar}
                            />
                            <Typography variant="body1" className={styles.name}>
                                {selected?.username ?? 'username'}
                            </Typography>
                        </Grid>
                        <Grid className={styles.tabs}>{previewTabs}</Grid>
                        <Grid item className={styles.previewInfo}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Sapiente ipsum tempora aliquam et ullam
                            praesentium perferendis temporibus neque, assumenda
                            quibusdam facere cum beatae alias corrupti
                            doloremque deserunt accusantium reiciendis sed. Ab
                            quo, nostrum iure inventore quos tenetur magnam
                            dolorum, ipsam, ratione eveniet modi eligendi. Nihil
                            maiores possimus illum aperiam et rerum eius
                            accusamus consequuntur rem, ullam quas similique.
                            Illum, dignissimos. Magnam voluptatum minima ut
                            praesentium natus, molestiae neque ad sint
                            temporibus deserunt illum voluptate provident esse
                            libero iste laborum a sit odio corrupti voluptatibus
                            animi! Aperiam amet veritatis similique maxime.
                            Fugiat debitis illum vitae magnam dolorum ratione
                            doloribus voluptas, tempore velit non, quasi fuga
                            recusandae deserunt! Recusandae natus libero ea
                            alias, quam odit dolorem dolorum culpa commodi porro
                            placeat totam? Labore non voluptates ducimus,
                            recusandae libero pariatur? Eius quidem in, quia cum
                            necessitatibus eveniet atque sed. Placeat ipsa
                            accusamus distinctio repellendus non ab explicabo,
                            saepe itaque aperiam, laborum iure possimus? Debitis
                            dolorum quae animi cumque, assumenda aperiam sint
                            perspiciatis eveniet et facere porro id in dolor
                            ratione. Minus minima est delectus earum. Ratione
                            commodi consequatur odio sapiente dolorem quo?
                            Distinctio? Corrupti doloremque aut nesciunt cumque
                            libero dolore quam consectetur velit recusandae
                            earum sequi distinctio excepturi illo itaque non
                            molestiae error quos, optio beatae modi
                            reprehenderit. Tempore, error? Doloremque, cumque
                            optio. Doloremque sequi earum ullam provident
                            veritatis, suscipit tempora repudiandae similique,
                            consectetur dolor dicta saepe culpa asperiores
                            natus, assumenda obcaecati? Sunt rerum itaque
                            consectetur at impedit excepturi, temporibus
                            officiis possimus similique. Quibusdam optio vero et
                            obcaecati autem odio enim deserunt nulla ex
                            excepturi quidem aliquid rem, harum neque
                            reiciendis? Quibusdam optio quae tenetur expedita
                            numquam harum itaque ipsum reprehenderit, blanditiis
                            repellendus. Rerum aliquid in dignissimos cum quae
                            autem, ipsum, est, inventore veritatis vel
                            architecto saepe minima atque maxime a perspiciatis!
                            Explicabo impedit officiis hic deleniti omnis natus
                            minima perspiciatis eum magnam! Velit, ducimus
                            numquam? Nisi quos temporibus unde nemo at sit
                            alias. Asperiores ipsa, quam, ullam facere
                            accusantium autem fugit quos magni quo dolores
                            cupiditate quia sunt a cum dolor voluptatibus? Illum
                            sint molestiae id fuga optio recusandae, sit
                            veritatis officia, numquam ut nihil eligendi
                            suscipit error aliquam inventore, repellendus
                            ducimus labore! Tempore eaque autem quis? Asperiores
                            eum cupiditate pariatur. Velit. Vero assumenda
                            tempore dolorum, eum nemo quia unde, expedita dicta
                            ipsum recusandae reiciendis delectus rerum quis
                            perferendis deserunt natus! Non tempora repudiandae
                            ipsum assumenda illum aut praesentium, nemo
                            necessitatibus quod. Iusto esse molestiae
                            praesentium repellendus, dolores velit consectetur
                            eveniet pariatur quisquam vero nam quas facilis
                            omnis error corrupti quia repellat, cum dolor
                            temporibus ea. Itaque maxime delectus placeat
                            deleniti nihil. Ab dolorem omnis vitae, nihil
                            doloribus rerum laborum et quae consequatur error
                            iusto provident dicta animi consequuntur delectus a
                            cupiditate earum veritatis dignissimos suscipit
                            veniam eum! Maxime distinctio repudiandae ratione?
                            Inventore deleniti dolores atque, recusandae
                            necessitatibus ipsum omnis molestias fugiat ipsam
                            nostrum nobis amet quo natus temporibus consequatur
                            incidunt deserunt porro praesentium itaque,
                            reiciendis similique ipsa voluptatum in!
                            Praesentium, modi? Vitae suscipit laudantium
                            delectus corrupti sed ea dolor, nulla id accusamus
                            nisi veniam numquam facilis, dolore aspernatur vel
                            modi, est hic velit tempora! Iusto inventore nostrum
                            velit consectetur molestias necessitatibus. At
                            laborum, vero ullam exercitationem voluptates ad a
                            ut fugit expedita rem, accusamus possimus, dolores
                            natus dicta. Sunt libero nostrum doloremque, magni
                            ullam quibusdam! Explicabo itaque laborum quasi
                            veniam assumenda. Mollitia necessitatibus
                            consequatur amet numquam, laudantium, delectus ex
                            laboriosam, cumque esse alias veritatis. Rem sed
                            modi tempora sunt fugit nihil accusantium cum!
                            Laborum facilis rerum fugiat placeat ad obcaecati
                            fugit. Blanditiis, incidunt cum consequatur placeat
                            veritatis sapiente alias cupiditate odit maxime,
                            dolores necessitatibus quod consectetur sunt aperiam
                            aspernatur. Quo aperiam tempore similique doloribus
                            laboriosam vitae esse quidem hic inventore eius.
                            Neque, possimus sapiente doloribus, qui commodi odit
                            aliquam id non explicabo cumque tenetur odio
                            repellat eos saepe mollitia consectetur fugit quis
                            vitae debitis corrupti eaque amet fugiat. Tempore,
                            voluptatem eveniet. Tempore doloribus et omnis
                            dolore eligendi exercitationem voluptatem velit quo
                            accusamus aspernatur dolorum, veniam doloremque
                            libero expedita ratione qui consectetur sint
                            repellendus. Totam fugiat repellat quos neque
                            laudantium unde quae! Deserunt, optio nesciunt
                            suscipit expedita eligendi assumenda voluptate nam
                            laudantium mollitia voluptatibus, aut fugiat
                            laboriosam quam aperiam nulla explicabo architecto
                            dicta dolor voluptatum harum facere minima? Fugiat
                            voluptate culpa pariatur. Sint accusamus vel nulla
                            alias, qui repudiandae debitis neque sapiente vitae
                            illum consectetur suscipit, maiores asperiores quod
                            a sequi voluptate architecto excepturi rerum error
                            quo ipsum, ipsam deleniti est. Dicta. Voluptatum
                            cumque libero quos dolores voluptatibus? Nemo
                            debitis sequi sed hic impedit laboriosam autem sit
                            ipsum, laudantium praesentium quaerat, dolor aliquid
                            eos. Consequatur quam quaerat at facilis, natus
                            voluptatibus dolores. Iste, atque nihil ex, id
                            deleniti laboriosam architecto, tempore aut facere
                            provident dolores odio eligendi reiciendis facilis
                            illum non voluptatem ea cum cupiditate animi fugiat
                            expedita hic? Ut, voluptates eveniet. Facere qui
                            cupiditate nihil atque, reiciendis inventore optio
                            cum! Reprehenderit, sunt officia? Impedit autem aut
                            perferendis quisquam eius dolorem quas voluptatibus!
                            Voluptate quibusdam culpa inventore voluptates hic
                            asperiores magnam qui. Ipsam quis consectetur sed
                            ratione vel at velit odit, aperiam rerum sequi
                            veritatis expedita laudantium. Eveniet libero eum
                            est amet iusto, suscipit quam neque architecto
                            tempore. Facilis sunt esse ab! Et temporibus
                            molestias voluptatibus omnis illo error voluptates
                            consequuntur praesentium debitis eum iste, fuga ut
                            labore saepe nemo recusandae officiis eaque, libero
                            ipsum quia? Temporibus sequi culpa autem soluta
                            exercitationem. Ducimus, repellendus quis? Suscipit
                            quaerat magni omnis porro quisquam eum commodi,
                            inventore dolorem exercitationem aut, incidunt fuga
                            quis officiis soluta, earum est accusamus saepe.
                            Repellat non in suscipit quidem. Sunt? Blanditiis
                            fugiat quae nemo ex qui, deleniti modi tempora
                            sapiente a fugit accusantium asperiores dolorem quod
                            provident perspiciatis aspernatur alias ratione quos
                            molestiae est dignissimos nulla repellendus ullam
                            eligendi. Illum. Dolore, tempore harum commodi
                            dolores quod doloribus atque esse animi eos fugit
                            nihil sint quos dolor quidem nam veniam inventore
                            accusantium voluptas quisquam reprehenderit
                            reiciendis, consectetur officiis numquam? Quo, hic.
                            Ex, amet? Et itaque deleniti ullam perferendis
                            commodi iure quo rerum molestiae nam voluptas
                            obcaecati eligendi cum incidunt magni, repudiandae
                            tenetur dolorem hic non eveniet? Aspernatur veniam
                            quis incidunt quam. Atque voluptatibus earum
                            consectetur veritatis culpa quis officiis! Aut velit
                            harum officiis, a necessitatibus facere maiores quia
                            rem quam magnam? Illo consectetur quae iusto velit
                            rem laudantium aliquam nisi est. Nulla perferendis
                            dolor voluptatem ullam, iste facilis quae deserunt
                            ipsam maxime natus illum dicta iure, doloribus sint
                            laudantium officiis fugiat iusto provident mollitia
                            consequatur quibusdam debitis aut molestiae. In,
                            veniam? Hic aspernatur illum fugit officia nisi.
                            Optio tempore quos modi unde consequatur laudantium
                            perspiciatis natus non dolore ipsum voluptatibus,
                            totam dolor odio ea aliquid reprehenderit, illum
                            explicabo rem porro quisquam. Ex odio amet quod
                            omnis cum illum corrupti exercitationem
                            consequuntur, tempore sunt distinctio at ipsa ipsum
                            dignissimos ad? Molestias dolore voluptate
                            temporibus laborum non necessitatibus reprehenderit
                            eum id deserunt quas. Ipsam, sint fugiat aperiam
                            impedit nihil deleniti sed, natus cumque assumenda
                            quibusdam aliquam repudiandae quis cupiditate
                            nostrum iure? Aliquam est tempore perspiciatis
                            dolore quisquam quas praesentium eos blanditiis
                            eligendi minus. Quod animi expedita provident
                            facilis, praesentium hic ea repudiandae porro eos
                            architecto beatae culpa minima reiciendis vitae quo
                            rerum sed nemo nesciunt amet libero odio? Deserunt
                            ullam cum dignissimos beatae. Animi eos perferendis
                            hic alias, quos quibusdam neque quaerat, veritatis
                            voluptatibus molestias doloremque asperiores quas
                            adipisci quis, tenetur sequi placeat aut? Numquam
                            quia nisi consequuntur delectus, sequi iusto ea aut!
                            Laudantium possimus vero nulla maxime alias repellat
                            ab magnam iure minima quo nostrum veritatis autem
                            voluptatum, amet deserunt, quos ex minus nam?
                            Commodi voluptate officia at vitae tempore rerum
                            asperiores. Reprehenderit animi suscipit libero
                            veniam omnis veritatis, quia, temporibus odit
                            voluptates pariatur neque eaque recusandae quasi sed
                            voluptas vero nisi aliquid mollitia ullam, obcaecati
                            totam laudantium similique. Aspernatur, labore
                            dolores. Enim dolorum rem ex natus qui, vitae
                            laboriosam id vero reiciendis. Mollitia placeat
                            totam provident id voluptate minima nam dolorum quos
                            culpa, dolores corrupti deleniti deserunt non sed
                            quibusdam numquam. Assumenda amet architecto
                            doloremque iusto perferendis, consequatur saepe
                            quidem illum eos quibusdam veritatis ipsam alias qui
                            maiores fugiat expedita ratione, porro deserunt.
                            Odio, deserunt voluptate. Neque ratione eaque nam
                            unde. Iste, ipsa similique. Consequatur nesciunt
                            recusandae numquam at amet rerum, reprehenderit
                            possimus fuga laboriosam maiores minus, expedita
                            eligendi accusantium explicabo facilis in cupiditate
                            dolores unde labore soluta! Eos, nisi minus! Minima
                            cupiditate ipsum magnam quis maxime, consequatur
                            dignissimos odio suscipit facilis adipisci aut
                            molestiae et sit incidunt ea officiis, dolorum,
                            consectetur aperiam inventore modi! Totam repellat
                            earum dolore nam facilis! Modi corporis quibusdam in
                            praesentium, ipsam quidem tempora dolores,
                            molestias, libero optio sed reiciendis quasi ipsa
                            asperiores. Totam quos dicta laboriosam sint sed,
                            accusamus corrupti repudiandae tenetur? Praesentium,
                            deserunt atque? Eum consectetur perferendis
                            dignissimos temporibus blanditiis, culpa laboriosam
                            quia, nobis cum unde officia nihil, corporis
                            provident? A ea labore voluptatibus. Perferendis ut
                            earum alias iure magni vero optio adipisci quas?
                            Obcaecati vel, quo cum ipsam inventore repudiandae
                            quam suscipit hic blanditiis quidem ratione eaque
                            necessitatibus a perferendis eligendi quae commodi
                            molestiae! Optio ex quod velit excepturi odio illo
                            et quia. Doloribus dolor deleniti porro distinctio
                            saepe optio cumque ullam, earum, autem quas maiores
                            natus delectus beatae eaque. Aut nam beatae, ea
                            repudiandae quidem quas aperiam aliquid nostrum
                            nulla repellendus voluptate! Eius culpa
                            reprehenderit aut porro excepturi, dicta quo iure
                            exercitationem accusantium atque doloremque
                            perferendis ipsam nihil explicabo aliquid voluptates
                            fuga consectetur ut obcaecati minus nostrum eveniet
                            blanditiis. Quaerat, officia ad! Exercitationem
                            eveniet illo magni mollitia aliquid suscipit
                            distinctio animi ipsa cum repellendus amet
                            voluptatibus, dolor molestiae quos sint. Distinctio
                            est dolores alias! Dolores at consectetur vitae
                            architecto nostrum pariatur delectus? Corporis
                            similique esse facere magni soluta, hic atque
                            libero, deleniti repudiandae sit quas nobis
                            provident eveniet! Optio eius saepe quas quae
                            mollitia sunt suscipit atque aspernatur, blanditiis
                            voluptatem, doloribus dicta? Deserunt architecto,
                            sed minus quis cumque at mollitia, et dicta non
                            numquam consectetur facere voluptas? Aperiam hic
                            porro perferendis, omnis expedita sed ipsum, eveniet
                            sequi quia, consequuntur assumenda laborum
                            laboriosam. Possimus esse beatae quidem accusamus,
                            ipsam similique ipsa distinctio id tempora magni
                            corrupti consequatur cum minima necessitatibus eum
                            aut. Perspiciatis, impedit excepturi in amet
                            praesentium perferendis nulla voluptate eius beatae.
                            Aliquid id, earum omnis perspiciatis ullam corporis
                            rem deleniti velit, illo hic aperiam in incidunt
                            delectus, exercitationem officiis quod? Et
                            laudantium eligendi adipisci explicabo sit,
                            obcaecati officia reiciendis fuga aperiam. Modi,
                            excepturi voluptas?
                        </Grid>
                        <Grid item className={styles.buttonGroup}>
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.denyButton,
                                )}
                                label="Deny"
                                variant="outlined"
                            />
                            <Button
                                className={getValidClassNames(
                                    styles.button,
                                    styles.approveButton,
                                )}
                                label="Next Step"
                            />
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};

export { AdminPanel };
