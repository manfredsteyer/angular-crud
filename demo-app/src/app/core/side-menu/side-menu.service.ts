import { SideMenuItem } from './side-menu-item';

export class SideMenuService {

    public items: SideMenuItem[] = [
        { title: 'Home', iconClass: 'ti-home', route: '/' },
        { title: 'Flight', iconClass: 'ti-arrow-top-right', route: 'flight' },
        { title: 'Hotel', iconClass: 'ti-arrow-top-right', route: 'hotel' }
    ];

}