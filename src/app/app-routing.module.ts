import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ContactBookComponent } from './components/contact-book/contact-book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestsHomeComponent } from './components/requests-home/requests-home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuard] ,component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'requests-home', component: RequestsHomeComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'contact-book', component: ContactBookComponent
  },
  {
    path: 'notifications', component: NotificationsComponent
  },
  {
    path: 'chat/:id', component: ChatComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
