import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostCreateComponent } from './component/post-create/post-create.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';

const routes: Routes = [
  // sign up
  { path: 'signup', component: UserCreateComponent },
  // login
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  // create new post. only user has already logged-in can see 'New post' menu.
  {
    path: 'post-create', component: PostCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // edit existing post. only user has already logged-in can see 'New post' menu.
  {
    path: 'post-edit/:id', component: PostEditComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // edit profile. only user has already logged-in can see 'edit profile' menu.
  {
    path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  // { path: '', redirectTo: '/post-list', pathMatch: 'full' },
  { path: '', redirectTo: '/post-list', pathMatch: 'full' },
  // if paths are not in the above list then redirects to path '/post-list'
  { path: '**', redirectTo: '/post-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
