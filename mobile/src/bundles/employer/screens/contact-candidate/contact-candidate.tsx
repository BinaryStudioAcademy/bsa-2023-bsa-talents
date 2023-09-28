import { StackActions } from '@react-navigation/native';
import React from 'react';

import { getPartnerInfo } from '~/bundles/chat/helpers/helpers';
import { actions as chatActions } from '~/bundles/chat/store';
import { Overlay, ScrollView } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import { RootScreenName } from '~/bundles/common/enums/navigation/root-screen-name.enum';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ContactTalentNavigationPropertiesType,
    type NavigationProp,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';
import { ContactCandidateForm } from '~/bundles/employer/components/components';
import { type ContactCandidateDto } from '~/bundles/employer/types/types';

const ContactCandidate: React.FC = () => {
    const route = useAppRoute();
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const { chats, dataStatus } = useAppSelector(({ chat }) => chat);
    const { talentId, profileName } =
        route.params as ContactTalentNavigationPropertiesType;

    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();
    const dispatch = useAppDispatch();

    const startedChat = chats.find((chat) => chat.chatId === talentId);

    useEffect(() => {
        if (startedChat) {
            const { chatId, participants } = startedChat;

            const { partnerName, partnerAvatar, partnerId } = getPartnerInfo(
                chatId,
                participants,
            );

            navigation.dispatch(
                StackActions.replace(RootScreenName.CHAT, {
                    chatId,
                    partnerName,
                    partnerAvatar,
                    partnerId,
                }),
            );
        }
    }, [navigation, startedChat]);

    const handleFormSubmit = useCallback(
        (payload: ContactCandidateDto): void => {
            if (currentUserData?.id && talentId) {
                void dispatch(
                    chatActions.createMessage({
                        chatId: talentId,
                        senderId: currentUserData.id,
                        receiverId: talentId,
                        message: payload.message,
                    }),
                );

                navigation.dispatch(
                    StackActions.replace(RootScreenName.CHAT, {
                        partnerName: profileName,
                        partnerId: talentId,
                        chatId: talentId,
                    }),
                );
            }
        },
        [profileName, navigation, dispatch, currentUserData?.id, talentId],
    );

    const handleContactClose = useCallback((): void => {
        navigation.goBack();
    }, [navigation]);

    const isLoading = dataStatus === DataStatus.PENDING;

    return (
        <>
            <Overlay isActive={isLoading} />
            <ScrollView
                style={[
                    globalStyles.defaultScreenPadding,
                    globalStyles.borderRadius10,
                    globalStyles.width100,
                    globalStyles.height100,
                ]}
            >
                <ContactCandidateForm
                    onContactClose={handleContactClose}
                    onSubmit={handleFormSubmit}
                />
            </ScrollView>
        </>
    );
};

export { ContactCandidate };
