import { Component, OnInit } from '@angular/core';

import { SideMenuItem } from './side-menu-item';
import { SideMenuService } from './side-menu.service';


@Component({
    selector: 'side-menu',
    templateUrl: 'side-menu.component.html',
    
        providers: [SideMenuService]
    
})
export class SideMenuComponent {


    items: SideMenuItem[];

    constructor(service: SideMenuService) {
        this.items = service.items;
    }


}
