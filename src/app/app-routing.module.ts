import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './screens/menu/menu.module#MenuPageModule' },
  { path: 'profile', loadChildren: './screens/pages/profile/profile.module#ProfilePageModule' },
  { path: 'chat', loadChildren: './screens/pages/chat/chat.module#ChatPageModule' },
  { path: 'home', loadChildren: './screens/pages/home/home.module#HomePageModule' },
  { path: 'events', loadChildren: './screens/pages/events/events.module#EventsPageModule' },
  { path: 'newevent', loadChildren: './screens/pages/newevent/newevent.module#NeweventPageModule' },
  { path: 'screens', canActivate: [AuthGuard], loadChildren: './screens/screen-routing.module#ScreenRoutingModule' },
  { path: 'editprofile', loadChildren: './screens/pages/editprofile/editprofile.module#EditprofilePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
