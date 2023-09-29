/* eslint-disable no-console */
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    Notifications,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { DataStatus, UserRole } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as employerActions } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isPending, currentUser } = useAppSelector(
        ({ auth, talentOnBoarding, employerOnBoarding }) => {
            return {
                isPending:
                    auth.currentUser?.role === UserRole.ADMIN
                        ? !(
                              auth.dataStatus === DataStatus.FULFILLED ||
                              auth.dataStatus === DataStatus.REJECTED
                          )
                        : !(
                              talentOnBoarding.dataStatus ===
                                  DataStatus.FULFILLED ||
                              talentOnBoarding.dataStatus ===
                                  DataStatus.REJECTED ||
                              employerOnBoarding.dataStatus ===
                                  DataStatus.FULFILLED ||
                              employerOnBoarding.dataStatus ===
                                  DataStatus.REJECTED
                          ),
                currentUser: auth.currentUser,
            };
        },
    );

    console.log(currentUser);

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, token]);

    useEffect(() => {
        switch (currentUser?.role) {
            case UserRole.TALENT: {
                void dispatch(
                    talentActions.getTalentDetails({
                        userId: currentUser.id,
                    }),
                );
                break;
            }
            case UserRole.EMPLOYER: {
                void dispatch(
                    employerActions.getEmployerDetails({
                        userId: currentUser.id,
                    }),
                );
                break;
            }
            default: {
                break;
            }
        }
    }, [dispatch, currentUser]);

    console.log(isPending);

    if (isPending && token) {
        return <Loader />;
    }

    return (
        <>
            <RouterOutlet />
            <Notifications />
        </>
    );
};

export { App };
