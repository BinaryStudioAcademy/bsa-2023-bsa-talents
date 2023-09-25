import React from 'react';

// import { logout } from '~/bundles/auth/store/actions';
// import { ChatListItem, Search } from '~/bundles/chat/components/components';
// import { sortChatsByDate } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
// import { type ChatItem } from '~/bundles/chat/types/types';
import {
    // Button,
    // FlatList,
    Text,
    // View,
} from '~/bundles/common/components/components';
// import { RootScreenName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    // useCallback,
    useEffect,
    // useMemo,
    // useNavigation,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as CommonDataActions } from '~/bundles/common-data/store';
// import { globalStyles } from '~/bundles/common/styles/styles';
// import {
//     type ChatNavigationProperties,
//     type NavigationProp,
//     type RootNavigationParameterList,
// } from '~/bundles/common/types/types';

// import { styles } from './styles';

const ChatList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { chats, current } = useAppSelector(({ chat }) => chat);
    const { partners } = useAppSelector(({ commonData }) => commonData);
    const [isInitialized, setIsInitialized] = useState(false);

    const currentChatId = current.chatId;
    const user = currentUserData;

    useEffect(() => {
        if (!partners) {
            void dispatch(CommonDataActions.loadAllPartners());
        }
    }, [dispatch, partners]);

    useEffect(() => {
        if (user) {
            void dispatch(chatActions.getAllChatsByUserId(user.id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        const existingChatIds = new Set(chats.map((chat) => chat.chatId));
        if (!isInitialized && user && partners) {
            for (const partner of partners) {
                if (!existingChatIds.has(partner.id)) {
                    const messageData = {
                        senderId: user.id,
                        receiverId: partner.id,
                        message: 'Hello',
                        chatId: partner.id,
                    };
                    void dispatch(chatActions.createMessage(messageData));
                }
            }
            setIsInitialized(true);
        }
    }, [user, partners, chats, dispatch, isInitialized]);

    // useEffect(() => {
    //     if (user && partners) {
    //         dispatch(initializeChats(partners));
    //     }
    // }, [user, partners, dispatch]);

    // const navigation =
    //     useNavigation<NavigationProp<RootNavigationParameterList>>();

    // const [searchQuery, setSearchQuery] = useState('');

    // const transformedChatData = useMemo(() => {
    //     return chatData
    //         ? Object.entries(chatData).map(([chatId, messages]) => {
    //               const lastMessage = messages[0];
    //               return {
    //                   chatId: chatId,
    //                   senderName: lastMessage.senderName,
    //                   senderAvatar: lastMessage.senderAvatar,
    //                   lastMessage: lastMessage.message,
    //                   lastMessageDate: lastMessage.createdAt,
    //               };
    //           })
    //         : [];
    // }, [chatData]);

    // const filteredChats = useMemo(() => {
    //     return transformedChatData.filter((chat) => {
    //         const { lastMessage } = chat;
    //         return lastMessage
    //             .trim()
    //             .toLowerCase()
    //             .includes(searchQuery.toLowerCase());
    //     });
    // }, [transformedChatData, searchQuery]);

    // const sortedChats = useMemo(() => {
    //     return sortChatsByDate(filteredChats);
    // }, [filteredChats]);

    // const renderListItem = ({
    //     item,
    // }: {
    //     item: ChatItem;
    // }): React.ReactElement => {
    //     return (
    //         <ChatListItem
    //             key={item.lastMessage}
    //             item={item}
    //             onSelect={handleChatSelect}
    //         />
    //     );
    // };

    // const handleChatSelect = useCallback(
    //     (payload: ChatNavigationProperties): void => {
    //         navigation.navigate(RootScreenName.CHAT, payload);
    //     },
    //     [navigation],
    // );

    // const handleLogout = (): void => {
    //     void dispatch(logout());
    // };

    return (
        <>
            <Text>{chats[0]?.lastMessage ?? 'no message'}</Text>
            <Text>{currentChatId}</Text>
        </>

        // <View style={globalStyles.flex1}>
        //     <View
        //         style={[
        //             globalStyles.p25,
        //             globalStyles.pr15,
        //             globalStyles.flexDirectionRow,
        //             globalStyles.justifyContentSpaceBetween,
        //             globalStyles.alignItemsCenter,
        //             styles.header,
        //         ]}
        //     >
        //         <Text category={TextCategory.H3}>Chat</Text>
        //         <Button
        //             label="Logout"
        //             style={[
        //                 globalStyles.ml5,
        //                 globalStyles.ph10,
        //                 globalStyles.pv5,
        //             ]}
        //             onPress={handleLogout}
        //         />
        //     </View>
        //     <View
        //         style={[
        //             globalStyles.ph15,
        //             globalStyles.pt10,
        //             globalStyles.flex1,
        //             styles.chatContainer,
        //         ]}
        //     >
        //         <Search
        //             searchQuery={searchQuery}
        //             setSearchQuery={setSearchQuery}
        //             containerStyle={[
        //                 globalStyles.borderRadius15,
        //                 globalStyles.p15,
        //                 styles.search,
        //             ]}
        //         />
        //         <FlatList
        //             style={[globalStyles.pb15, styles.chatList]}
        //             data={sortedChats}
        //             renderItem={renderListItem}
        //             keyExtractor={(item): string => item.chatId}
        //             showsVerticalScrollIndicator={false}
        //         />
        //     </View>
        // </View>
    );
};

export { ChatList };
