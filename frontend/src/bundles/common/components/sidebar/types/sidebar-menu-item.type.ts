import { type AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type SidebarMenuItem = {
    link: ValueOf<typeof AppRoute>;
    name: string;
    icon: JSX.Element;
};

export { type SidebarMenuItem };
