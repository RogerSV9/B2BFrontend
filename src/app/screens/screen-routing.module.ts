import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
/*   { path: 'home', loadChildren: './home/home.module#HomePageModule' },*/  
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },  { path: 'newevent', loadChildren: './pages/newevent/newevent.module#NeweventPageModule' },
  { path: 'editprofile', loadChildren: './pages/editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },


];

@NgModule({
 /*  declarations: [],
  imports: [
    CommonModule
  ] */
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
