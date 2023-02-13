import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ContactBookComponent } from './components/contact-book/contact-book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
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
    path: 'register', component: RegisterComponent
  },
  {
    path: 'requests-home', canActivate: [AuthGuard], component: RequestsHomeComponent
  },
  {
    path: 'profile', canActivate: [AuthGuard],  component: ProfileComponent
  },
  {
    path: 'contact-book', canActivate: [AuthGuard], component: ContactBookComponent
  },
  {
    path: 'notifications', canActivate: [AuthGuard], component: NotificationsComponent
  },
  {
    path: 'chat/:id', canActivate: [AuthGuard],  component: ChatComponent
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
