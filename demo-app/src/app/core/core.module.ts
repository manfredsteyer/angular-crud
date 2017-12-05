import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule  
  ],
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent]
})
export class CoreModule { }