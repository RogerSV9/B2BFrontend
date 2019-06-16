import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/menu/home',
    pathMatch: 'full'
  },  
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../pages/home/home.module#HomePageModule'
      },
      {
        path: 'events',
        loadChildren: '../pages/events/events.module#EventsPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../pages/profile/profile.module#ProfilePageModule'
      },
      {
        path: 'chat',
        loadChildren: '../pages/chat/chat.module#ChatPageModule'
      },
      {
        path: 'editprofile',
        loadChildren: '../pages/editprofile/editprofile.module#EditprofilePageModule'
      },
      {
        path: 'newevents',
        loadChildren: '../pages/newevent/newevent.module#NeweventPageModule'
      }
    ]
  }


];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
